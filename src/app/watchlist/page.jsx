import Watchlist from "@/components/Watchlist";
import FinageWatchlist from "@/components/FinageWatchlist";

export const metadata = {
  title: 'Live Stock Watchlist | Perfect Traders',
  description: 'Track Indian stocks with real-time prices from NSE and BSE. Powered by Finage API for accurate market data.',
};

export default function WatchlistPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Finage API Watchlist - Primary */}
      <section className="py-8">
        <FinageWatchlist />
      </section>

      {/* Original Watchlist - Fallback */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Watchlist</h2>
          <p className="text-gray-600 mb-6">Backup watchlist using alternative data sources</p>
        </div>
        <Watchlist />
      </section>
    </main>
  );
}