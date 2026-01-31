import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@prostavita.com',
      to,
      subject,
      html,
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export function getOrderConfirmationEmail(order: {
  id: string
  email: string
  total: number
  items: Array<{ name: string; quantity: number; price: number }>
}) {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `
    )
    .join('')

  return {
    to: order.email,
    subject: `Order Confirmation - #${order.id.slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a3d 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">ProstaVita</h1>
            <p style="color: #a3cfbb; margin-top: 5px;">Natural Prostate Health Solutions</p>
          </div>

          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Thank You for Your Order!</h2>
            <p>Your order has been received and is being processed. Here's a summary of your purchase:</p>

            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="margin: 0 0 15px 0;"><strong>Order Number:</strong> #${order.id.slice(-8).toUpperCase()}</p>

              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 10px; text-align: right;"><strong>Total:</strong></td>
                    <td style="padding: 15px 10px; text-align: right;"><strong>$${order.total.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p>We'll send you another email when your order ships.</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Questions? Contact us at support@prostavita.com</p>
              <p style="margin-top: 15px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #2d5a3d; text-decoration: none;">Visit Our Website</a>
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ProstaVita. All rights reserved.</p>
            <p>These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </body>
      </html>
    `,
  }
}

export function getShippingNotificationEmail(order: {
  id: string
  email: string
  trackingNumber: string
  shippingMethod: string
}) {
  return {
    to: order.email,
    subject: `Your Order Has Shipped - #${order.id.slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a3d 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">ProstaVita</h1>
          </div>

          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Your Order is On Its Way!</h2>
            <p>Great news! Your order #${order.id.slice(-8).toUpperCase()} has shipped.</p>

            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
              <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
            </div>

            <p>Thank you for choosing ProstaVita for your prostate health needs!</p>
          </div>
        </body>
      </html>
    `,
  }
}
