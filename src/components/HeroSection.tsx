"use client"

import { Eye, MapPin, Shield, Network } from "lucide-react"

interface HeroSectionProps {
  onAnalyze: () => void
}

export default function HeroSection({ onAnalyze }: HeroSectionProps) {
  return (
    <div className="text-center py-16 md:py-24">
      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-white">Digital Identity</span>
          </h1>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
          Comprehensive IPv4 and IPv6 address analysis with detailed location, network information, and security
          insights
        </p>

        {/* CTA Button */}
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={onAnalyze}
            className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <Eye className="w-6 h-6 group-hover:animate-pulse" />
              <span>Analyze My IP Address</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-4">✨ Instant analysis • 🔒 100% secure • 🌍 Global coverage</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mb-4 group-hover:animate-bounce">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Precise Location</h3>
          <p className="text-gray-400">
            Get accurate geolocation data including city, region, coordinates, and timezone information.
          </p>
        </div>

        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mb-4 group-hover:animate-bounce">
            <Network className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Network Analysis</h3>
          <p className="text-gray-400">Detailed ISP information, organization data, and autonomous system details.</p>
        </div>

        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl mb-4 group-hover:animate-bounce">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Security Insights</h3>
          <p className="text-gray-400">IPv4/IPv6 detection, private/public classification, and security analysis.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{"<1s"}</div>
            <div className="text-gray-400 text-sm">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">Global</div>
            <div className="text-gray-400 text-sm">Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Available</div>
          </div>
        </div>
      </div>
    </div>
  )
}
