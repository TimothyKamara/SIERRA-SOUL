"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TourFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function TourFilters({ onFiltersChange }: TourFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    duration: "",
    difficulty: "",
  })

  const tourTypes = ["All Types", "Adventure", "Cultural", "Wildlife", "Trekking", "Beach", "Historical"]
  const durations = ["All Durations", "1 day", "2-3 days", "4-7 days", "1-2 weeks", "2+ weeks"]
  const difficulties = ["All Levels", "Easy", "Moderate", "Challenging", "Expert"]

  const handleApplyFilters = () => {
    onFiltersChange(filters)
    setShowFilters(false)
  }

  return (
    <div className="bg-white border-b p-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
          <Filter size={16} />
          <span>Filters</span>
        </Button>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Tour Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tour Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {tourTypes.map((type) => (
                      <SelectItem key={type} value={type === "All Types" ? "" : type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration === "All Durations" ? "" : duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) => setFilters({ ...filters, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty === "All Levels" ? "" : difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleApplyFilters} className="mt-4 w-full md:w-auto">
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
