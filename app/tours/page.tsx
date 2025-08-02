"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import TourCard from "@/components/tours/TourCard"
import TourFilters from "@/components/tours/TourFilters"
import { mockTours } from "@/lib/mockData"

export default function ToursPage() {
  const [tours, setTours] = useState(mockTours)

  const handleFilter = (filters: any) => {
    // TODO: Connect to backend API
    // Example API call: GET /api/tours?type=${filters.type}&duration=${filters.duration}
    console.log("Filtering tours:", filters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tours & Experiences</h1>
          <TourFilters onFilter={handleFilter} />
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
