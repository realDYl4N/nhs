import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { Package, MapPin, RefreshCcw, User, ChevronRight } from 'lucide-react'

async function getUserData(userId: string) {
  const [orders, addresses, subscriptions] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: true },
    }),
    prisma.address.findMany({
      where: { userId },
    }),
    prisma.subscription.findMany({
      where: { userId, status: 'active' },
      include: { product: true },
    }),
  ])

  return { orders, addresses, subscriptions }
}

export default async function AccountPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/auth/login?redirect=/account')
  }

  const { orders, addresses, subscriptions } = await getUserData(session.user.id)

  const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'error'> = {
    pending: 'warning',
    processing: 'secondary',
    shipped: 'default',
    delivered: 'success',
    cancelled: 'error',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{addresses.length}</p>
              <p className="text-sm text-gray-600">Saved Addresses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <RefreshCcw className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
              <p className="text-sm text-gray-600">{session.user.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/orders">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <Badge variant={statusColors[order.status] || 'default'}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • {formatPrice(order.total)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet</p>
                <Button className="mt-4" asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/account/orders"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Order History</p>
                  <p className="text-sm text-gray-600">View and track your orders</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/account/addresses"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Saved Addresses</p>
                  <p className="text-sm text-gray-600">Manage delivery addresses</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/account/subscriptions"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <RefreshCcw className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Subscriptions</p>
                  <p className="text-sm text-gray-600">Manage auto-delivery orders</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
