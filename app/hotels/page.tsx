"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { hotelsAPI } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { HotelCard } from "@/components/hotels/HotelCard"
import { HotelFilters } from "@/components/hotels/HotelFilters"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({})

  const { data: hotels, loading, error, refetch } = useApi(() => hotelsAPI.getHotels(searchParams), [searchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotels & Lodges</h1>
            <p className="text-gray-600">Find the perfect accommodation for your African adventure</p>
          </div>
        </div>

        <HotelFilters onFiltersChange={setSearchParams} />

        <div className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Searching hotels...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load hotels</p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}

              {(!hotels || hotels.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No hotels found</p>
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
