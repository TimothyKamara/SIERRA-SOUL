"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Send, Paperclip, Smile } from "lucide-react"
import { mockMessages } from "@/lib/mockData"

interface ChatWindowProps {
  conversationId: string
  onBack: () => void
}

export default function ChatWindow({ conversationId, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: "me",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // TODO: Send message to backend
      // Example API call: POST /api/messages
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
        <button onClick={onBack} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </button>

        <div className="relative">
          <Image src="/placeholder.svg?height=40&width=40" alt="User" width={40} height={40} className="rounded-full" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Amara Okafor</h3>
          <p className="text-sm text-green-600">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.senderId === "me" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.senderId === "me" ? "text-amber-100" : "text-gray-500"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Paperclip size={20} />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Smile size={20} />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
