"use client"

import { useState } from "react"
import IPAddressDisplay from "./IpAddressDisplay"
import InformationGrid from "./InformationGrid"
import ExtendedInfo from "./ExtendedInfo"
import ActionButtons from "./ActionButtons"
import type { IPData } from "../types/IpData"

interface IPAnalysisProps {
  ipv4Data: IPData | null
  ipv6Data: IPData | null
  onReset: () => void
  onRefresh: () => void
}

export default function IPAnalysis({ ipv4Data, ipv6Data, onReset, onRefresh }: IPAnalysisProps) {
  const [activeTab, setActiveTab] = useState<"ipv4" | "ipv6">(ipv4Data ? "ipv4" : "ipv6")
  const [showDetails, setShowDetails] = useState(false)

  const currentData = activeTab === "ipv4" ? ipv4Data : ipv6Data

  // Show details after a short delay for better UX
  useState(() => {
    const timer = setTimeout(() => setShowDetails(true), 1000)
    return () => clearTimeout(timer)
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* IP Version Tabs */}
      {ipv4Data && ipv6Data && (
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
            <button
              onClick={() => setActiveTab("ipv4")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "ipv4"
                  ? "bg-green-500/20 text-green-300 border border-green-400/30 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              IPv4 Address
            </button>
            <button
              onClick={() => setActiveTab("ipv6")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "ipv6"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/30 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              IPv6 Address
            </button>
          </div>
        </div>
      )}

      {currentData && (
        <>
          <IPAddressDisplay data={currentData} activeTab={activeTab} />

          {showDetails && (
            <>
              <InformationGrid data={currentData} />
              <ExtendedInfo data={currentData} activeTab={activeTab} />
            </>
          )}

          <ActionButtons data={currentData} onReset={onReset} onRefresh={onRefresh} />
        </>
      )}
    </div>
  )
}
