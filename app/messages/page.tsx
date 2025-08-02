"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import ConversationList from "@/components/messages/ConversationList"
import ChatWindow from "@/components/messages/ChatWindow"
import { mockConversations } from "@/lib/mockData"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [conversations] = useState(mockConversations)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className={`${selectedConversation ? "hidden md:block" : "block"} w-full md:w-1/3 border-r bg-white`}>
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </div>
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversation}
              onSelect={setSelectedConversation}
            />
          </div>

          {/* Chat Window */}
          <div className={`${selectedConversation ? "block" : "hidden md:block"} w-full md:w-2/3`}>
            {selectedConversation ? (
              <ChatWindow conversationId={selectedConversation} onBack={() => setSelectedConversation(null)} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
