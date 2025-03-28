
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

type PriceData = {
  currentPrice: number;
  change24h: number;
  change24hPercentage: number;
  high24h: number;
  low24h: number;
  priceHistory: {
    timestamp: number;
    price: number;
  }[];
};

// Mock data for demonstration purposes
const generateMockPriceHistory = () => {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const data = [];
  const basePrice = 30000 + Math.random() * 10000;
  
  for (let time = oneDayAgo; time <= now; time += 3600000) { // hourly data points
    const randomVariation = (Math.random() - 0.5) * 1000; // +/- $500
    data.push({
      timestamp: time,
      price: basePrice + randomVariation + (time - oneDayAgo) / 100000,
    });
  }
  
  return data;
};

const fetchBitcoinPrice = async (): Promise<PriceData> => {
  // In a real application, this would call a cryptocurrency API
  // For demo purposes, we'll use mock data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const priceHistory = generateMockPriceHistory();
  const currentPrice = priceHistory[priceHistory.length - 1].price;
  const price24hAgo = priceHistory[0].price;
  const change24h = currentPrice - price24hAgo;
  const change24hPercentage = (change24h / price24hAgo) * 100;
  
  // Calculate 24h high/low
  const prices = priceHistory.map(item => item.price);
  const high24h = Math.max(...prices);
  const low24h = Math.min(...prices);
  
  return {
    currentPrice,
    change24h,
    change24hPercentage,
    high24h,
    low24h,
    priceHistory,
  };
};

export const useBitcoinPrice = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
    refetchInterval: 60000, // Refetch every minute
  });
  
  return {
    priceData: data,
    isLoading,
    error,
  };
};
