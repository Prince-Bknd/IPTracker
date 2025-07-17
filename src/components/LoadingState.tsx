"use client"

import { Wifi, Globe, Zap } from "lucide-react"

export default function LoadingState() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Animated Loading Circle */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-8 flex items-center justify-center">
              <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Analyzing Your Network</h3>

          {/* Loading Steps */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-300">
              <Wifi className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-sm">Detecting IP addresses...</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Globe className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm">Fetching location data...</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-sm">Gathering network information...</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full animate-pulse"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">This usually takes a few seconds...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
