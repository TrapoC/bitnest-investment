
import React from 'react';
import { TrendingUp, Lock, LineChart, Wallet } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-10 w-10 text-bitcoin" />,
    title: "Market Performance",
    description: "Access real-time Bitcoin price data and historical performance metrics to make informed investment decisions."
  },
  {
    icon: <Lock className="h-10 w-10 text-bitcoin" />,
    title: "Secure Investments",
    description: "Your investments are protected with bank-level security and encryption technology."
  },
  {
    icon: <LineChart className="h-10 w-10 text-bitcoin" />,
    title: "Portfolio Tracking",
    description: "Monitor your portfolio performance over time with detailed charts and analysis tools."
  },
  {
    icon: <Wallet className="h-10 w-10 text-bitcoin" />,
    title: "Easy Transactions",
    description: "Buy and sell Bitcoin with ease through our simple and intuitive interface."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest with BitNest?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to invest in Bitcoin confidently and securely.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-white rounded-lg inline-flex p-3 mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
