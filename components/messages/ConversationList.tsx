"use client"

import Image from "next/image"

interface ConversationListProps {
  conversations: Array<{
    id: string
    participant: {
      name: string
      avatar: string
      online: boolean
    }
    lastMessage: string
    timestamp: string
    unread: number
  }>
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="overflow-y-auto">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
            selectedId === conversation.id ? "bg-amber-50 border-r-2 border-r-amber-500" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={conversation.participant.avatar || "/placeholder.svg"}
                alt={conversation.participant.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              {conversation.participant.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">{conversation.participant.name}</h3>
                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <span className="bg-amber-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
