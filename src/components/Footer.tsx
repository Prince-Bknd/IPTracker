"use client"

import { Heart, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-20 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-400">Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-gray-400">for network professionals</span>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Professional IPv4 & IPv6 analysis with comprehensive network intelligence
          </p>

          <div className="flex items-center justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
