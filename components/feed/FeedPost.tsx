"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/useApi"
import { postsAPI } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react"
import Image from "next/image"

interface FeedPostProps {
  post: {
    id: string
    user: {
      id: string
      name: string
      username: string
      avatar: string
      verified?: boolean
    }
    content: string
    images?: string[]
    likes: number
    comments: number
    shares: number
    timestamp: string
    liked: boolean
    saved: boolean
  }
}

export function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(post.liked)
  const [isSaved, setIsSaved] = useState(post.saved)
  const [likesCount, setLikesCount] = useState(post.likes)

  const { mutate: toggleLike } = useApiMutation((liked: boolean) =>
    liked ? postsAPI.unlikePost(post.id) : postsAPI.likePost(post.id),
  )

  const { mutate: toggleSave } = useApiMutation((saved: boolean) =>
    saved ? postsAPI.unsavePost(post.id) : postsAPI.savePost(post.id),
  )

  const handleLike = async () => {
    const newLiked = !isLiked
    setIsLiked(newLiked)
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1))

    try {
      await toggleLike(isLiked)
    } catch (error) {
      // Revert on error
      setIsLiked(!newLiked)
      setLikesCount((prev) => (newLiked ? prev - 1 : prev + 1))
    }
  }

  const handleSave = async () => {
    const newSaved = !isSaved
    setIsSaved(newSaved)

    try {
      await toggleSave(isSaved)
    } catch (error) {
      // Revert on error
      setIsSaved(!newSaved)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{post.user.name}</h3>
                {post.user.verified && (
                  <Badge variant="secondary" className="text-xs">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500">
                @{post.user.username} • {formatTimestamp(post.timestamp)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed">{post.content}</p>
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="relative aspect-square">
            <Image src={post.images[0] || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : ""}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span className="text-xs">{post.shares}</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handleSave} className={isSaved ? "text-blue-500" : ""}>
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
