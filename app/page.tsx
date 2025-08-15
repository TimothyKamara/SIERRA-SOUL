"use client"

import { useApi } from "@/hooks/useApi"
import { postsAPI, storiesAPI } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { StoriesCarousel } from "@/components/feed/StoriesCarousel"
import { FeedPost } from "@/components/feed/FeedPost"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function HomePage() {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useApi(() => postsAPI.getFeed())
  const {
    data: stories,
    loading: storiesLoading,
    error: storiesError,
    refetch: refetchStories,
  } = useApi(() => storiesAPI.getStories())

  const handleRefresh = () => {
    refetchPosts()
    refetchStories()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        {/* Stories Section */}
        <div className="bg-white border-b">
          {storiesLoading ? (
            <div className="p-4">
              <LoadingSpinner />
            </div>
          ) : storiesError ? (
            <div className="p-4 text-center">
              <p className="text-red-500 mb-2">Failed to load stories</p>
              <Button onClick={refetchStories} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          ) : (
            <StoriesCarousel stories={stories || []} />
          )}
        </div>

        {/* Feed Section */}
        <div className="max-w-2xl mx-auto">
          {postsLoading ? (
            <div className="p-8 text-center">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Loading your feed...</p>
            </div>
          ) : postsError ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-4">Failed to load feed</p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Feed
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts?.map((post) => (
                <FeedPost key={post.id} post={post} />
              ))}

              {(!posts || posts.length === 0) && (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No posts to show</p>
                  <Button onClick={handleRefresh} variant="outline" className="mt-4 bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
