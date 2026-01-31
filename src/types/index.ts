import type { User, Product, Order, Review, Address } from '@prisma/client'

export type { User, Product, Order, Review, Address }

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

export interface ProductWithReviews extends Product {
  reviews: Review[]
  averageRating?: number
  reviewCount?: number
}

export interface OrderWithItems extends Order {
  items: {
    id: string
    productId: string
    name: string
    quantity: number
    price: number
    product: Product
  }[]
}

export interface SupplementFact {
  name: string
  amount: string
  dailyValue?: string
}

export interface Ingredient {
  name: string
  amount: string
  description?: string
}

export interface Benefit {
  title: string
  description: string
  icon?: string
}

export interface CheckoutFormData {
  email: string
  name: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  phone?: string
  saveAddress?: boolean
}

export interface FilterOptions {
  benefit?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest' | 'rating'
}

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string
    role: string
  }

  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}
