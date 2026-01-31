'use client'

import * as React from 'react'
import { ShoppingCart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { toast } from '@/components/ui/use-toast'
import type { Product } from '@prisma/client'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [isAdding, setIsAdding] = React.useState(false)
  const { addItem, openCart } = useCartStore()

  const images = JSON.parse(product.images || '[]') as string[]
  const primaryImage = images[0] || '/placeholder-product.jpg'

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      stock: product.stock,
      quantity,
    })
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} has been added to your cart`,
      variant: 'success',
    })
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-6 py-3 text-center font-medium min-w-[60px]">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
        size="xl"
        className="w-full"
      >
        {product.stock === 0 ? (
          'Out of Stock'
        ) : isAdding ? (
          'Adding to Cart...'
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart - {(product.price * quantity).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </>
        )}
      </Button>

      {/* Subscribe Option */}
      <div className="border border-dashed border-gray-300 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Subscribe & Save 15%</h4>
            <p className="text-sm text-gray-600">
              Free shipping and auto-delivery every 30 days
            </p>
          </div>
          <Button variant="outline" size="sm">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}
