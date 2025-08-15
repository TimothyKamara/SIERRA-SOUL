"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Conversation {
  id: string
  participant: {
    name: string
    avatar: string
    online: boolean
  }
  lastMessage: {
    content: string
    timestamp: string
    read: boolean
  }
  unreadCount: number
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h`
    return date.toLocaleDateString()
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedId === conversation.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={conversation.participant.avatar || "/placeholder.svg"}
                    alt={conversation.participant.name}
                  />
                  <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.participant.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">{conversation.participant.name}</h3>
                  <span className="text-xs text-gray-500">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
              </div>

              {conversation.unreadCount > 0 && (
                <Badge variant="default" className="bg-blue-500 text-white text-xs">
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
          ))}

          {conversations.length === 0 && <div className="text-center py-8 text-gray-500">No conversations yet</div>}
        </div>
      </div>
    </ScrollArea>
  )
}
