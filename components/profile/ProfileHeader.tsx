"use client"

import Image from "next/image"
import { MapPin, Calendar, Edit, Settings } from "lucide-react"

interface ProfileHeaderProps {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    username?: string
    bio?: string
    followers?: number
    following?: number
  }
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-amber-400 to-orange-500"></div>

      <div className="px-4 pb-4">
        {/* Profile Info */}
        <div className="flex items-end space-x-4 -mt-16">
          <div className="relative">
            <Image
              src={user.avatar || "/placeholder.svg?height=120&width=120"}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white bg-white"
            />
          </div>

          <div className="flex-1 pt-16">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {user.username && <p className="text-gray-600">@{user.username}</p>}
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Stats */}
        <div className="mt-4">
          {user.bio && <p className="text-gray-700 mb-3">{user.bio}</p>}

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>Sierra Leone</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Joined March 2024</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 mt-3">
            <div>
              <span className="font-bold text-gray-900">{user.following || 0}</span>
              <span className="text-gray-600 ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">{user.followers || 0}</span>
              <span className="text-gray-600 ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
