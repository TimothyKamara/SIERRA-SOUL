import { Suspense } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import StoriesCarousel from "@/components/feed/StoriesCarousel"
import FeedPost from "@/components/feed/FeedPost"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { mockPosts } from "@/lib/mockData"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        {/* Stories Section */}
        <div className="bg-white border-b">
          <Suspense fallback={<div className="h-24 animate-pulse bg-gray-200" />}>
            <StoriesCarousel />
          </Suspense>
        </div>

        {/* Feed Section */}
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            {mockPosts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </Suspense>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
