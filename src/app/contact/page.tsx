'use client'

import * as React from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'support@prostavita.com',
    description: 'We\'ll respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '1-800-555-0123',
    description: 'Mon-Fri 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Health Street',
    description: 'Wellness City, CA 90210',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon-Fri 9am-6pm EST',
    description: 'Closed weekends & holidays',
  },
]

export default function ContactPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: 'Message sent!',
      description: 'We\'ll get back to you as soon as possible.',
      variant: 'success',
    })

    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="default" className="mb-4">Get in Touch</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          Have a question or need assistance? We&apos;re here to help. Reach out to
          our team and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((info) => (
            <Card key={info.title}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  <p className="text-gray-900">{info.content}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="order">Order Support</SelectItem>
                    <SelectItem value="product">Product Question</SelectItem>
                    <SelectItem value="returns">Returns & Refunds</SelectItem>
                    <SelectItem value="subscription">Subscription Help</SelectItem>
                    <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                  className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button type="submit" size="lg" isLoading={isLoading}>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
