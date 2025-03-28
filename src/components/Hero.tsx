
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, BarChart3 } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-bitcoin/10 rounded-full">
              <span className="text-bitcoin font-medium text-sm flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Bitcoin is up 3.45% today
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Invest in Bitcoin <span className="text-bitcoin">Smart & Secure</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              BitNest helps you invest in Bitcoin with confidence. Our platform provides real-time market data, secure transactions, and portfolio management tools.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-bitcoin hover:bg-bitcoin-dark text-white">
                Start Investing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300">
                Learn More
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-center">
                <div className="mr-3 bg-green-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Secure Storage</p>
                  <p className="text-sm text-gray-500">Bank-level security</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-blue-100 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Market Insights</p>
                  <p className="text-sm text-gray-500">Real-time analytics</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-bitcoin/20 rounded-full blur-3xl"></div>
              <img 
                src="https://www.pngall.com/wp-content/uploads/10/Bitcoin-Crypto-Logo-PNG-Image.png" 
                alt="Bitcoin illustration" 
                className="relative z-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
