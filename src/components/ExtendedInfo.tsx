"use client"

import { Info, Navigation, Router, Building, Zap, ExternalLink } from "lucide-react"
import { detectIPVersion, isPrivateIP, getAddressClass } from "../utils/ipUtils"
import type { IPData } from "../types/IpData"

interface ExtendedInfoProps {
  data: IPData
  activeTab: "ipv4" | "ipv6"
}

export default function ExtendedInfo({ data, activeTab }: ExtendedInfoProps) {
  return (
    <div className="relative animate-slide-up">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
      <div className="relative bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-indigo-400/20">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <Info className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Extended Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Precise Location */}
          {data.latitude && data.longitude && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Navigation className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white">Precise Location</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latitude:</span>
                  <span className="text-white font-mono">{data.latitude}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longitude:</span>
                  <span className="text-white font-mono">{data.longitude}°</span>
                </div>
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 rounded-lg border border-yellow-400/30 text-yellow-300 text-xs hover:bg-yellow-500/30 transition-colors group"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Network Details */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Router className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white">Network Details</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Version:</span>
                <span className="text-white font-medium">IPv{data.version || detectIPVersion(data.ip)}</span>
              </div>
              {activeTab === "ipv4" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Address Type:</span>
                    <span className={`font-medium ${isPrivateIP(data.ip) ? "text-orange-300" : "text-emerald-300"}`}>
                      {isPrivateIP(data.ip) ? "Private" : "Public"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Address Class:</span>
                    <span className="text-white font-medium">{getAddressClass(data.ip)}</span>
                  </div>
                </>
              )}
              {data.network && (
                <div>
                  <span className="text-gray-400 block mb-1">Network:</span>
                  <span className="text-white font-mono text-xs break-all bg-white/5 p-2 rounded border">
                    {data.network}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Cultural Information */}
          {(data.languages || data.continent_code) && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Building className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white">Cultural Info</h3>
              </div>
              <div className="space-y-3 text-sm">
                {data.continent_code && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Continent:</span>
                    <span className="text-white font-medium">{data.continent_code}</span>
                  </div>
                )}
                {data.languages && (
                  <div>
                    <span className="text-gray-400 block mb-2">Languages:</span>
                    <div className="bg-white/5 p-3 rounded border max-h-20 overflow-y-auto">
                      <span className="text-white text-xs break-words">{data.languages}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Connection Information */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white">Connection Info</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Protocol:</span>
                <span className="text-white font-medium">{activeTab === "ipv4" ? "IPv4" : "IPv6"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-medium">Active</span>
                </div>
              </div>
              {data.isp && (
                <div>
                  <span className="text-gray-400 block mb-1">Provider:</span>
                  <div className="bg-white/5 p-2 rounded border">
                    <span className="text-white text-xs break-words">{data.isp}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
