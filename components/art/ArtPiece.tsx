"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ArtPieceProps {
  piece: {
    id: string
    title: string
    artist: {
      name: string
      id: string
    }
    price: number
    currency?: string
    medium: string
    dimensions: string
    images: string[]
    available: boolean
  }
}

export function ArtPiece({ piece }: ArtPieceProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/art/piece/${piece.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={piece.images[0] || "/placeholder.svg"}
              alt={piece.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`p-2 rounded-full ${
                    isLiked ? "bg-red-500 text-white" : "bg-white text-gray-700"
                  } hover:scale-110 transition-transform`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-white text-gray-700 rounded-full hover:scale-110 transition-transform"
                >
                  <Eye size={20} />
                </Button>
              </div>
            </div>

            {!piece.available && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Sold
              </Badge>
            )}
          </div>

          <div className="p-3">
            <h3 className="font-semibold text-gray-900 truncate">{piece.title}</h3>
            <p className="text-sm text-gray-600 mb-1">by {piece.artist.name}</p>
            <p className="text-xs text-gray-500 mb-2">
              {piece.medium} • {piece.dimensions}
            </p>
            <p className="text-lg font-bold text-amber-600">
              ${piece.price} {piece.currency || "USD"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
