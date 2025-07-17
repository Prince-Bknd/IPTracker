"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-400/30">
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-4">Analysis Failed</h3>
          <p className="text-red-300 mb-6 text-sm leading-relaxed">{error}</p>

          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
