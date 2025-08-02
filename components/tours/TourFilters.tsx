"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface TourFiltersProps {
  onFilter: (filters: any) => void
}

export default function TourFilters({ onFilter }: TourFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    duration: "",
    priceRange: [0, 2000],
    difficulty: "",
  })

  const tourTypes = ["All Types", "Adventure", "Cultural", "Wildlife", "Trekking", "Beach", "Historical"]
  const durations = ["All Durations", "1 day", "2-3 days", "4-7 days", "1-2 weeks", "2+ weeks"]
  const difficulties = ["All Levels", "Easy", "Moderate", "Challenging", "Expert"]

  const handleApplyFilters = () => {
    onFilter(filters)
    setShowFilters(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Filter size={20} />
        <span>Filters</span>
      </button>

      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Tour Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Tour Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {tourTypes.map((type) => (
                  <option key={type} value={type === "All Types" ? "" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration === "All Durations" ? "" : duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty === "All Levels" ? "" : difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleApplyFilters}
              className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
