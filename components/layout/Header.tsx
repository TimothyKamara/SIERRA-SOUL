"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useNotifications } from "@/contexts/NotificationContext"
import { Bell, Search, Menu, X } from "lucide-react"
import NotificationDropdown from "@/components/notifications/NotificationDropdown"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user } = useAuth()
  const { unreadCount } = useNotifications()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Sierra Soul</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search experiences, places, art..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <Search size={24} />
            </button>

            {/* Notifications */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 relative"
                >
                  <Bell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* User Avatar - Desktop */}
            {user && (
              <Link href="/profile" className="hidden md:block">
                <img
                  src={user.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block py-2 text-gray-900 hover:text-amber-600">
              Home
            </Link>
            <Link href="/marketplace" className="block py-2 text-gray-900 hover:text-amber-600">
              Marketplace
            </Link>
            <Link href="/hotels" className="block py-2 text-gray-900 hover:text-amber-600">
              Hotels
            </Link>
            <Link href="/tours" className="block py-2 text-gray-900 hover:text-amber-600">
              Tours
            </Link>
            <Link href="/art" className="block py-2 text-gray-900 hover:text-amber-600">
              Art
            </Link>
            {user ? (
              <Link href="/profile" className="block py-2 text-gray-900 hover:text-amber-600">
                Profile
              </Link>
            ) : (
              <Link href="/auth/login" className="block py-2 text-gray-900 hover:text-amber-600">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
