import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Find answers to frequently asked questions about ProstaVita supplements, shipping, returns, and more.',
}

const faqs = {
  products: [
    {
      question: 'What makes ProstaVita supplements different from others?',
      answer: 'ProstaVita supplements are formulated using clinically-studied ingredients at effective doses. We use only premium natural extracts, manufacture in GMP-certified facilities, and conduct third-party testing on every batch for purity and potency. Our formulas are developed by health professionals based on the latest scientific research.',
    },
    {
      question: 'How long does it take to see results?',
      answer: 'While some customers report improvements within the first few weeks, we recommend taking our supplements consistently for at least 2-3 months to experience the full benefits. Individual results may vary based on factors like age, overall health, and lifestyle.',
    },
    {
      question: 'Are there any side effects?',
      answer: 'Our supplements are made with natural ingredients and are generally well-tolerated. However, as with any supplement, some individuals may experience mild digestive discomfort initially. If you have any medical conditions or take medications, please consult your healthcare provider before starting any new supplement.',
    },
    {
      question: 'Can I take ProstaVita with other medications?',
      answer: 'While our supplements contain natural ingredients, we always recommend consulting with your healthcare provider before combining supplements with prescription medications. This is especially important if you take blood thinners, blood pressure medications, or are being treated for any prostate conditions.',
    },
    {
      question: 'Are ProstaVita products FDA approved?',
      answer: 'Dietary supplements are not subject to FDA approval before they are marketed. However, our products are manufactured in FDA-registered, GMP-certified facilities and comply with all FDA regulations for dietary supplements. Each batch is tested for quality, purity, and potency.',
    },
  ],
  orders: [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You can checkout as a guest or create an account for faster future orders and order tracking. We accept all major credit cards and process payments securely through Stripe.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as debit cards. All payments are processed securely through Stripe with 256-bit SSL encryption.',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 2 hours of placement. After this window, orders enter processing and cannot be changed. Please contact our customer service team immediately if you need to make changes.',
    },
    {
      question: 'Do you offer subscriptions or auto-delivery?',
      answer: 'Yes! Subscribe to your favorite products and save 15% on every order. You\'ll enjoy free shipping, flexible delivery schedules (monthly, bi-monthly, or quarterly), and the ability to pause, skip, or cancel anytime.',
    },
  ],
  shipping: [
    {
      question: 'What are your shipping options?',
      answer: 'We offer free standard shipping on orders over $50 within the continental US. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. We\'re working on expanding our shipping capabilities and hope to offer international shipping in the near future.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account on our website or by contacting customer service.',
    },
    {
      question: 'Is shipping discreet?',
      answer: 'Yes, all orders are shipped in plain, unmarked boxes with no indication of the contents. Your privacy is important to us.',
    },
  ],
  returns: [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund (minus shipping costs). Products must be in their original packaging.',
    },
    {
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, please contact our customer service team with your order number. We\'ll provide you with a return authorization and instructions. Returns without authorization may not be processed.',
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-7 business days of receiving your return. The refund will be credited to your original payment method. Please allow additional time for your bank to process the refund.',
    },
  ],
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="default" className="mb-4">Help Center</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our products, orders, shipping, and returns.
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Products */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Products & Usage
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.products.map((faq, index) => (
              <AccordionItem key={index} value={`products-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Orders & Payment
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.orders.map((faq, index) => (
              <AccordionItem key={index} value={`orders-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Shipping */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Shipping & Delivery
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.shipping.map((faq, index) => (
              <AccordionItem key={index} value={`shipping-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Returns */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Returns & Refunds
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.returns.map((faq, index) => (
              <AccordionItem key={index} value={`returns-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-3xl mx-auto mt-12 bg-gray-50 rounded-2xl p-8 text-center">
        <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Still Have Questions?
        </h2>
        <p className="text-gray-600 mb-6">
          Our customer support team is here to help. Reach out and we&apos;ll get back
          to you as soon as possible.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
