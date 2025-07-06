import FinageWatchlist from "@/components/FinageWatchlist";
import SimpleWatchlist from "@/components/SimpleWatchlist";

export const metadata = {
  title: 'Live Indian Stocks | Perfect Traders',
  description: 'Real-time Indian stock prices from NSE and BSE. Track your favorite stocks with live market data powered by Finage API.',
  keywords: 'Indian stocks, NSE, BSE, real-time prices, stock market, live data, Finage API',
};

export default function LiveStocksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Live Indian{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Stock Market
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Real-time stock prices from NSE and BSE. Track your favorite Indian stocks with professional-grade market data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-yellow-400">1000+</div>
              <div className="text-blue-100">Indian Stocks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-green-400">Real-time</div>
              <div className="text-blue-100">Market Data</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-purple-400">NSE & BSE</div>
              <div className="text-blue-100">Exchanges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Stock Market Data
            </h2>
            <p className="text-xl text-gray-600">
              Powered by Finage API for accurate and reliable market information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Live stock prices updated every 30 seconds during market hours</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Data</h3>
              <p className="text-gray-600">Price, volume, change percentage, and market cap information</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find and add any Indian stock from NSE and BSE exchanges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Watchlist Component */}
      <section className="py-8">
        <FinageWatchlist />
      </section>

      {/* Simple Watchlist for Testing */}
      <section className="py-8 bg-white">
        <SimpleWatchlist />
      </section>

      {/* API Information */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Powered by Professional APIs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our stock data is sourced from Finage, a leading financial data provider trusted by professionals worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Sources</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• National Stock Exchange (NSE)</li>
                <li>• Bombay Stock Exchange (BSE)</li>
                <li>• Real-time and delayed quotes</li>
                <li>• Historical price data</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Live price updates</li>
                <li>• Volume and change data</li>
                <li>• Market status indicators</li>
                <li>• Custom watchlist management</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Free Tier:</strong> 1000 API requests per month • Perfect for personal use and small portfolios
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
