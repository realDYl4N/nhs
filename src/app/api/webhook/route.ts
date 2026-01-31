import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { sendEmail, getOrderConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
          // Update order status
          const order = await prisma.order.update({
            where: { id: orderId },
            data: {
              paymentStatus: 'paid',
              status: 'processing',
            },
            include: {
              items: true,
            },
          })

          // Update product stock
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            })
          }

          // Send confirmation email
          const emailData = getOrderConfirmationEmail({
            id: order.id,
            email: order.email,
            total: order.total,
            items: order.items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          })
          await sendEmail(emailData)
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)

        // Find order by payment intent and update status
        const order = await prisma.order.findFirst({
          where: { paymentIntentId: paymentIntent.id },
        })

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { paymentStatus: 'failed' },
          })
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        const order = await prisma.order.findFirst({
          where: { paymentIntentId },
        })

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: 'refunded',
              status: 'cancelled',
            },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
