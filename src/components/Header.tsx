import { Globe, Shield, Zap } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()
  
  return (
    <header className="relative z-20 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-75"></div>
                <div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  IP Tracker Pro
                </h1>
                <p className="text-xs text-gray-400">Professional Network Analysis</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/" 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" 
                  : "text-gray-300 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/about" 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" 
                  : "text-gray-300 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              About
            </Link>
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Fast</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
              <span className="text-cyan-300 text-sm font-medium">v2.0</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
