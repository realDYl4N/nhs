import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })),
  email: z.string().email(),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string().default('US'),
    phone: z.string().optional(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    const body = await request.json()
    const { items, email, shippingAddress } = checkoutSchema.parse(body)

    // Fetch products and validate stock
    const productIds = items.map((item) => item.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 400 }
      )
    }

    // Validate stock and calculate totals
    const lineItems = []
    let subtotal = 0

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product) continue

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        )
      }

      subtotal += product.price * item.quantity

      const images = JSON.parse(product.images || '[]') as string[]

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.shortDescription || undefined,
            images: images.length > 0 ? images.slice(0, 1) : undefined,
          },
          unit_amount: formatAmountForStripe(product.price),
        },
        quantity: item.quantity,
      })
    }

    // Calculate shipping and tax
    const shipping = subtotal >= 50 ? 0 : 5.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null,
        email,
        status: 'pending',
        paymentStatus: 'pending',
        subtotal,
        shipping,
        tax,
        total,
        guestName: shippingAddress.name,
        guestAddress: JSON.stringify(shippingAddress),
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
              name: product.name,
            }
          }),
        },
      },
    })

    // Add shipping as line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: formatAmountForStripe(shipping),
        },
        quantity: 1,
      })
    }

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      automatic_tax: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        orderId: order.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
    })

    // Update order with payment intent
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: stripeSession.payment_intent as string || stripeSession.id },
    })

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
