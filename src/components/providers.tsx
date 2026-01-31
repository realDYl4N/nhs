'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'
import { CartDrawer } from '@/components/cart/cart-drawer'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <CartDrawer />
      <Toaster />
    </SessionProvider>
  )
}
