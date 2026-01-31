import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ProstaVita Terms of Service - Read the terms and conditions governing your use of our website and services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="default" className="mb-4">Legal</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: January 1, 2024
        </p>

        <div className="prose max-w-none">
          <p>
            Welcome to ProstaVita. These Terms of Service (&quot;Terms&quot;) govern your use of our website and the purchase of products from us. By accessing our website or making a purchase, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>

          <h2>2. Products and Services</h2>
          <h3>Product Information</h3>
          <p>
            We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
          </p>

          <h3>Dietary Supplement Disclaimer</h3>
          <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <strong>FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Please consult your healthcare provider before starting any new supplement regimen, especially if you have existing health conditions or take medications.
          </p>

          <h3>Pricing</h3>
          <p>
            All prices are listed in US dollars and are subject to change without notice. We reserve the right to refuse or cancel orders if there are pricing errors.
          </p>

          <h2>3. Orders and Payment</h2>
          <h3>Order Acceptance</h3>
          <p>
            All orders are subject to acceptance by ProstaVita. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity.
          </p>

          <h3>Payment</h3>
          <p>
            We accept major credit cards and process payments securely through Stripe. By providing payment information, you represent that you are authorized to use the payment method.
          </p>

          <h2>4. Shipping and Delivery</h2>
          <p>
            We ship to addresses within the United States. Delivery times are estimates and are not guaranteed. Risk of loss and title pass to you upon delivery to the carrier. We are not responsible for delays caused by carriers or customs.
          </p>

          <h2>5. Returns and Refunds</h2>
          <p>
            We offer a 30-day money-back guarantee. To be eligible for a return, items must be in their original packaging. To initiate a return, please contact our customer service team. Refunds will be processed to the original payment method within 5-7 business days of receiving the return.
          </p>

          <h2>6. User Accounts</h2>
          <p>
            When you create an account, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of ProstaVita or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
          </p>

          <h2>8. Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt our website or servers</li>
            <li>Submit false or misleading information</li>
            <li>Resell our products without authorization</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ProstaVita shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product giving rise to the claim.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless ProstaVita, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses arising from your use of our website or violation of these Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of California.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our website after changes constitutes acceptance of the modified Terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: legal@prostavita.com</li>
            <li>Phone: 1-800-555-0123</li>
            <li>Address: 123 Health Street, Wellness City, CA 90210</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
