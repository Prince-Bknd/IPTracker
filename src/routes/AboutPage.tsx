import Header from "../components/Header"
import Footer from "../components/Footer"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              About IP Analyzer
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
              <p className="text-lg mb-6">
                IP Analyzer is a powerful tool that provides detailed information about your IP addresses, 
                including both IPv4 and IPv6 data. Our service helps you understand your network configuration 
                and provides valuable insights for network administrators and developers.
              </p>
              <p className="text-lg mb-6">
                Built with modern web technologies including React, TypeScript, and Tailwind CSS, 
                IP Analyzer offers a beautiful, responsive interface that works seamlessly across all devices.
              </p>
              <p className="text-lg">
                Get started by analyzing your IP address to see detailed information about your network location, 
                ISP, and more.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AboutPage 