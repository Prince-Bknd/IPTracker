import { Link } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

const NotFoundPage = () => {
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
            <div className="text-8xl md:text-9xl font-bold text-white mb-8 opacity-50">
              404
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Page Not Found
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white mb-8">
              <p className="text-lg mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-lg mb-8">
                Don't worry, you can always go back to the home page and start analyzing your IP address.
              </p>
              <Link 
                to="/" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Go Home
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default NotFoundPage 