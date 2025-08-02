"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"

interface TourCardProps {
  tour: {
    id: string
    name: string
    image: string
    location: string
    duration: string
    price: number
    type: string
    rating: number
    description: string
    includes: string[]
  }
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tours/${tour.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={tour.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {tour.type}
          </div>
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-semibold">{tour.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{tour.name}</h3>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={16} />
            <span className="ml-1 text-sm">{tour.location}</span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <Clock size={16} />
            <span className="ml-1 text-sm">{tour.duration}</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>

          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Includes:</p>
            <div className="flex flex-wrap gap-1">
              {tour.includes.slice(0, 3).map((item) => (
                <span key={item} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {item}
                </span>
              ))}
              {tour.includes.length > 3 && (
                <span className="text-gray-500 text-xs">+{tour.includes.length - 3} more</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
              <span className="text-gray-600 text-sm">/person</span>
            </div>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Book Tour
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
