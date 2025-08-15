"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { productsAPI } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { FilterBar } from "@/components/marketplace/FilterBar"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function MarketplacePage() {
  const [filters, setFilters] = useState({})

  const { data: products, loading, error, refetch } = useApi(() => productsAPI.getProducts(filters), [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Marketplace</h1>
            <p className="text-gray-600">Discover authentic African art, crafts, and cultural items</p>
          </div>
        </div>

        <FilterBar onFiltersChange={setFilters} />

        <div className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load products</p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              {(!products || products.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No products found</p>
                  <Button onClick={refetch} variant="outline" className="mt-4 bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
