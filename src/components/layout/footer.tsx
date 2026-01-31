import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Best Sellers', href: '/products?sort=best-selling' },
    { name: 'New Arrivals', href: '/products?sort=newest' },
    { name: 'Subscriptions', href: '/subscriptions' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Help Center', href: '/help' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-white">
                Prosta<span className="text-primary">Vita</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Premium natural supplements formulated to support prostate health
              and overall male wellness. Science-backed ingredients for results
              you can feel.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:support@prostavita.com"
                  className="hover:text-primary transition-colors"
                >
                  support@prostavita.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:1-800-555-0123"
                  className="hover:text-primary transition-colors"
                >
                  1-800-555-0123
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>
                  123 Health Street
                  <br />
                  Wellness City, CA 90210
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FDA Disclaimer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
            <strong>FDA Disclaimer:</strong> These statements have not been
            evaluated by the Food and Drug Administration. This product is not
            intended to diagnose, treat, cure, or prevent any disease. Consult
            your healthcare provider before starting any supplement regimen,
            especially if you have a medical condition or take medications.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ProstaVita. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Payment icons placeholder */}
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                Visa
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                MC
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                Amex
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
