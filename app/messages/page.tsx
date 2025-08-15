"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { messagesAPI } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { ConversationList } from "@/components/messages/ConversationList"
import { ChatWindow } from "@/components/messages/ChatWindow"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const { data: conversations, loading, error, refetch } = useApi(() => messagesAPI.getConversations())

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Loading conversations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load conversations</p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-200px)]">
              <div className="w-1/3 border-r bg-white">
                <ConversationList
                  conversations={conversations || []}
                  selectedId={selectedConversation}
                  onSelect={setSelectedConversation}
                />
              </div>

              <div className="flex-1 bg-white">
                {selectedConversation ? (
                  <ChatWindow conversationId={selectedConversation} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a conversation to start messaging
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
