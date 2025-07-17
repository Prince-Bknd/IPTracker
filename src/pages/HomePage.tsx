import { useState } from "react"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import IPAnalysis from "../components/IpAnalysis"
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState"
import Footer from "../components/Footer"
import { fetchIPData } from "../utils/ipService"
import type { IPData } from "../types/IpData"

export default function HomePage() {
  const [ipv4Data, setIpv4Data] = useState<IPData | null>(null)
  const [ipv6Data, setIpv6Data] = useState<IPData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleAnalyzeIP = async () => {
    setLoading(true)
    setError("")
    setShowAnalysis(false)
    setIpv4Data(null)
    setIpv6Data(null)

    try {
      // Fetch both IPv4 and IPv6 data
      const [ipv4Result, ipv6Result] = await Promise.allSettled([fetchIPData("4"), fetchIPData("6")])

      if (ipv4Result.status === "fulfilled" && ipv4Result.value) {
        setIpv4Data(ipv4Result.value)
      }

      if (ipv6Result.status === "fulfilled" && ipv6Result.value) {
        setIpv6Data(ipv6Result.value)
      }

      if (
        (ipv4Result.status === "fulfilled" && ipv4Result.value) ||
        (ipv6Result.status === "fulfilled" && ipv6Result.value)
      ) {
        setTimeout(() => setShowAnalysis(true), 800)
      } else {
        setError("Unable to fetch IP address information. Please try again.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    }

    setLoading(false)
  }

  const handleReset = () => {
    setIpv4Data(null)
    setIpv6Data(null)
    setShowAnalysis(false)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern"></div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {!showAnalysis && !loading && !error && <HeroSection onAnalyze={handleAnalyzeIP} />}

          {loading && <LoadingState />}

          {error && <ErrorState error={error} onRetry={handleAnalyzeIP} />}

          {showAnalysis && (ipv4Data || ipv6Data) && (
            <IPAnalysis ipv4Data={ipv4Data} ipv6Data={ipv6Data} onReset={handleReset} onRefresh={handleAnalyzeIP} />
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}
