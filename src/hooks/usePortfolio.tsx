
import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  bitcoinAmount: number;
  price: number;
  date: Date;
}

interface PortfolioState {
  balance: number;
  bitcoinHoldings: number;
  transactions: Transaction[];
}

export const usePortfolio = (initialBalance = 10000) => {
  const [portfolio, setPortfolio] = useState<PortfolioState>(() => {
    // Try to load from localStorage if available
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedPortfolio) {
      const parsed = JSON.parse(savedPortfolio);
      // Convert string dates back to Date objects
      parsed.transactions = parsed.transactions.map((tx: any) => ({
        ...tx,
        date: new Date(tx.date)
      }));
      return parsed;
    }
    
    return {
      balance: initialBalance,
      bitcoinHoldings: 0,
      transactions: [],
    };
  });

  // Save portfolio to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const executeBuy = (amount: number, bitcoinPrice: number) => {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    if (amount > portfolio.balance) {
      throw new Error('Insufficient funds');
    }
    
    const bitcoinAmount = amount / bitcoinPrice;
    
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type: 'buy',
      amount,
      bitcoinAmount,
      price: bitcoinPrice,
      date: new Date(),
    };
    
    setPortfolio(prev => ({
      balance: prev.balance - amount,
      bitcoinHoldings: prev.bitcoinHoldings + bitcoinAmount,
      transactions: [newTransaction, ...prev.transactions],
    }));
    
    return newTransaction;
  };
  
  const executeSell = (bitcoinAmount: number, bitcoinPrice: number) => {
    if (bitcoinAmount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    if (bitcoinAmount > portfolio.bitcoinHoldings) {
      throw new Error('Insufficient Bitcoin holdings');
    }
    
    const amount = bitcoinAmount * bitcoinPrice;
    
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type: 'sell',
      amount,
      bitcoinAmount,
      price: bitcoinPrice,
      date: new Date(),
    };
    
    setPortfolio(prev => ({
      balance: prev.balance + amount,
      bitcoinHoldings: prev.bitcoinHoldings - bitcoinAmount,
      transactions: [newTransaction, ...prev.transactions],
    }));
    
    return newTransaction;
  };
  
  // Calculate portfolio value in USD
  const calculatePortfolioValue = (bitcoinPrice: number) => {
    return portfolio.balance + (portfolio.bitcoinHoldings * bitcoinPrice);
  };
  
  // Reset portfolio to initial state
  const resetPortfolio = () => {
    setPortfolio({
      balance: initialBalance,
      bitcoinHoldings: 0,
      transactions: [],
    });
  };
  
  return {
    portfolio,
    executeBuy,
    executeSell,
    calculatePortfolioValue,
    resetPortfolio,
  };
};
