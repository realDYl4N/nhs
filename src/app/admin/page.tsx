import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/utils'
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'

async function getDashboardStats() {
  const [products, orders, users, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      where: { paymentStatus: 'paid' },
      _sum: { total: true },
    }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })

  const lowStockProducts = await prisma.product.findMany({
    where: { stock: { lte: 10 }, isActive: true },
    orderBy: { stock: 'asc' },
    take: 5,
  })

  return {
    stats: {
      products,
      orders,
      users,
      revenue: revenue._sum.total || 0,
    },
    recentOrders,
    lowStockProducts,
  }
}

export default async function AdminDashboardPage() {
  const session = await getAuthSession()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/auth/login')
  }

  const { stats, recentOrders, lowStockProducts } = await getDashboardStats()

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.revenue),
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: stats.orders.toString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Products',
      value: stats.products.toString(),
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Customers',
      value: stats.users.toString(),
      icon: Users,
      color: 'bg-orange-500',
    },
  ]

  const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'error'> = {
    pending: 'warning',
    processing: 'secondary',
    shipped: 'default',
    delivered: 'success',
    cancelled: 'error',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user.name}</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">{order.email}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={statusColors[order.status] || 'default'}>
                        {order.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Low Stock Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/products">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      </div>
                      <Badge variant={product.stock === 0 ? 'error' : 'warning'}>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">
                All products are well stocked!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-6 justify-start" asChild>
          <Link href="/admin/products" className="flex flex-col items-start">
            <Package className="h-6 w-6 mb-2" />
            <span className="font-medium">Manage Products</span>
            <span className="text-sm text-gray-600">Add, edit, or remove products</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 justify-start" asChild>
          <Link href="/admin/orders" className="flex flex-col items-start">
            <ShoppingCart className="h-6 w-6 mb-2" />
            <span className="font-medium">Manage Orders</span>
            <span className="text-sm text-gray-600">View and update orders</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 justify-start" asChild>
          <Link href="/admin/customers" className="flex flex-col items-start">
            <Users className="h-6 w-6 mb-2" />
            <span className="font-medium">Customers</span>
            <span className="text-sm text-gray-600">View customer accounts</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 justify-start" asChild>
          <Link href="/admin/settings" className="flex flex-col items-start">
            <TrendingUp className="h-6 w-6 mb-2" />
            <span className="font-medium">Analytics</span>
            <span className="text-sm text-gray-600">View sales reports</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
