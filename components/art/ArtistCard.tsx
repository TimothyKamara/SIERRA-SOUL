"use client"
import Link from "next/link"
import { MapPin, Users, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArtistCardProps {
  artist: {
    id: string
    name: string
    bio: string
    location: string
    avatar: string
    artworks: number
    followers: number
  }
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/art/artist/${artist.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
              <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{artist.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <MapPin size={14} />
                <span className="ml-1">{artist.location}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{artist.bio}</p>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{artist.followers.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Palette size={16} />
              <span>{artist.artworks} artworks</span>
            </div>
          </div>

          <Button className="w-full bg-amber-600 hover:bg-amber-700">View Portfolio</Button>
        </CardContent>
      </Card>
    </Link>
  )
}
