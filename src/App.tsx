"use client"

import { useState } from "react"
import { Globe, MapPin, Wifi, Loader2, Eye, Shield, Server, Clock, Building, Navigation } from "lucide-react"

interface IPData {
  ip: string
  city?: string
  region?: string
  country?: string
  country_code?: string
  timezone?: string
  isp?: string
  org?: string
  as?: string
  latitude?: number
  longitude?: number
  postal?: string
  currency?: string
  languages?: string
  continent_code?: string
  utc_offset?: string
  calling_code?: string
  version?: string
  network?: string
}

function App() {
  const [ipv4Data, setIpv4Data] = useState<IPData | null>(null)
  const [ipv6Data, setIpv6Data] = useState<IPData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState<"ipv4" | "ipv6">("ipv4")

  // Function to detect IP version
  const detectIPVersion = (ip: string): string => {
    if (ip.includes(":")) {
      return "6"
    }
    if (ip.includes(".") && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
      return "4"
    }
    return "4"
  }

  // Function to check if IP is private/local
  const isPrivateIP = (ip: string): boolean => {
    const ipv4PrivateRanges = [/^10\./, /^172\.(1[6-9]|2[0-9]|3[0-1])\./, /^192\.168\./, /^127\./, /^169\.254\./]
    return ipv4PrivateRanges.some((range) => range.test(ip))
  }

  const fetchIPData = async (version: "4" | "6"): Promise<IPData | null> => {
    const apis =
      version === "4"
        ? [
            "https://ipapi.co/json/",
            "https://api.ipify.org?format=json",
            "https://ipinfo.io/json",
            "https://api.my-ip.io/ip.json",
          ]
        : ["https://api64.ipify.org?format=json", "https://ipapi.co/json/"]

    for (const api of apis) {
      try {
        const response = await fetch(api)
        if (!response.ok) continue

        const data = await response.json()

        // Handle different API response formats
        let normalizedData: IPData

        if (api.includes("ipapi.co")) {
          if (data.error) continue
          normalizedData = {
            ...data,
            version: detectIPVersion(data.ip),
          }
        } else if (api.includes("ipinfo.io")) {
          const [lat, lng] = (data.loc || "0,0").split(",")
          normalizedData = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country,
            country_code: data.country,
            timezone: data.timezone,
            isp: data.org,
            org: data.org,
            postal: data.postal,
            latitude: Number.parseFloat(lat),
            longitude: Number.parseFloat(lng),
            version: detectIPVersion(data.ip),
          }
        } else if (api.includes("ipify.org") || api.includes("my-ip.io")) {
          const ip = data.ip || data
          normalizedData = {
            ip: ip,
            version: detectIPVersion(ip),
          }
        } else {
          normalizedData = {
            ip: data.ip || data,
            version: detectIPVersion(data.ip || data),
          }
        }

        // Validate that we got the correct IP version
        const detectedVersion = detectIPVersion(normalizedData.ip)
        if (detectedVersion === version) {
          return normalizedData
        }
      } catch (err) {
        console.error(`API ${api} failed:`, err)
        continue
      }
    }
    return null
  }

  const fetchBothIPVersions = async () => {
    setLoading(true)
    setError("")
    setShowDetails(false)
    setIpv4Data(null)
    setIpv6Data(null)

    try {
      // Fetch both IPv4 and IPv6 data concurrently
      const [ipv4Result, ipv6Result] = await Promise.allSettled([fetchIPData("4"), fetchIPData("6")])

      let hasData = false

      if (ipv4Result.status === "fulfilled" && ipv4Result.value) {
        setIpv4Data(ipv4Result.value)
        hasData = true
      }

      if (ipv6Result.status === "fulfilled" && ipv6Result.value) {
        setIpv6Data(ipv6Result.value)
        hasData = true
      }

      if (!hasData) {
        setError(
          "Unable to fetch IP address information from any available service. Please check your internet connection and try again.",
        )
      } else {
        // Set active tab to the first available data
        if (ipv4Result.status === "fulfilled" && ipv4Result.value) {
          setActiveTab("ipv4")
        } else if (ipv6Result.status === "fulfilled" && ipv6Result.value) {
          setActiveTab("ipv6")
        }
        setTimeout(() => setShowDetails(true), 500)
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching IP information.")
    }

    setLoading(false)
  }

  const resetData = () => {
    setIpv4Data(null)
    setIpv6Data(null)
    setShowDetails(false)
    setError("")
    setActiveTab("ipv4")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    })
  }

  const currentData = activeTab === "ipv4" ? ipv4Data : ipv6Data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Globe className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent px-2">
            IP Tracker Pro
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Comprehensive IPv4 and IPv6 address analysis with detailed location and network information
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto">
          {!ipv4Data && !ipv6Data && !loading && (
            <div className="text-center animate-slide-up">
              <button
                onClick={fetchBothIPVersions}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm w-full sm:w-auto"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="whitespace-nowrap">Analyze My IP Addresses</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm">Instant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Detailed</span>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mx-4">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                <span className="text-white font-medium text-sm sm:text-base">Analyzing your IP addresses...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center animate-shake max-w-2xl mx-auto px-4">
              <div className="px-4 sm:px-6 py-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 mb-4">
                <p className="text-red-300 font-medium text-sm sm:text-base">{error}</p>
              </div>
              <button
                onClick={fetchBothIPVersions}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Try Again
              </button>
            </div>
          )}

          {(ipv4Data || ipv6Data) && (
            <div className="space-y-6 animate-slide-up">
              {/* IP Version Tabs */}
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                  {ipv4Data && (
                    <button
                      onClick={() => setActiveTab("ipv4")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        activeTab === "ipv4"
                          ? "bg-green-500/20 text-green-300 border border-green-400/30"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      IPv4 Address
                    </button>
                  )}
                  {ipv6Data && (
                    <button
                      onClick={() => setActiveTab("ipv6")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        activeTab === "ipv6"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      IPv6 Address
                    </button>
                  )}
                </div>
              </div>

              {currentData && (
                <>
                  {/* IP Address Display */}
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl mx-4 sm:mx-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      Your {activeTab === "ipv4" ? "IPv4" : "IPv6"} Address
                    </h2>
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-cyan-400 mb-4 sm:mb-6 tracking-wider cursor-pointer hover:text-cyan-300 transition-colors break-all"
                      onClick={() => copyToClipboard(currentData.ip)}
                      title="Click to copy"
                    >
                      {currentData.ip}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                      {/* IP Version Badge */}
                      <div
                        className={`inline-block px-4 py-2 rounded-full border ${
                          activeTab === "ipv4"
                            ? "bg-green-500/20 border-green-400/30"
                            : "bg-blue-500/20 border-blue-400/30"
                        }`}
                      >
                        <span
                          className={`font-medium text-sm ${activeTab === "ipv4" ? "text-green-300" : "text-blue-300"}`}
                        >
                          IPv{currentData.version || detectIPVersion(currentData.ip)}
                        </span>
                      </div>

                      {/* Private/Public Badge - Only for IPv4 */}
                      {activeTab === "ipv4" && (
                        <div
                          className={`inline-block px-4 py-2 rounded-full border ${
                            isPrivateIP(currentData.ip)
                              ? "bg-orange-500/20 border-orange-400/30"
                              : "bg-emerald-500/20 border-emerald-400/30"
                          }`}
                        >
                          <span
                            className={`font-medium text-sm ${
                              isPrivateIP(currentData.ip) ? "text-orange-300" : "text-emerald-300"
                            }`}
                          >
                            {isPrivateIP(currentData.ip) ? "Private" : "Public"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* IP Version Information */}
                    <div className="text-sm text-gray-400 mt-2">
                      {activeTab === "ipv4" ? (
                        <>
                          <p>32-bit Internet Protocol version 4 address</p>
                          {isPrivateIP(currentData.ip) ? (
                            <p className="text-orange-300 mt-1">
                              This is a private IP address used within local networks
                            </p>
                          ) : (
                            <p className="text-emerald-300 mt-1">
                              This is a public IP address routable on the internet
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p>128-bit Internet Protocol version 6 address</p>
                          <p className="text-blue-300 mt-1">
                            Next-generation internet protocol with expanded address space
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {showDetails && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in animation-delay-500 px-4 sm:px-0">
                      {/* Location Information */}
                      {(currentData.city || currentData.region || currentData.country) && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                          <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="w-5 h-5 text-green-400" />
                            <h3 className="text-base sm:text-lg font-semibold text-white">Location</h3>
                          </div>
                          <div className="space-y-2">
                            {currentData.city && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">City:</span> {currentData.city}
                              </div>
                            )}
                            {currentData.region && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Region:</span> {currentData.region}
                              </div>
                            )}
                            {currentData.country && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Country:</span> {currentData.country}
                                {currentData.country_code && (
                                  <span className="ml-2 px-2 py-1 bg-green-500/20 rounded text-xs text-green-300 inline-block mt-1 sm:mt-0">
                                    {currentData.country_code}
                                  </span>
                                )}
                              </div>
                            )}
                            {currentData.postal && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Postal:</span> {currentData.postal}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Network Information */}
                      {(currentData.isp || currentData.org || currentData.as) && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                          <div className="flex items-center space-x-2 mb-4">
                            <Server className="w-5 h-5 text-blue-400" />
                            <h3 className="text-base sm:text-lg font-semibold text-white">Network</h3>
                          </div>
                          <div className="space-y-2">
                            {currentData.isp && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">ISP:</span>
                                <span className="break-words ml-1">{currentData.isp}</span>
                              </div>
                            )}
                            {currentData.org && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Organization:</span>
                                <span className="break-words ml-1">{currentData.org}</span>
                              </div>
                            )}
                            {currentData.as && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">AS Number:</span>
                                <span className="break-words ml-1">{currentData.as}</span>
                              </div>
                            )}
                            {currentData.network && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Network:</span>
                                <span className="break-words ml-1">{currentData.network}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Time & Regional Info */}
                      {(currentData.timezone || currentData.currency || currentData.languages) && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                          <div className="flex items-center space-x-2 mb-4">
                            <Clock className="w-5 h-5 text-purple-400" />
                            <h3 className="text-base sm:text-lg font-semibold text-white">Regional</h3>
                          </div>
                          <div className="space-y-2">
                            {currentData.timezone && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Timezone:</span> {currentData.timezone}
                              </div>
                            )}
                            {currentData.utc_offset && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">UTC Offset:</span> {currentData.utc_offset}
                              </div>
                            )}
                            {currentData.currency && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Currency:</span> {currentData.currency}
                              </div>
                            )}
                            {currentData.languages && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Languages:</span>
                                <span className="break-words break-all ml-1">{currentData.languages}</span>
                              </div>
                            )}
                            {currentData.calling_code && (
                              <div className="text-gray-300 text-sm sm:text-base">
                                <span className="text-gray-400">Calling Code:</span> {currentData.calling_code}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Coordinates */}
                      {currentData.latitude && currentData.longitude && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
                          <div className="flex items-center space-x-2 mb-4">
                            <Navigation className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-base sm:text-lg font-semibold text-white">Coordinates</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="text-gray-300 text-sm sm:text-base">
                              <span className="text-gray-400">Latitude:</span> {currentData.latitude}°
                            </div>
                            <div className="text-gray-300 text-sm sm:text-base">
                              <span className="text-gray-400">Longitude:</span> {currentData.longitude}°
                            </div>
                            <a
                              href={`https://www.google.com/maps?q=${currentData.latitude},${currentData.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 px-3 py-1 bg-yellow-500/20 rounded-lg border border-yellow-400/30 text-yellow-300 text-xs sm:text-sm hover:bg-yellow-500/30 transition-colors"
                            >
                              View on Map
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      {currentData.continent_code && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                          <div className="flex items-center space-x-2 mb-4">
                            <Building className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-base sm:text-lg font-semibold text-white">Additional</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="text-gray-300 text-sm sm:text-base">
                              <span className="text-gray-400">Continent:</span> {currentData.continent_code}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 px-4 sm:px-0">
                <button
                  onClick={fetchBothIPVersions}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base"
                >
                  Refresh Analysis
                </button>
                <button
                  onClick={resetData}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base"
                >
                  New Analysis
                </button>
                {currentData && (
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(currentData, null, 2))}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base"
                  >
                    Copy Data
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 px-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Professional IPv4 & IPv6 analysis with comprehensive network intelligence
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
