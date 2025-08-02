"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import HotelCard from "@/components/hotels/HotelCard"
import HotelFilters from "@/components/hotels/HotelFilters"
import { mockHotels } from "@/lib/mockData"

export default function HotelsPage() {
  const [hotels, setHotels] = useState(mockHotels)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const handleSearch = (searchParams: any) => {
    // TODO: Connect to backend API
    // Example API call: GET /api/hotels?location=${searchParams.location}&checkIn=${searchParams.checkIn}
    console.log("Searching hotels:", searchParams)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotels & Stays</h1>
            <HotelFilters onSearch={handleSearch} />
          </div>
        </div>

        <div className="p-4">
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
          >
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
