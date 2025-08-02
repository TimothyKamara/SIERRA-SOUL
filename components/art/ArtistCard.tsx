"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Palette } from "lucide-react"

interface ArtistCardProps {
  artist: {
    id: string
    name: string
    avatar: string
    location: string
    specialty: string
    followers: number
    artworks: number
    bio: string
  }
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/art/artist/${artist.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={artist.avatar || "/placeholder.svg"}
            alt={artist.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{artist.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <MapPin size={14} />
              <span className="ml-1">{artist.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Palette size={14} />
              <span className="ml-1">{artist.specialty}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{artist.bio}</p>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{artist.followers.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Palette size={16} />
            <span>{artist.artworks} artworks</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
          View Portfolio
        </button>
      </div>
    </Link>
  )
}
