"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authAPI } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  username: string
  avatar: string
  bio?: string
  location?: string
  followers?: number
  following?: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: { name: string; email: string; password: string; username: string }) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (token) {
        const userData = await authAPI.getProfile()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password })
      localStorage.setItem("auth_token", response.token)
      setUser(response.user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (userData: { name: string; email: string; password: string; username: string }) => {
    try {
      const response = await authAPI.register(userData)
      localStorage.setItem("auth_token", response.token)
      setUser(response.user)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      localStorage.removeItem("auth_token")
      setUser(null)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const updatedUser = await authAPI.updateProfile(updates)
      setUser(updatedUser)
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
