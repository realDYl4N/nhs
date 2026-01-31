'use client'

import * as React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Delay showing to avoid layout shift
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              We value your privacy
            </h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking
              &quot;Accept All&quot;, you consent to our use of cookies.{' '}
              <Link
                href="/cookies"
                className="text-primary hover:underline"
              >
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
            >
              Decline
            </Button>
            <Button size="sm" onClick={acceptCookies}>
              Accept All
            </Button>
            <button
              onClick={declineCookies}
              className="p-1 text-gray-400 hover:text-gray-600 md:hidden"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
