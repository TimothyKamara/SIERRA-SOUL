"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import ProductCard from "@/components/marketplace/ProductCard"
import FilterBar from "@/components/marketplace/FilterBar"
import { mockProducts } from "@/lib/mockData"
import { Grid, List } from "lucide-react"

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  const handleFilter = (filters: any) => {
    // TODO: Connect to backend API for filtering
    // Example API call: GET /api/products?category=${filters.category}&minPrice=${filters.minPrice}
    console.log("Applying filters:", filters)
    setFilteredProducts(mockProducts) // For now, return all products
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-amber-100 text-amber-600" : "text-gray-400"}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-amber-100 text-amber-600" : "text-gray-400"}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <FilterBar onFilter={handleFilter} />
        </div>

        <div className="p-4">
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
