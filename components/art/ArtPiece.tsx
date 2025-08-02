"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { useState } from "react"

interface ArtPieceProps {
  piece: {
    id: string
    title: string
    artist: string
    image: string
    price: number
    medium: string
    dimensions: string
    available: boolean
  }
}

export default function ArtPiece({ piece }: ArtPieceProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    // TODO: Connect to backend API
    // Example API call: POST /api/art/${piece.id}/like
  }

  return (
    <Link href={`/art/piece/${piece.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
        <div className="relative">
          <Image
            src={piece.image || "/placeholder.svg"}
            alt={piece.title}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full ${
                  isLiked ? "bg-red-500 text-white" : "bg-white text-gray-700"
                } hover:scale-110 transition-transform`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button className="p-2 bg-white text-gray-700 rounded-full hover:scale-110 transition-transform">
                <Eye size={20} />
              </button>
            </div>
          </div>

          {!piece.available && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Sold
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-gray-900 truncate">{piece.title}</h3>
          <p className="text-sm text-gray-600 mb-1">by {piece.artist}</p>
          <p className="text-xs text-gray-500 mb-2">
            {piece.medium} • {piece.dimensions}
          </p>
          <p className="text-lg font-bold text-amber-600">${piece.price}</p>
        </div>
      </div>
    </Link>
  )
}
