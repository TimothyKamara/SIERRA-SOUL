"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HotelCardProps {
  hotel: {
    id: string
    name: string
    location: string
    rating: number
    price: number
    currency?: string
    images: string[]
    amenities: string[]
    availability: boolean
  }
}

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Pool: Waves,
  Restaurant: Utensils,
  Parking: Car,
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link href={`/hotels/${hotel.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={hotel.images[0] || "/placeholder.svg"}
              alt={hotel.name}
              width={400}
              height={250}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{hotel.rating}</span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{hotel.name}</h3>

            <div className="flex items-center text-gray-600 mb-2">
              <MapPin size={16} />
              <span className="ml-1 text-sm">{hotel.location}</span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              {hotel.amenities.slice(0, 4).map((amenity) => {
                const Icon = amenityIcons[amenity]
                return (
                  <div key={amenity} className="flex items-center space-x-1 text-xs text-gray-500">
                    {Icon && <Icon size={14} />}
                    <span>{amenity}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
                <span className="text-gray-600 text-sm">/{hotel.currency || "night"}</span>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">Book Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
