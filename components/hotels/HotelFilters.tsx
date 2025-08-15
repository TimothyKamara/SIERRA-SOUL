"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HotelFiltersProps {
  onFiltersChange: (params: any) => void
}

export function HotelFilters({ onFiltersChange }: HotelFiltersProps) {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  })

  const handleSearch = () => {
    onFiltersChange(searchParams)
  }

  return (
    <div className="bg-white border-b p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Where are you going?"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Check-in */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="date"
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Check-out */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="date"
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Guests */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Select
              value={searchParams.guests}
              onValueChange={(value) => setSearchParams({ ...searchParams, guests: value })}
            >
              <SelectTrigger className="pl-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Guest{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={handleSearch} className="w-full md:w-auto bg-amber-600 hover:bg-amber-700">
            <Search size={16} className="mr-2" />
            Search Hotels
          </Button>
        </div>
      </div>
    </div>
  )
}
