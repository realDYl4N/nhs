import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'ProstaVita - Premium Prostate Health Supplements',
    template: '%s | ProstaVita',
  },
  description:
    'Discover premium natural supplements for prostate health. Science-backed formulas with high-quality ingredients to support male wellness.',
  keywords: [
    'prostate health',
    'prostate supplements',
    'mens health',
    'natural supplements',
    'prostate support',
    'urinary health',
  ],
  authors: [{ name: 'ProstaVita' }],
  creator: 'ProstaVita',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'ProstaVita',
    title: 'ProstaVita - Premium Prostate Health Supplements',
    description:
      'Discover premium natural supplements for prostate health. Science-backed formulas with high-quality ingredients.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ProstaVita - Premium Prostate Health Supplements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProstaVita - Premium Prostate Health Supplements',
    description:
      'Discover premium natural supplements for prostate health. Science-backed formulas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1 pt-28 lg:pt-32">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
