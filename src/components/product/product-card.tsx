'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useCartStore } from '@/store/cart'
import { formatPrice, getStockStatus } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import type { Product } from '@prisma/client'

interface ProductCardProps {
  product: Product & {
    averageRating?: number
    reviewCount?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const [isAdding, setIsAdding] = React.useState(false)

  const images = JSON.parse(product.images || '[]') as string[]
  const primaryImage = images[0] || '/placeholder-product.jpg'
  const stockStatus = getStockStatus(product.stock)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      stock: product.stock,
    })
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      variant: 'success',
    })
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  return (
    <Card className="group relative overflow-hidden">
      {/* Product badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isFeatured && (
          <Badge variant="secondary">Best Seller</Badge>
        )}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <Badge variant="error">
            Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="outline">Out of Stock</Badge>
        )}
      </div>

      {/* Quick view button */}
      <Link
        href={`/products/${product.slug}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        aria-label={`View ${product.name} details`}
      >
        <Eye className="h-4 w-4 text-gray-700" />
      </Link>

      {/* Product image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">
          Prostate Health
        </p>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.averageRating !== undefined && product.reviewCount !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(product.averageRating || 0)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Short description */}
        {product.shortDescription && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Stock status */}
        <p className={`text-sm mt-2 ${stockStatus.color}`}>
          {stockStatus.label}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className="w-full mt-4"
          variant={product.stock === 0 ? 'outline' : 'default'}
        >
          {product.stock === 0 ? (
            'Out of Stock'
          ) : isAdding ? (
            'Adding...'
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
