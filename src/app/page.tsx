import Link from 'next/link'
import Image from 'next/image'
import {
  Shield,
  Leaf,
  Award,
  Truck,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'
import { ProductCard } from '@/components/product/product-card'

const benefits = [
  {
    icon: Shield,
    title: 'Clinically Studied Ingredients',
    description:
      'Our formulas contain ingredients backed by scientific research for prostate health support.',
  },
  {
    icon: Leaf,
    title: '100% Natural Ingredients',
    description:
      'Made with premium natural extracts and nutrients without artificial additives.',
  },
  {
    icon: Award,
    title: 'GMP Certified Quality',
    description:
      'Manufactured in FDA-registered, GMP-certified facilities in the USA.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description:
      'Enjoy free shipping on all orders over $50 with discreet packaging.',
  },
]

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Natural Formula' },
]

const whyChoose = [
  'Science-backed formulations developed by health experts',
  'Third-party tested for purity and potency',
  '30-day money-back guarantee on all products',
  'Responsive customer support available 7 days a week',
  'Subscribe & save up to 20% on auto-delivery',
  'Over 50,000 satisfied customers worldwide',
]

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products
  } catch {
    return []
  }
}

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
    return testimonials
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [featuredProducts, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                Trusted by 50,000+ Men
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Premium Support for{' '}
                <span className="text-accent-light">Prostate Health</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                Discover our clinically-formulated supplements designed to support
                prostate function, urinary health, and overall male wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="bg-white text-primary hover:bg-gray-100" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent-light" />
                  <span className="text-sm">30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-accent-light" />
                  <span className="text-sm">Free Shipping $50+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent-light" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
                <Image
                  src="/hero-product.png"
                  alt="ProstaVita Premium Supplements"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-4">Why Choose ProstaVita</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Committed to Your Prostate Health
            </h2>
            <p className="text-lg text-gray-600">
              We combine nature&apos;s most powerful ingredients with modern science
              to create supplements that truly make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">Our Products</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Best Selling Supplements
              </h2>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link href="/products">
                View All Products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder cards when no products */}
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="mb-4">The ProstaVita Difference</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Thousands of Men Trust Us for Their Health
              </h2>
              <p className="text-gray-600 mb-8">
                At ProstaVita, we&apos;re dedicated to creating the highest quality
                prostate health supplements. Our commitment to excellence shows in
                every bottle we produce.
              </p>

              <ul className="space-y-4">
                {whyChoose.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-8" asChild>
                <Link href="/about">
                  Learn About Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden">
                <Image
                  src="/about-image.jpg"
                  alt="ProstaVita quality manufacturing"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">GMP Certified</div>
                    <div className="text-sm text-gray-600">Quality Assured</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  All products manufactured in FDA-registered facilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
              Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300">
              Join thousands of satisfied customers who have improved their
              prostate health with ProstaVita
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-white/10 backdrop-blur border-0">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white mb-6">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        {testimonial.location && (
                          <div className="text-sm text-gray-300">{testimonial.location}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Placeholder testimonials
              [
                {
                  name: 'Robert M.',
                  location: 'California',
                  content: 'After trying many supplements, ProstaVita is the only one that made a real difference. My urinary symptoms have improved significantly.',
                  rating: 5,
                },
                {
                  name: 'James K.',
                  location: 'Texas',
                  content: 'I was skeptical at first, but after 3 months of using ProstaVita Complete, I feel like a new man. Highly recommend!',
                  rating: 5,
                },
                {
                  name: 'Michael D.',
                  location: 'Florida',
                  content: 'Great product and even better customer service. The subscription option makes it easy to stay consistent with my health routine.',
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur border-0">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white mb-6">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-300">{testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Journey to Better Prostate Health
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join over 50,000 men who have taken control of their prostate health
              with ProstaVita supplements. Try risk-free with our 30-day money-back
              guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-white text-secondary hover:bg-gray-100" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
