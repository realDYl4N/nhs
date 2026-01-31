'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore()

  const subtotal = getSubtotal()

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeCart])

  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
              {items.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start shopping to add items to your cart
                </p>
                <Button onClick={closeCart} asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    {/* Product image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <ShoppingBag className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    {/* Product details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link
                            href={`/products/${item.productId}`}
                            onClick={closeCart}
                            className="hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-l-lg disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-r-lg disabled:opacity-50"
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Line total */}
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer with subtotal and checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <p className="text-sm text-gray-500">
                Shipping and taxes calculated at checkout
              </p>

              {/* Checkout button */}
              <Button
                className="w-full"
                size="lg"
                onClick={closeCart}
                asChild
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Continue shopping */}
              <p className="text-center">
                <button
                  onClick={closeCart}
                  className="text-sm text-primary hover:underline"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
