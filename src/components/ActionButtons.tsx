"use client"

import { RefreshCw, RotateCcw, Copy } from "lucide-react"
import type { IPData } from "../types/IpData"

interface ActionButtonsProps {
  data: IPData
  onReset: () => void
  onRefresh: () => void
}

export default function ActionButtons({ data, onReset, onRefresh }: ActionButtonsProps) {
  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
      <button
        onClick={onRefresh}
        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20"
      >
        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        <span>Refresh Analysis</span>
      </button>

      <button
        onClick={onReset}
        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
        <span>New Analysis</span>
      </button>

      <button
        onClick={copyData}
        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20"
      >
        <Copy className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <span>Copy Data</span>
      </button>
    </div>
  )
}
