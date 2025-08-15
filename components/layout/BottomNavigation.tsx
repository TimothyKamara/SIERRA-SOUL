"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Hotel, MapPin, Palette, MessageCircle, User } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/marketplace", icon: ShoppingBag, label: "Shop" },
  { href: "/hotels", icon: Hotel, label: "Hotels" },
  { href: "/tours", icon: MapPin, label: "Tours" },
  { href: "/art", icon: Palette, label: "Art" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-1 px-2 min-w-0 ${
                isActive ? "text-amber-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
