"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "message" | "booking" | "general"
  title: string
  message: string
  timestamp: string
  read: boolean
  avatar?: string
  actionUrl?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "New Like",
    message: "John liked your post about Serengeti Safari",
    timestamp: "2 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/post/123",
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Sarah commented on your marketplace listing",
    timestamp: "1 hour ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/marketplace/product/456",
  },
  {
    id: "3",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your hotel booking at Zanzibar Resort has been confirmed",
    timestamp: "3 hours ago",
    read: true,
    actionUrl: "/bookings/789",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    // TODO: Mark as read on backend
    // Example API call: PUT /api/notifications/${id}/read
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    // TODO: Mark all as read on backend
    // Example API call: PUT /api/notifications/read-all
  }

  const addNotification = (notificationData: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
