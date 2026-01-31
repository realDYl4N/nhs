import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, Shield, Leaf, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ProstaVita and our mission to support men\'s prostate health with premium natural supplements.',
}

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on ingredient quality, sourcing only the finest natural extracts.',
  },
  {
    icon: Shield,
    title: 'Science-Backed',
    description: 'Every formula is developed based on clinical research and scientific evidence.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We believe in the power of nature to support health without synthetic additives.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Your health journey is our priority. We\'re here to support you every step.',
  },
]

const timeline = [
  { year: '2010', title: 'Founded', description: 'ProstaVita was founded with a mission to improve men\'s prostate health.' },
  { year: '2014', title: 'First Product Launch', description: 'Launched our flagship ProstaVita Complete formula after years of research.' },
  { year: '2018', title: 'GMP Certification', description: 'Achieved GMP certification for our manufacturing facilities.' },
  { year: '2022', title: '50,000 Customers', description: 'Reached the milestone of helping over 50,000 men improve their health.' },
  { year: '2024', title: 'Expanded Line', description: 'Introduced new targeted formulas for comprehensive prostate support.' },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Committed to Men&apos;s Prostate Health Since 2010
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                At ProstaVita, we believe every man deserves to live life to the fullest.
                That&apos;s why we&apos;ve dedicated over a decade to creating premium
                supplements that support prostate health and overall male wellness.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                <Link href="/products">Explore Our Products</Link>
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                <Image
                  src="/about-hero.jpg"
                  alt="ProstaVita team and facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="default" className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empowering Men to Take Control of Their Health
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Prostate health affects millions of men worldwide, yet it&apos;s often
              overlooked until problems arise. Our mission is to change that by
              providing accessible, effective, and natural solutions that help men
              proactively support their prostate health.
            </p>
            <p className="text-lg text-gray-600">
              We combine traditional herbal wisdom with modern scientific research
              to create supplements that are both effective and safe. Every ingredient
              is carefully selected and every formula is rigorously tested to ensure
              you get the best possible support for your health.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src="/quality-lab.jpg"
                  alt="Our quality testing laboratory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <Badge variant="default" className="mb-4">Quality Assurance</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Uncompromising Quality Standards
              </h2>
              <p className="text-gray-600 mb-6">
                Every ProstaVita product is manufactured in FDA-registered, GMP-certified
                facilities in the United States. We go beyond industry standards to ensure
                every bottle meets our rigorous quality requirements.
              </p>
              <ul className="space-y-4">
                {[
                  'Third-party tested for purity and potency',
                  'Heavy metal and contaminant screening',
                  'Verified ingredient identity and authenticity',
                  'Batch testing and quality documentation',
                  'Non-GMO and gluten-free certified',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              A Decade of Dedication
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative md:pl-12">
                    <div className="hidden md:block absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <Card>
                      <CardContent className="p-6">
                        <Badge variant="default" className="mb-2">{item.year}</Badge>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-2xl p-8 md:p-12 text-center text-white">
            <Heart className="h-12 w-12 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the ProstaVita Family
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Over 50,000 men trust ProstaVita for their prostate health. Start your
              journey to better health today with our 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-white text-secondary hover:bg-gray-100" asChild>
                <Link href="/products">Shop Now</Link>
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
