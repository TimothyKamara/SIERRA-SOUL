"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TourCardProps {
  tour: {
    id: string
    title: string
    location: string
    duration: string
    price: number
    currency?: string
    rating: number
    images: string[]
    highlights: string[]
    difficulty: string
  }
}

export function TourCard({ tour }: TourCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link href={`/tours/${tour.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={tour.images[0] || "/placeholder.svg"}
              alt={tour.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <Badge className={`absolute top-3 left-3 ${getDifficultyColor(tour.difficulty)}`}>{tour.difficulty}</Badge>
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{tour.rating}</span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{tour.title}</h3>

            <div className="flex items-center text-gray-600 mb-2">
              <MapPin size={16} />
              <span className="ml-1 text-sm">{tour.location}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <Clock size={16} />
              <span className="ml-1 text-sm">{tour.duration}</span>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Highlights:</p>
              <div className="flex flex-wrap gap-1">
                {tour.highlights.slice(0, 3).map((highlight) => (
                  <Badge key={highlight} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
                {tour.highlights.length > 3 && (
                  <span className="text-gray-500 text-xs">+{tour.highlights.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
                <span className="text-gray-600 text-sm">/{tour.currency || "person"}</span>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">Book Tour</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
