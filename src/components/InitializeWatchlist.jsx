'use client';

import { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaDatabase } from 'react-icons/fa';

const InitializeWatchlist = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const sampleStocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.04,
      change: 2.11,
      changePercent: 1.22,
      volume: 48591600,
      marketCap: 2800000000000,
      addedAt: new Date().toISOString()
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 415.32,
      change: 3.45,
      changePercent: 0.84,
      volume: 22145600,
      marketCap: 3080000000000,
      addedAt: new Date().toISOString()
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.56,
      change: -1.23,
      changePercent: -0.86,
      volume: 25678900,
      marketCap: 1790000000000,
      addedAt: new Date().toISOString()
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 178.75,
      change: 1.45,
      changePercent: 0.82,
      volume: 32456700,
      marketCap: 1840000000000,
      addedAt: new Date().toISOString()
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 485.58,
      change: 5.67,
      changePercent: 1.18,
      volume: 18923400,
      marketCap: 1230000000000,
      addedAt: new Date().toISOString()
    }
  ];

  const handleInitialize = async () => {
    const passcode = prompt('Please enter the passcode to initialize watchlist:');
    if (passcode !== '717273') {
      setMessage({ type: 'error', text: 'Invalid passcode!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Check if watchlist is already initialized
      const watchlistRef = collection(db, 'watchlist');
      const existingDocs = await getDocs(watchlistRef);
      
      if (!existingDocs.empty) {
        setMessage({ type: 'error', text: 'Watchlist is already initialized. Please clear existing data first.' });
        return;
      }

      // Add each stock to the watchlist
      for (const stock of sampleStocks) {
        try {
          await addDoc(watchlistRef, stock);
        } catch (error) {
          console.error(`Error adding stock ${stock.symbol}:`, error);
          throw new Error(`Failed to add ${stock.symbol}: ${error.message}`);
        }
      }

      setMessage({ type: 'success', text: 'Watchlist initialized successfully with sample data!' });
    } catch (error) {
      console.error('Error initializing watchlist:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to initialize watchlist' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={handleInitialize}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 rounded-lg flex items-center justify-center transition-colors duration-300 shadow-lg text-lg font-semibold disabled:bg-purple-400"
      >
        <FaDatabase className="mr-3 text-xl" />
        {loading ? 'Initializing...' : 'Initialize Watchlist'}
      </button>
      <p className="mt-2 text-sm text-gray-500 text-center">
        Click to add sample stocks to your watchlist
      </p>

      {message.text && (
        <div className={`mt-4 p-4 rounded-lg text-center ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default InitializeWatchlist; 