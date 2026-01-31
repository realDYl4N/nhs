import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getStockStatus(stock: number): {
  label: string
  color: string
} {
  if (stock === 0) {
    return { label: 'Out of Stock', color: 'text-red-600' }
  }
  if (stock <= 5) {
    return { label: `Only ${stock} left`, color: 'text-orange-600' }
  }
  if (stock <= 20) {
    return { label: 'Low Stock', color: 'text-yellow-600' }
  }
  return { label: 'In Stock', color: 'text-green-600' }
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `PV-${timestamp}-${random}`.toUpperCase()
}
