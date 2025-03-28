
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BitcoinChart from '../components/BitcoinChart';
import InvestmentForm from '../components/InvestmentForm';
import Footer from '../components/Footer';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';

const Index = () => {
  const { priceData, isLoading, error } = useBitcoinPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Features />
      
      <section id="dashboard" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Bitcoin Live Dashboard</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              {priceData && (
                <BitcoinChart 
                  priceHistory={priceData.priceHistory}
                  currentPrice={priceData.currentPrice}
                  change24h={priceData.change24h}
                  change24hPercentage={priceData.change24hPercentage}
                  isLoading={isLoading}
                />
              )}
            </div>
            <div>
              <InvestmentForm currentPrice={priceData?.currentPrice || 0} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
