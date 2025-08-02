"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import ArtPiece from "@/components/art/ArtPiece"
import ArtistCard from "@/components/art/ArtistCard"
import { mockArtPieces, mockArtists } from "@/lib/mockData"
import { Palette, Users } from "lucide-react"

export default function ArtPage() {
  const [activeTab, setActiveTab] = useState<"pieces" | "artists">("pieces")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">African Art</h1>

            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("pieces")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  activeTab === "pieces" ? "bg-amber-100 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Palette size={20} />
                <span>Art Pieces</span>
              </button>
              <button
                onClick={() => setActiveTab("artists")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  activeTab === "artists" ? "bg-amber-100 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users size={20} />
                <span>Artists</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {activeTab === "pieces" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockArtPieces.map((piece) => (
                <ArtPiece key={piece.id} piece={piece} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
