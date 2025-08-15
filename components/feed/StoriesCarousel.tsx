"use client"

import { useRef } from "react"
import { useApiMutation } from "@/hooks/useApi"
import { storiesAPI } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface Story {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  preview: string
  viewed: boolean
}

interface StoriesCarouselProps {
  stories: Story[]
}

export function StoriesCarousel({ stories = [] }: StoriesCarouselProps) {
  const { mutate: viewStory } = useApiMutation((id: string) => storiesAPI.viewStory(id))
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

  const handleStoryClick = async (storyId: string) => {
    try {
      await viewStory(storyId)
    } catch (error) {
      console.error("Failed to mark story as viewed:", error)
    }
  }

  return (
    <div className="relative w-full">
      <ScrollArea className="w-full">
        <div className="flex space-x-4 p-4" ref={scrollRef}>
          {/* Add Story Button */}
          <div className="flex flex-col items-center space-y-2 min-w-0">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300">
                <AvatarFallback>
                  <Plus className="w-6 h-6 text-gray-400" />
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-gray-600 truncate w-16 text-center">Your Story</span>
          </div>

          {/* Stories */}
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center space-y-2 min-w-0 cursor-pointer"
              onClick={() => handleStoryClick(story.id)}
            >
              <div className="relative">
                <Avatar
                  className={`w-16 h-16 border-2 ${
                    story.viewed ? "border-gray-300" : "border-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {!story.viewed && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                        <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600 truncate w-16 text-center">{story.user.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

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
