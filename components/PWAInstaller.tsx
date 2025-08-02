"use client"

import { useState, useEffect } from "react"
import { X, Download } from "lucide-react"

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Install Sierra Soul</h3>
          <p className="text-sm text-gray-600 mt-1">Add to your home screen for quick access and offline features.</p>

          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleInstall}
              className="flex items-center space-x-2 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              <Download size={16} />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>

        <button onClick={handleDismiss} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
