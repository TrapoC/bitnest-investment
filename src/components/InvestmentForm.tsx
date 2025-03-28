
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/hooks/usePortfolio';

interface InvestmentFormProps {
  currentPrice: number;
}

const InvestmentForm = ({ currentPrice }: InvestmentFormProps) => {
  const [amount, setAmount] = useState<string>('');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const { portfolio, executeBuy, executeSell } = usePortfolio();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const numericAmount = parseFloat(amount);
      
      if (isNaN(numericAmount) || numericAmount <= 0) {
        setMessage({ text: 'Please enter a valid amount', type: 'error' });
        return;
      }
      
      if (action === 'buy') {
        executeBuy(numericAmount, currentPrice);
        setMessage({ text: `Successfully purchased Bitcoin worth $${numericAmount}`, type: 'success' });
      } else {
        // For selling, convert USD amount to BTC amount
        const btcAmount = numericAmount / currentPrice;
        executeSell(btcAmount, currentPrice);
        setMessage({ text: `Successfully sold Bitcoin worth $${numericAmount}`, type: 'success' });
      }
      
      setAmount('');
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'An unknown error occurred', type: 'error' });
      }
    }
  };

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(portfolio.balance);

  const formattedHoldings = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(portfolio.bitcoinHoldings);

  const portfolioValue = currentPrice * portfolio.bitcoinHoldings + portfolio.balance;
  const formattedPortfolioValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(portfolioValue);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invest in Bitcoin</CardTitle>
        <CardDescription>Buy or sell Bitcoin with your available balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-xl font-semibold">{formattedBalance}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">BTC Holdings</p>
            <p className="text-xl font-semibold">{formattedHoldings} BTC</p>
          </div>
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Portfolio Value</p>
            <p className="text-xl font-semibold">{formattedPortfolioValue}</p>
          </div>
        </div>

        {message && (
          <div className={`p-3 mb-4 rounded text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Action</label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={action === 'buy' ? 'default' : 'outline'}
                  className={action === 'buy' ? 'bg-bitcoin text-white w-1/2' : 'w-1/2'}
                  onClick={() => setAction('buy')}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={action === 'sell' ? 'default' : 'outline'}
                  className={action === 'sell' ? 'bg-bitcoin text-white w-1/2' : 'w-1/2'}
                  onClick={() => setAction('sell')}
                >
                  Sell
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bitcoin focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-bitcoin hover:bg-bitcoin-dark text-white"
              disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
            >
              {action === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
