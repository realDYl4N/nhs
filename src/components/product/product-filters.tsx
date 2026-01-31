'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const benefits = [
  { value: 'prostate-support', label: 'Prostate Support' },
  { value: 'urinary-health', label: 'Urinary Health' },
  { value: 'hormone-balance', label: 'Hormone Balance' },
  { value: 'antioxidant', label: 'Antioxidant Protection' },
  { value: 'inflammation', label: 'Inflammation Support' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [minPrice, setMinPrice] = React.useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get('maxPrice') || '')

  const createQueryString = React.useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const updateFilters = (params: Record<string, string | null>) => {
    const query = createQueryString(params)
    router.push(`${pathname}${query ? `?${query}` : ''}`)
  }

  const clearAllFilters = () => {
    setMinPrice('')
    setMaxPrice('')
    router.push(pathname)
  }

  const hasFilters =
    searchParams.get('sort') ||
    searchParams.get('benefit') ||
    searchParams.get('minPrice') ||
    searchParams.get('maxPrice') ||
    searchParams.get('inStock')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-8 px-2 text-sm"
          >
            Clear all
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <Select
            value={searchParams.get('sort') || 'newest'}
            onValueChange={(value) => updateFilters({ sort: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Benefit filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Health Benefit
          </label>
          <Select
            value={searchParams.get('benefit') || ''}
            onValueChange={(value) => updateFilters({ benefit: value || null })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All benefits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All benefits</SelectItem>
              {benefits.map((benefit) => (
                <SelectItem key={benefit.value} value={benefit.value}>
                  {benefit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={() => updateFilters({ minPrice: minPrice || null })}
              className="w-full"
            />
            <span className="text-gray-400">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={() => updateFilters({ maxPrice: maxPrice || null })}
              className="w-full"
            />
          </div>
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={searchParams.get('inStock') === 'true'}
              onChange={(e) =>
                updateFilters({ inStock: e.target.checked ? 'true' : null })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
