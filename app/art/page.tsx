"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { artAPI } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { ArtPiece } from "@/components/art/ArtPiece"
import { ArtistCard } from "@/components/art/ArtistCard"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw } from "lucide-react"

export default function ArtPage() {
  const [filters, setFilters] = useState({})

  const {
    data: artPieces,
    loading: piecesLoading,
    error: piecesError,
    refetch: refetchPieces,
  } = useApi(() => artAPI.getArtPieces(filters), [filters])

  const {
    data: artists,
    loading: artistsLoading,
    error: artistsError,
    refetch: refetchArtists,
  } = useApi(() => artAPI.getArtists(filters), [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Art Gallery</h1>
            <p className="text-gray-600">Explore contemporary and traditional African art</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <Tabs defaultValue="pieces" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pieces">Art Pieces</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>

            <TabsContent value="pieces" className="mt-6">
              {piecesLoading ? (
                <div className="text-center py-12">
                  <LoadingSpinner />
                  <p className="mt-4 text-gray-600">Loading art pieces...</p>
                </div>
              ) : piecesError ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">Failed to load art pieces</p>
                  <Button onClick={refetchPieces} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artPieces?.map((piece) => (
                    <ArtPiece key={piece.id} piece={piece} />
                  ))}

                  {(!artPieces || artPieces.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No art pieces found</p>
                      <Button onClick={refetchPieces} variant="outline" className="mt-4 bg-transparent">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="artists" className="mt-6">
              {artistsLoading ? (
                <div className="text-center py-12">
                  <LoadingSpinner />
                  <p className="mt-4 text-gray-600">Loading artists...</p>
                </div>
              ) : artistsError ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">Failed to load artists</p>
                  <Button onClick={refetchArtists} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artists?.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}

                  {(!artists || artists.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No artists found</p>
                      <Button onClick={refetchArtists} variant="outline" className="mt-4 bg-transparent">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
