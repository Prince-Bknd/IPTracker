"use client"

import { MapPin, Server, Clock } from "lucide-react"
import type { IPData } from "../types/IpData"

interface InformationGridProps {
  data: IPData
}

export default function InformationGrid({ data }: InformationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {/* Location Information */}
      {(data.city || data.region || data.country) && (
        <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Location</h3>
          </div>
          <div className="space-y-3">
            {data.city && (
              <div className="flex justify-between">
                <span className="text-gray-400">City:</span>
                <span className="text-white font-medium">{data.city}</span>
              </div>
            )}
            {data.region && (
              <div className="flex justify-between">
                <span className="text-gray-400">Region:</span>
                <span className="text-white font-medium">{data.region}</span>
              </div>
            )}
            {data.country && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Country:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{data.country}</span>
                  {data.country_code && (
                    <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">
                      {data.country_code}
                    </span>
                  )}
                </div>
              </div>
            )}
            {data.postal && (
              <div className="flex justify-between">
                <span className="text-gray-400">Postal:</span>
                <span className="text-white font-medium">{data.postal}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Network Information */}
      {(data.isp || data.org || data.as) && (
        <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Network</h3>
          </div>
          <div className="space-y-3">
            {data.isp && (
              <div>
                <span className="text-gray-400 block mb-1">ISP:</span>
                <span className="text-white font-medium text-sm break-words">{data.isp}</span>
              </div>
            )}
            {data.org && (
              <div>
                <span className="text-gray-400 block mb-1">Organization:</span>
                <span className="text-white font-medium text-sm break-words">{data.org}</span>
              </div>
            )}
            {data.as && (
              <div>
                <span className="text-gray-400 block mb-1">AS Number:</span>
                <span className="text-white font-medium text-sm break-words">{data.as}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Regional Information */}
      {(data.timezone || data.currency || data.calling_code) && (
        <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Regional</h3>
          </div>
          <div className="space-y-3">
            {data.timezone && (
              <div className="flex justify-between">
                <span className="text-gray-400">Timezone:</span>
                <span className="text-white font-medium">{data.timezone}</span>
              </div>
            )}
            {data.utc_offset && (
              <div className="flex justify-between">
                <span className="text-gray-400">UTC Offset:</span>
                <span className="text-white font-medium">{data.utc_offset}</span>
              </div>
            )}
            {data.currency && (
              <div className="flex justify-between">
                <span className="text-gray-400">Currency:</span>
                <span className="text-white font-medium">{data.currency}</span>
              </div>
            )}
            {data.calling_code && (
              <div className="flex justify-between">
                <span className="text-gray-400">Calling Code:</span>
                <span className="text-white font-medium">{data.calling_code}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
