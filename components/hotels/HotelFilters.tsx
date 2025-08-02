"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Search } from "lucide-react"

interface HotelFiltersProps {
  onSearch: (params: any) => void
}

export default function HotelFilters({ onSearch }: HotelFiltersProps) {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: [0, 500],
  })

  const handleSearch = () => {
    onSearch(searchParams)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      {/* Location */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Where are you going?"
          value={searchParams.location}
          onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      {/* Check-in and Check-out */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            value={searchParams.checkIn}
            onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            value={searchParams.checkOut}
            onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="relative">
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <select
          value={searchParams.guests}
          onChange={(e) => setSearchParams({ ...searchParams, guests: Number.parseInt(e.target.value) })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Search size={20} />
        <span>Search Hotels</span>
      </button>
    </div>
  )
}
