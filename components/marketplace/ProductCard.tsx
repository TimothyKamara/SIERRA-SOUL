"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, MapPin } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    currency?: string
    images: string[]
    seller: {
      name: string
      rating: number
      location: string
    }
    category: string
    inStock: boolean
    featured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
  }

  return (
    <Link href={`/marketplace/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            {product.featured && <Badge className="absolute top-2 left-2 bg-amber-500">Featured</Badge>}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isFavorited ? "bg-red-100 text-red-500" : "bg-white/80 text-gray-600"
              } hover:scale-110 transition-transform`}
            >
              <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
            </Button>

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 truncate mb-1">{product.name}</h3>
            <p className="text-lg font-bold text-amber-600 mb-2">
              ${product.price} {product.currency || "USD"}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span>{product.seller.rating}</span>
              </div>
              <span className="truncate">{product.seller.name}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={14} />
              <span className="ml-1 truncate">{product.seller.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
