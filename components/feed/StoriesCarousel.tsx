"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { mockStories } from "@/lib/mockData"

export default function StoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Add Story Button */}
        <div className="flex-shrink-0">
          <button className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-dashed border-gray-400">
              <Plus size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Your Story</span>
          </button>
        </div>

        {/* Stories */}
        {mockStories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <button className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-orange-600">
                  <Image
                    src={story.user.avatar || "/placeholder.svg"}
                    alt={story.user.name}
                    width={60}
                    height={60}
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                  />
                </div>
                {!story.viewed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="text-xs text-gray-900 max-w-[60px] truncate">{story.user.name}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  )
}
