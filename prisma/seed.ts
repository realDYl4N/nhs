import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prostavita.com' },
    update: {},
    create: {
      email: 'admin@prostavita.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'user',
    },
  })
  console.log('Created test user:', user.email)

  // Create products
  const products = [
    {
      name: 'ProstaVita Complete',
      slug: 'prostavita-complete',
      description: `ProstaVita Complete is our flagship formula designed to provide comprehensive prostate support. This advanced blend combines the most effective natural ingredients for prostate health, including Saw Palmetto, Beta-Sitosterol, Pygeum, and essential vitamins and minerals.

Our formula targets multiple aspects of prostate health:
- Supports healthy urinary function
- Promotes normal prostate size
- Helps maintain hormonal balance
- Provides antioxidant protection

Each ingredient is carefully selected based on scientific research and dosed at clinically effective levels. ProstaVita Complete is manufactured in a GMP-certified facility and third-party tested for purity and potency.`,
      shortDescription: 'Our flagship comprehensive prostate support formula with Saw Palmetto, Beta-Sitosterol, and essential nutrients.',
      price: 49.99,
      compareAtPrice: 59.99,
      sku: 'PV-COMPLETE-60',
      stock: 150,
      isActive: true,
      isFeatured: true,
      images: JSON.stringify([
        '/products/prostavita-complete-1.jpg',
        '/products/prostavita-complete-2.jpg',
      ]),
      benefits: JSON.stringify([
        { title: 'Urinary Support', description: 'Promotes healthy urinary flow and reduces nighttime bathroom trips' },
        { title: 'Prostate Health', description: 'Supports normal prostate size and function' },
        { title: 'Hormonal Balance', description: 'Helps maintain healthy DHT levels' },
        { title: 'Antioxidant Protection', description: 'Protects prostate cells from oxidative stress' },
      ]),
      ingredients: JSON.stringify([
        { name: 'Saw Palmetto Extract', amount: '320mg', description: 'Standardized to 45% fatty acids' },
        { name: 'Beta-Sitosterol', amount: '200mg', description: 'Plant sterol for prostate support' },
        { name: 'Pygeum Africanum', amount: '100mg', description: 'African cherry bark extract' },
        { name: 'Zinc', amount: '15mg', description: 'Essential mineral for prostate health' },
        { name: 'Selenium', amount: '55mcg', description: 'Antioxidant mineral' },
        { name: 'Vitamin D3', amount: '1000IU', description: 'Supports immune function' },
        { name: 'Lycopene', amount: '10mg', description: 'Powerful antioxidant from tomatoes' },
      ]),
      supplementFacts: JSON.stringify({
        servingSize: '2 capsules',
        servingsPerContainer: '30',
        nutrients: [
          { name: 'Vitamin D3', amount: '1000 IU', dailyValue: '125%' },
          { name: 'Zinc', amount: '15 mg', dailyValue: '136%' },
          { name: 'Selenium', amount: '55 mcg', dailyValue: '100%' },
          { name: 'Saw Palmetto Extract', amount: '320 mg', dailyValue: '*' },
          { name: 'Beta-Sitosterol', amount: '200 mg', dailyValue: '*' },
          { name: 'Pygeum Africanum', amount: '100 mg', dailyValue: '*' },
          { name: 'Lycopene', amount: '10 mg', dailyValue: '*' },
        ],
      }),
      dosage: 'Take 2 capsules daily with a meal, or as directed by your healthcare provider.',
      warnings: 'Consult your healthcare provider before use if you have a medical condition or take medications. Keep out of reach of children. Store in a cool, dry place.',
    },
    {
      name: 'ProstaVita Ultra',
      slug: 'prostavita-ultra',
      description: `ProstaVita Ultra is our maximum strength formula for men seeking intensive prostate support. This premium blend features higher doses of key ingredients plus additional compounds for enhanced effectiveness.

ProstaVita Ultra includes everything in our Complete formula plus:
- Stinging Nettle Root for additional urinary support
- Pumpkin Seed Extract rich in zinc and phytosterols
- Quercetin for inflammation support
- Green Tea Extract for antioxidant protection

Ideal for men over 50 or those experiencing more significant prostate concerns.`,
      shortDescription: 'Maximum strength prostate support with enhanced formula including Stinging Nettle and Pumpkin Seed.',
      price: 69.99,
      compareAtPrice: 89.99,
      sku: 'PV-ULTRA-60',
      stock: 100,
      isActive: true,
      isFeatured: true,
      images: JSON.stringify([
        '/products/prostavita-ultra-1.jpg',
        '/products/prostavita-ultra-2.jpg',
      ]),
      benefits: JSON.stringify([
        { title: 'Maximum Strength', description: 'Higher doses of key prostate-supporting ingredients' },
        { title: 'Enhanced Formula', description: 'Additional compounds for comprehensive support' },
        { title: 'Urinary Health', description: 'Promotes comfortable and complete urination' },
        { title: 'Night Relief', description: 'Reduces nighttime bathroom trips' },
      ]),
      ingredients: JSON.stringify([
        { name: 'Saw Palmetto Extract', amount: '500mg', description: 'Enhanced dose standardized to 45% fatty acids' },
        { name: 'Beta-Sitosterol Complex', amount: '400mg', description: 'Plant sterol blend' },
        { name: 'Stinging Nettle Root', amount: '300mg', description: 'Supports urinary function' },
        { name: 'Pumpkin Seed Extract', amount: '200mg', description: 'Rich in zinc and phytosterols' },
        { name: 'Pygeum Africanum', amount: '150mg', description: 'African cherry bark extract' },
        { name: 'Quercetin', amount: '100mg', description: 'Flavonoid for inflammation support' },
        { name: 'Green Tea Extract', amount: '100mg', description: 'Standardized to 50% EGCG' },
      ]),
      supplementFacts: JSON.stringify({
        servingSize: '2 capsules',
        servingsPerContainer: '30',
        nutrients: [
          { name: 'Vitamin D3', amount: '2000 IU', dailyValue: '250%' },
          { name: 'Zinc', amount: '30 mg', dailyValue: '273%' },
          { name: 'Selenium', amount: '100 mcg', dailyValue: '182%' },
          { name: 'Saw Palmetto Extract', amount: '500 mg', dailyValue: '*' },
          { name: 'Beta-Sitosterol Complex', amount: '400 mg', dailyValue: '*' },
          { name: 'Stinging Nettle Root', amount: '300 mg', dailyValue: '*' },
          { name: 'Pumpkin Seed Extract', amount: '200 mg', dailyValue: '*' },
        ],
      }),
      dosage: 'Take 2 capsules daily with meals, or as directed by your healthcare provider.',
      warnings: 'Not for use by women or persons under 18. Consult your healthcare provider before use if you have a medical condition or take medications.',
    },
    {
      name: 'ProstaVita Daily',
      slug: 'prostavita-daily',
      description: `ProstaVita Daily is our everyday maintenance formula, perfect for proactive prostate health support. This gentle yet effective blend is designed for daily use as part of your wellness routine.

Featuring core prostate-supporting nutrients at moderate doses, ProstaVita Daily is:
- Ideal for younger men or preventive use
- Gentle on the stomach
- Easy to incorporate into daily routine
- Budget-friendly for long-term use`,
      shortDescription: 'Essential daily prostate support formula for preventive maintenance and overall wellness.',
      price: 34.99,
      compareAtPrice: 44.99,
      sku: 'PV-DAILY-60',
      stock: 200,
      isActive: true,
      isFeatured: true,
      images: JSON.stringify([
        '/products/prostavita-daily-1.jpg',
        '/products/prostavita-daily-2.jpg',
      ]),
      benefits: JSON.stringify([
        { title: 'Daily Prevention', description: 'Supports long-term prostate health' },
        { title: 'Gentle Formula', description: 'Well-tolerated for everyday use' },
        { title: 'Essential Nutrients', description: 'Key vitamins and minerals for prostate function' },
        { title: 'Cost Effective', description: 'Affordable option for ongoing support' },
      ]),
      ingredients: JSON.stringify([
        { name: 'Saw Palmetto Extract', amount: '160mg', description: 'Standardized to 45% fatty acids' },
        { name: 'Beta-Sitosterol', amount: '100mg', description: 'Plant sterol support' },
        { name: 'Zinc', amount: '15mg', description: 'Essential for prostate health' },
        { name: 'Selenium', amount: '55mcg', description: 'Antioxidant protection' },
        { name: 'Vitamin E', amount: '15mg', description: 'Antioxidant vitamin' },
      ]),
      supplementFacts: JSON.stringify({
        servingSize: '1 capsule',
        servingsPerContainer: '60',
        nutrients: [
          { name: 'Vitamin E', amount: '15 mg', dailyValue: '100%' },
          { name: 'Zinc', amount: '15 mg', dailyValue: '136%' },
          { name: 'Selenium', amount: '55 mcg', dailyValue: '100%' },
          { name: 'Saw Palmetto Extract', amount: '160 mg', dailyValue: '*' },
          { name: 'Beta-Sitosterol', amount: '100 mg', dailyValue: '*' },
        ],
      }),
      dosage: 'Take 1 capsule daily with a meal.',
      warnings: 'Consult your healthcare provider before use. Keep out of reach of children.',
    },
    {
      name: 'ProstaVita Night',
      slug: 'prostavita-night',
      description: `ProstaVita Night is specifically formulated to address nighttime urinary concerns. If frequent bathroom trips are disrupting your sleep, this targeted formula can help.

ProstaVita Night combines traditional herbs with modern science:
- Graminex Pollen Extract for bladder support
- Melatonin for natural sleep support
- Valerian Root for relaxation
- Core prostate nutrients

Take before bed to support restful, uninterrupted sleep.`,
      shortDescription: 'Targeted nighttime formula to reduce bathroom trips and support restful sleep.',
      price: 44.99,
      compareAtPrice: 54.99,
      sku: 'PV-NIGHT-30',
      stock: 75,
      isActive: true,
      isFeatured: false,
      images: JSON.stringify([
        '/products/prostavita-night-1.jpg',
        '/products/prostavita-night-2.jpg',
      ]),
      benefits: JSON.stringify([
        { title: 'Nighttime Relief', description: 'Reduces frequency of nighttime bathroom trips' },
        { title: 'Sleep Support', description: 'Natural ingredients to promote restful sleep' },
        { title: 'Bladder Function', description: 'Supports healthy bladder capacity' },
        { title: 'Wake Refreshed', description: 'Helps you get uninterrupted rest' },
      ]),
      ingredients: JSON.stringify([
        { name: 'Graminex Pollen Extract', amount: '250mg', description: 'Supports bladder function' },
        { name: 'Saw Palmetto Extract', amount: '160mg', description: 'Prostate support' },
        { name: 'Melatonin', amount: '3mg', description: 'Natural sleep hormone' },
        { name: 'Valerian Root', amount: '200mg', description: 'Relaxation support' },
        { name: 'Magnesium', amount: '100mg', description: 'Muscle relaxation' },
      ]),
      supplementFacts: JSON.stringify({
        servingSize: '2 capsules',
        servingsPerContainer: '15',
        nutrients: [
          { name: 'Magnesium', amount: '100 mg', dailyValue: '24%' },
          { name: 'Graminex Pollen Extract', amount: '250 mg', dailyValue: '*' },
          { name: 'Saw Palmetto Extract', amount: '160 mg', dailyValue: '*' },
          { name: 'Valerian Root', amount: '200 mg', dailyValue: '*' },
          { name: 'Melatonin', amount: '3 mg', dailyValue: '*' },
        ],
      }),
      dosage: 'Take 2 capsules 30 minutes before bedtime.',
      warnings: 'May cause drowsiness. Do not drive or operate machinery after taking. Not for use with alcohol.',
    },
    {
      name: 'ProstaVita Plus Zinc',
      slug: 'prostavita-plus-zinc',
      description: `ProstaVita Plus Zinc delivers an enhanced dose of zinc, one of the most important minerals for prostate health. The prostate contains more zinc than any other organ in the body, making adequate zinc intake essential.

This formula features:
- Zinc Picolinate for superior absorption
- Copper to maintain mineral balance
- Pumpkin Seed Oil rich in zinc
- Complementary B vitamins`,
      shortDescription: 'Enhanced zinc formula with superior absorption for optimal prostate mineral support.',
      price: 29.99,
      compareAtPrice: 39.99,
      sku: 'PV-ZINC-90',
      stock: 120,
      isActive: true,
      isFeatured: false,
      images: JSON.stringify([
        '/products/prostavita-zinc-1.jpg',
        '/products/prostavita-zinc-2.jpg',
      ]),
      benefits: JSON.stringify([
        { title: 'High Absorption', description: 'Zinc Picolinate for optimal bioavailability' },
        { title: 'Mineral Balance', description: 'Includes copper to maintain proper ratios' },
        { title: 'Prostate Health', description: 'Essential mineral for prostate function' },
        { title: 'Immune Support', description: 'Supports overall immune health' },
      ]),
      ingredients: JSON.stringify([
        { name: 'Zinc Picolinate', amount: '30mg', description: 'High absorption form of zinc' },
        { name: 'Copper', amount: '2mg', description: 'Maintains zinc-copper balance' },
        { name: 'Pumpkin Seed Oil', amount: '500mg', description: 'Natural source of zinc' },
        { name: 'Vitamin B6', amount: '10mg', description: 'Supports zinc metabolism' },
      ]),
      supplementFacts: JSON.stringify({
        servingSize: '1 softgel',
        servingsPerContainer: '90',
        nutrients: [
          { name: 'Vitamin B6', amount: '10 mg', dailyValue: '588%' },
          { name: 'Zinc (as Picolinate)', amount: '30 mg', dailyValue: '273%' },
          { name: 'Copper', amount: '2 mg', dailyValue: '222%' },
          { name: 'Pumpkin Seed Oil', amount: '500 mg', dailyValue: '*' },
        ],
      }),
      dosage: 'Take 1 softgel daily with food.',
      warnings: 'High doses of zinc may interfere with copper absorption. Do not exceed recommended dosage.',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }
  console.log(`Created ${products.length} products`)

  // Create FAQs
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days within the continental US. Expedited shipping options are available at checkout.',
      category: 'Shipping',
      order: 1,
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, return the product in its original packaging for a full refund.',
      category: 'Returns',
      order: 2,
    },
    {
      question: 'Are your products safe?',
      answer: 'Yes, all our products are manufactured in FDA-registered, GMP-certified facilities and undergo third-party testing for purity and potency.',
      category: 'Products',
      order: 3,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq })
  }
  console.log(`Created ${faqs.length} FAQs`)

  // Create testimonials
  const testimonials = [
    {
      name: 'Robert M.',
      location: 'California',
      content: 'After trying many supplements, ProstaVita is the only one that made a real difference. My urinary symptoms have improved significantly and I\'m sleeping through the night again.',
      rating: 5,
    },
    {
      name: 'James K.',
      location: 'Texas',
      content: 'I was skeptical at first, but after 3 months of using ProstaVita Complete, I feel like a new man. The quality is evident and customer service is excellent.',
      rating: 5,
    },
    {
      name: 'Michael D.',
      location: 'Florida',
      content: 'Great product and even better customer service. The subscription option makes it easy to stay consistent with my health routine. Highly recommend!',
      rating: 5,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }
  console.log(`Created ${testimonials.length} testimonials`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
