'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Computed values (as functions)
  getItemCount: () => number
  getSubtotal: () => number
  getItem: (productId: string) => CartItem | undefined
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          )

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? {
                      ...i,
                      quantity: Math.min(
                        i.quantity + (item.quantity || 1),
                        i.stock
                      ),
                    }
                  : i
              ),
            }
          }

          return {
            items: [
              ...state.items,
              { ...item, quantity: item.quantity || 1 },
            ],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            }
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(quantity, item.stock) }
                : item
            ),
          }
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      getItem: (productId) => {
        return get().items.find((item) => item.productId === productId)
      },
    }),
    {
      name: 'prostavita-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
