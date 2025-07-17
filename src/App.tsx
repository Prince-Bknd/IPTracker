import React, { useState } from 'react';
import { Globe, MapPin, Wifi, Loader2, Eye, Shield, Server, Clock, Building, Navigation } from 'lucide-react';

interface IPData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  latitude?: number;
  longitude?: number;
  postal?: string;
  currency?: string;
  languages?: string;
  continent_code?: string;
  utc_offset?: string;
  calling_code?: string;
  version?: string;
  network?: string;
}

function App() {
  const [ipData, setIpData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const fetchIPAddress = async () => {
    setLoading(true);
    setError('');
    setShowDetails(false);
    
    // Primary API with detailed information
    const primaryAPI = 'https://ipapi.co/json/';
    
    // Fallback APIs
    const fallbackAPIs = [
      'https://api.ipify.org?format=json',
      'https://httpbin.org/ip',
      'https://api.my-ip.io/ip.json'
    ];

    try {
      // Try primary API first for detailed info
      const response = await fetch(primaryAPI);
      if (response.ok) {
        const data = await response.json();
        
        // Check if we got an error response from ipapi.co
        if (data.error) {
          throw new Error(`API Error: ${data.reason || 'Unknown error'}`);
        }
        
        setIpData(data);
        setTimeout(() => setShowDetails(true), 500);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error('Primary API failed:', err);
    }

    // Try fallback APIs if primary fails
    for (let i = 0; i < fallbackAPIs.length; i++) {
      try {
        const response = await fetch(fallbackAPIs[i]);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Normalize the response format
        let normalizedData: IPData;
        if (data.origin) {
          // httpbin.org format
          normalizedData = { ip: data.origin };
        } else {
          // api.ipify.org and api.my-ip.io format
          normalizedData = { ip: data.ip || data };
        }
        
        setIpData(normalizedData);
        setTimeout(() => setShowDetails(true), 500);
        setLoading(false);
        return;
      } catch (err) {
        console.error(`Fallback API ${fallbackAPIs[i]} failed:`, err);
      }
    }
    
    // If all APIs failed
    setError('Unable to fetch IP address from any available service. This could be due to network connectivity issues, API rate limits, or service outages. Please check your internet connection and try again in a few moments.');
    setLoading(false);
  };

  const resetData = () => {
    setIpData(null);
    setShowDetails(false);
    setError('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

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
            Comprehensive IP address analysis with detailed location and network information
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto">
          {!ipData && !loading && (
            <div className="text-center animate-slide-up">
              <button
                onClick={fetchIPAddress}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm w-full sm:w-auto"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="whitespace-nowrap">Analyze My IP Address</span>
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
                <span className="text-white font-medium text-sm sm:text-base">Analyzing your IP address...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center animate-shake max-w-2xl mx-auto px-4">
              <div className="px-4 sm:px-6 py-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 mb-4">
                <p className="text-red-300 font-medium text-sm sm:text-base">{error}</p>
              </div>
              <button
                onClick={fetchIPAddress}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Try Again
              </button>
            </div>
          )}

          {ipData && (
            <div className="space-y-6 animate-slide-up">
              {/* IP Address Display */}
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl mx-4 sm:mx-0">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Your IP Address</h2>
                <div 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-cyan-400 mb-4 sm:mb-6 tracking-wider cursor-pointer hover:text-cyan-300 transition-colors break-all"
                  onClick={() => copyToClipboard(ipData.ip)}
                  title="Click to copy"
                >
                  {ipData.ip}
                </div>
                
                {ipData.version && (
                  <div className="inline-block px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-4">
                    <span className="text-cyan-300 text-sm font-medium">IPv{ipData.version}</span>
                  </div>
                )}
              </div>

              {showDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in animation-delay-500 px-4 sm:px-0">
                  {/* Location Information */}
                  {(ipData.city || ipData.region || ipData.country) && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white">Location</h3>
                      </div>
                      <div className="space-y-2">
                        {ipData.city && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">City:</span> {ipData.city}
                          </div>
                        )}
                        {ipData.region && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Region:</span> {ipData.region}
                          </div>
                        )}
                        {ipData.country && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Country:</span> {ipData.country}
                            {ipData.country_code && (
                              <span className="ml-2 px-2 py-1 bg-green-500/20 rounded text-xs text-green-300 inline-block mt-1 sm:mt-0">
                                {ipData.country_code}
                              </span>
                            )}
                          </div>
                        )}
                        {ipData.postal && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Postal:</span> {ipData.postal}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Network Information */}
                  {(ipData.isp || ipData.org || ipData.as) && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <Server className="w-5 h-5 text-blue-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white">Network</h3>
                      </div>
                      <div className="space-y-2">
                        {ipData.isp && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">ISP:</span> 
                            <span className="break-words ml-1">{ipData.isp}</span>
                          </div>
                        )}
                        {ipData.org && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Organization:</span> 
                            <span className="break-words ml-1">{ipData.org}</span>
                          </div>
                        )}
                        {ipData.as && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">AS Number:</span> 
                            <span className="break-words ml-1">{ipData.as}</span>
                          </div>
                        )}
                        {ipData.network && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Network:</span> 
                            <span className="break-words ml-1">{ipData.network}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Time & Regional Info */}
                  {(ipData.timezone || ipData.currency || ipData.languages) && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white">Regional</h3>
                      </div>
                      <div className="space-y-2">
                        {ipData.timezone && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Timezone:</span> {ipData.timezone}
                          </div>
                        )}
                        {ipData.utc_offset && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">UTC Offset:</span> {ipData.utc_offset}
                          </div>
                        )}
                        {ipData.currency && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Currency:</span> {ipData.currency}
                          </div>
                        )}
                        {ipData.languages && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Languages:</span> {ipData.languages}
                          </div>
                        )}
                        {ipData.calling_code && (
                          <div className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Calling Code:</span> {ipData.calling_code}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Coordinates */}
                  {(ipData.latitude && ipData.longitude) && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center space-x-2 mb-4">
                        <Navigation className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white">Coordinates</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="text-gray-300 text-sm sm:text-base">
                          <span className="text-gray-400">Latitude:</span> {ipData.latitude}°
                        </div>
                        <div className="text-gray-300 text-sm sm:text-base">
                          <span className="text-gray-400">Longitude:</span> {ipData.longitude}°
                        </div>
                        <a
                          href={`https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`}
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
                  {ipData.continent_code && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <Building className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white">Additional</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="text-gray-300 text-sm sm:text-base">
                          <span className="text-gray-400">Continent:</span> {ipData.continent_code}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 px-4 sm:px-0">
                <button
                  onClick={fetchIPAddress}
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
                {ipData && (
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(ipData, null, 2))}
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
            Professional IP analysis with comprehensive network intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;