import { Suspense } from 'react'
import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { ProductCard } from '@/components/product/product-card'
import { ProductFilters } from '@/components/product/product-filters'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our complete range of premium prostate health supplements. Natural ingredients, science-backed formulas.',
}

interface ProductsPageProps {
  searchParams: Promise<{
    sort?: string
    benefit?: string
    minPrice?: string
    maxPrice?: string
    inStock?: string
  }>
}

async function getProducts(searchParams: {
  sort?: string
  benefit?: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
}) {
  const { sort, benefit, minPrice, maxPrice, inStock } = searchParams

  const where: Record<string, unknown> = {
    isActive: true,
  }

  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
    if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
  }

  if (inStock === 'true') {
    where.stock = { gt: 0 }
  }

  if (benefit) {
    where.benefits = { contains: benefit }
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' }

  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'name':
      orderBy = { name: 'asc' }
      break
    case 'newest':
      orderBy = { createdAt: 'desc' }
      break
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
    })
    return products
  } catch {
    return []
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const products = await getProducts(params)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <Badge variant="default" className="mb-4">Shop Our Collection</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Prostate Health Supplements
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our complete range of premium supplements formulated to support
          prostate health, urinary function, and overall male wellness.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
            <ProductFilters />
          </Suspense>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-medium">{products.length}</span> products
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or browse all products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
