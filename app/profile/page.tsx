"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import BottomNavigation from "@/components/layout/BottomNavigation"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileTabs from "@/components/profile/ProfileTabs"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("posts")

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        <ProfileHeader user={user} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </main>

      <BottomNavigation />
    </div>
  )
}
