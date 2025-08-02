"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, MapPin } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    seller: {
      name: string
      rating: number
    }
    location: string
    category: string
    inStock: boolean
  }
  viewMode: "grid" | "list"
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    // TODO: Connect to backend API
    // Example API call: POST /api/products/${product.id}/favorite
    setIsFavorited(!isFavorited)
  }

  if (viewMode === "list") {
    return (
      <Link href={`/marketplace/product/${product.id}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex space-x-4">
            <div className="relative flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
              <button
                onClick={handleFavorite}
                className={`absolute top-2 right-2 p-1.5 rounded-full ${
                  isFavorited ? "bg-red-100 text-red-500" : "bg-white text-gray-400"
                } hover:scale-110 transition-transform`}
              >
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-lg font-bold text-amber-600 mt-1">${product.price}</p>

              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="ml-1">{product.seller.rating}</span>
                </div>
                <span>•</span>
                <span>{product.seller.name}</span>
              </div>

              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPin size={14} />
                <span className="ml-1">{product.location}</span>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/marketplace/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorited ? "bg-red-100 text-red-500" : "bg-white text-gray-400"
            } hover:scale-110 transition-transform`}
          >
            <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-lg font-bold text-amber-600 mt-1">${product.price}</p>

          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="ml-1">{product.seller.rating}</span>
            </div>
            <span className="truncate ml-2">{product.seller.name}</span>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin size={14} />
            <span className="ml-1 truncate">{product.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
