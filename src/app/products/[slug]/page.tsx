import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Shield, Truck, Clock, ChevronRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import { formatPrice, getStockStatus } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddToCartButton } from '@/components/product/add-to-cart-button'
import { ProductCard } from '@/components/product/product-card'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })
    return product
  } catch {
    return null
  }
}

async function getRelatedProducts(productId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        id: { not: productId },
      },
      take: 4,
    })
    return products
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: JSON.parse(product.images || '[]'),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id)

  const images = JSON.parse(product.images || '[]') as string[]
  const benefits = JSON.parse(product.benefits || '[]') as { title: string; description: string }[]
  const ingredients = JSON.parse(product.ingredients || '[]') as { name: string; amount: string; description?: string }[]
  const supplementFacts = JSON.parse(product.supplementFacts || '{}') as Record<string, unknown>
  const stockStatus = getStockStatus(product.stock)

  const avgRating = product.reviews.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isFeatured && (
              <Badge className="absolute top-4 left-4" variant="secondary">
                Best Seller
              </Badge>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <Badge variant="default" className="mb-2">Prostate Health</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(avgRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {avgRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <Badge variant="error">
                  Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-sm font-medium mb-6 ${stockStatus.color}`}>
            {stockStatus.label}
          </p>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>
          )}

          {/* Dosage */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">Suggested Use</h3>
            <p className="text-gray-600 text-sm">{product.dosage}</p>
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-gray-600">30-Day Guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-gray-600">Free Shipping $50+</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-gray-600">Ships in 1-2 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="supplement-facts">Supplement Facts</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6 prose max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>

              {benefits.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.warnings && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-yellow-800 mb-2">Warnings</h3>
                  <p className="text-sm text-yellow-700">{product.warnings}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingredients" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Ingredients</h3>
              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b last:border-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                      {ingredient.description && (
                        <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplement-facts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplement Facts</CardTitle>
            </CardHeader>
            <CardContent>
              {supplementFacts.servingSize && (
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm"><strong>Serving Size:</strong> {supplementFacts.servingSize as string}</p>
                  {supplementFacts.servingsPerContainer && (
                    <p className="text-sm"><strong>Servings Per Container:</strong> {supplementFacts.servingsPerContainer as string}</p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {supplementFacts.nutrients && Array.isArray(supplementFacts.nutrients) && (
                  supplementFacts.nutrients.map((nutrient: { name: string; amount: string; dailyValue?: string }, index: number) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span className="text-gray-900">{nutrient.name}</span>
                      <div className="text-right">
                        <span className="font-medium">{nutrient.amount}</span>
                        {nutrient.dailyValue && (
                          <span className="text-gray-500 ml-2">{nutrient.dailyValue}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {review.isVerified && (
                          <Badge variant="success" className="text-xs">Verified Purchase</Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900">{review.title}</h4>
                      <p className="text-gray-600 mt-1">{review.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        By {review.user?.name || 'Anonymous'} on{' '}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
