"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react"

interface FeedPostProps {
  post: {
    id: string
    user: {
      name: string
      avatar: string
      username: string
    }
    content: string
    images?: string[]
    video?: string
    likes: number
    comments: number
    shares: number
    timestamp: string
    location?: string
  }
}

export default function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    // TODO: Connect to backend API
    // Example API call: POST /api/posts/${post.id}/like
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    // TODO: Connect to backend API
    // Example API call: POST /api/posts/${post.id}/save
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log("Sharing post:", post.id)
  }

  return (
    <article className="bg-white border-b border-gray-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Image
            src={post.user.avatar || "/placeholder.svg"}
            alt={post.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <p className="text-sm text-gray-500">
              @{post.user.username} • {post.timestamp}
              {post.location && ` • ${post.location}`}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            <Image
              src={post.images[0] || "/placeholder.svg"}
              alt="Post image"
              width={600}
              height={400}
              className="w-full h-auto max-h-96 object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {index === 3 && post.images!.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">+{post.images!.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments}</span>
            </button>

            <button onClick={handleShare} className="flex items-center space-x-2 text-gray-600 hover:text-green-500">
              <Share size={20} />
              <span className="text-sm">{post.shares}</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className={`${isSaved ? "text-amber-500" : "text-gray-600 hover:text-amber-500"}`}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="space-y-3">
            {/* Comment Input */}
            <div className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Your avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Sample Comments */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Commenter"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div>
                  <span className="font-semibold">user123</span>
                  <span className="ml-2 text-gray-700">Amazing experience! 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
