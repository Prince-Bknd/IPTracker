"use client"

import { Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import { detectIPVersion, isPrivateIP } from "../utils/ipUtils"
import type { IPData } from "../types/IpData"

interface IPAddressDisplayProps {
  data: IPData
  activeTab: "ipv4" | "ipv6"
}

export default function IPAddressDisplay({ data, activeTab }: IPAddressDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Your {activeTab === "ipv4" ? "IPv4" : "IPv6"} Address
          </h2>

          <div className="relative group">
            <div
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 tracking-wider cursor-pointer transition-all duration-300 hover:scale-105 break-all"
              onClick={() => copyToClipboard(data.ip)}
              title="Click to copy"
            >
              {data.ip}
            </div>

            <button
              onClick={() => copyToClipboard(data.ip)}
              className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
            >
              {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div
              className={`px-6 py-3 rounded-full border backdrop-blur-sm ${
                activeTab === "ipv4"
                  ? "bg-green-500/20 border-green-400/30 text-green-300"
                  : "bg-blue-500/20 border-blue-400/30 text-blue-300"
              }`}
            >
              <span className="font-semibold">IPv{data.version || detectIPVersion(data.ip)}</span>
            </div>

            {activeTab === "ipv4" && (
              <div
                className={`px-6 py-3 rounded-full border backdrop-blur-sm ${
                  isPrivateIP(data.ip)
                    ? "bg-orange-500/20 border-orange-400/30 text-orange-300"
                    : "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
                }`}
              >
                <span className="font-semibold">{isPrivateIP(data.ip) ? "Private" : "Public"}</span>
              </div>
            )}
          </div>

          <div className="text-gray-400 max-w-2xl mx-auto">
            {activeTab === "ipv4" ? (
              <>
                <p className="mb-2">32-bit Internet Protocol version 4 address</p>
                <p className={isPrivateIP(data.ip) ? "text-orange-300" : "text-emerald-300"}>
                  {isPrivateIP(data.ip)
                    ? "🔒 Private IP address used within local networks"
                    : "🌐 Public IP address routable on the internet"}
                </p>
              </>
            ) : (
              <>
                <p className="mb-2">128-bit Internet Protocol version 6 address</p>
                <p className="text-blue-300">🚀 Next-generation internet protocol with expanded address space</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
