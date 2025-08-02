"use client"

import { Facebook, Mail } from "lucide-react"

export default function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    // Example: Redirect to /api/auth/google
    console.log("Google login clicked")
  }

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook OAuth
    // Example: Redirect to /api/auth/facebook
    console.log("Facebook login clicked")
  }

  return (
    <div className="mt-4 space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Mail size={20} className="text-red-500" />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      <button
        onClick={handleFacebookLogin}
        className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Facebook size={20} className="text-blue-600" />
        <span className="text-gray-700 font-medium">Continue with Facebook</span>
      </button>
    </div>
  )
}
