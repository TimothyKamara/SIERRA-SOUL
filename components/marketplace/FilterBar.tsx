"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterBarProps {
  onFiltersChange: (filters: any) => void
}

export function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    inStock: false,
  })

  const categories = [
    "All Categories",
    "Crafts & Handmade",
    "Clothing & Fashion",
    "Art & Collectibles",
    "Home & Living",
    "Jewelry & Accessories",
    "Food & Beverages",
  ]

  const handleApplyFilters = () => {
    onFiltersChange(filters)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      inStock: false,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="bg-white border-b p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Products</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === "All Categories" ? "" : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="$0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="$1000"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
            </div>

            {/* In Stock Only */}
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => setFilters({ ...filters, inStock: !!checked })}
              />
              <label htmlFor="inStock" className="text-sm text-gray-700">
                In stock only
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClearFilters} className="flex-1 bg-transparent">
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
