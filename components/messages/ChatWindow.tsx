"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useApi, useApiMutation } from "@/hooks/useApi"
import { messagesAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Send } from "lucide-react"

interface ChatWindowProps {
  conversationId: string
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    data: conversation,
    loading,
    error,
    refetch,
  } = useApi(() => messagesAPI.getConversation(conversationId), [conversationId])

  const { mutate: sendMessage, loading: sending } = useApiMutation((message: string) =>
    messagesAPI.sendMessage(conversationId, message),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    const messageText = newMessage
    setNewMessage("")

    try {
      await sendMessage(messageText)
      refetch() // Refresh conversation to get updated messages
    } catch (error) {
      console.error("Failed to send message:", error)
      setNewMessage(messageText) // Restore message on error
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !conversation) {
    return <div className="flex items-center justify-center h-full text-red-500">Failed to load conversation</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b bg-white">
        <Avatar>
          <AvatarImage
            src={conversation.participant.avatar || "/placeholder.svg"}
            alt={conversation.participant.name}
          />
          <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{conversation.participant.name}</h3>
          <p className="text-sm text-gray-500">{conversation.participant.online ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages?.map((message) => (
          <div key={message.id} className={`flex ${message.sender.id === "1" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender.id === "1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim() || sending}>
            {sending ? <LoadingSpinner /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
