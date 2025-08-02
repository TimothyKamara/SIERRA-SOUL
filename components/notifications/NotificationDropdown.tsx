"use client"

import { useNotifications } from "@/contexts/NotificationContext"
import { X, Heart, MessageCircle, UserPlus, Calendar, Bell } from "lucide-react"
import Image from "next/image"

interface NotificationDropdownProps {
  onClose: () => void
}

const notificationIcons = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  booking: Calendar,
  message: MessageCircle,
  general: Bell,
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id)
    if (actionUrl) {
      // TODO: Navigate to the action URL
      console.log("Navigate to:", actionUrl)
    }
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
        <div className="flex items-center space-x-2">
          <button onClick={markAllAsRead} className="text-sm text-amber-600 hover:text-amber-700">
            Mark all read
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = notificationIcons[notification.type]

            return (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id, notification.actionUrl)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                  !notification.read ? "bg-amber-50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Image
                        src={notification.avatar || "/placeholder.svg"}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Icon size={20} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                  </div>

                  {!notification.read && <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-2"></div>}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
