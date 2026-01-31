import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { formatPrice, formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Thank you for your order at ProstaVita.',
}

interface OrderConfirmationPageProps {
  searchParams: Promise<{
    orderId?: string
    session_id?: string
  }>
}

async function getOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })
    return order
  } catch {
    return null
  }
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const params = await searchParams
  const { orderId } = params

  if (!orderId) {
    notFound()
  }

  const order = await getOrder(orderId)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-8">
          Your order has been received and is being processed. We&apos;ll send you
          an email confirmation shortly.
        </p>

        {/* Order Details Card */}
        <Card className="mb-8 text-left">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-lg font-bold text-gray-900">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium text-gray-900">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Order Items</h3>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8 text-left">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">What&apos;s Next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Confirmation Email</p>
                  <p className="text-sm text-gray-600">
                    You&apos;ll receive an email at {order.email} with your order details
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-600">
                    We&apos;ll send tracking information when your order ships (1-2 business days)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">View Order History</Link>
          </Button>
        </div>

        {/* Support */}
        <p className="text-sm text-gray-600 mt-8">
          Questions about your order?{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
