import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ProstaVita Privacy Policy - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="default" className="mb-4">Legal</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: January 1, 2024
        </p>

        <div className="prose max-w-none">
          <p>
            At ProstaVita (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, mailing address, phone number, and payment information when you make a purchase or create an account.</li>
            <li><strong>Health Information:</strong> Any health-related information you voluntarily share with us through customer service inquiries.</li>
            <li><strong>Account Information:</strong> Username, password, and account preferences.</li>
            <li><strong>Communication Data:</strong> Records of your correspondence with us.</li>
          </ul>

          <h2>Automatically Collected Information</h2>
          <p>When you visit our website, we automatically collect certain information, including:</p>
          <ul>
            <li>Device information (browser type, operating system)</li>
            <li>IP address and location data</li>
            <li>Pages viewed and time spent on our site</li>
            <li>Referral source</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third parties that help us operate our business (payment processors, shipping carriers, email services)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to certain processing activities</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>

          <h2>California Privacy Rights</h2>
          <p>
            California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, request deletion, and opt-out of the sale of personal information (which we do not do).
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings. For more information, please see our Cookie Policy.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website and products are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal information, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@prostavita.com</li>
            <li>Phone: 1-800-555-0123</li>
            <li>Address: 123 Health Street, Wellness City, CA 90210</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
