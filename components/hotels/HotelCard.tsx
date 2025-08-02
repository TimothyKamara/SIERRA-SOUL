"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react"

interface HotelCardProps {
  hotel: {
    id: string
    name: string
    image: string
    location: string
    rating: number
    price: number
    amenities: string[]
    description: string
  }
}

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Pool: Waves,
  Restaurant: Utensils,
  Parking: Car,
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link href={`/hotels/${hotel.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={hotel.image || "/placeholder.svg"}
            alt={hotel.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
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

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>

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
              <span className="text-gray-600 text-sm">/night</span>
            </div>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
