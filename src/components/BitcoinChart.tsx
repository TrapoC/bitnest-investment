
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PriceHistoryItem = {
  timestamp: number;
  price: number;
};

interface BitcoinChartProps {
  priceHistory: PriceHistoryItem[];
  currentPrice: number;
  change24h: number;
  change24hPercentage: number;
  isLoading?: boolean;
}

const BitcoinChart = ({ 
  priceHistory = [], 
  currentPrice, 
  change24h, 
  change24hPercentage,
  isLoading = false 
}: BitcoinChartProps) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('24h');
  
  // Format data for the chart
  const chartData = priceHistory.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: item.price,
  }));
  
  const isPriceUp = change24hPercentage >= 0;
  
  // Format the price for display
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(currentPrice);
  
  // Format the 24h change
  const formattedChange = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always'
  }).format(change24h);
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Bitcoin Price</CardTitle>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant={timeRange === '24h' ? "default" : "outline"} 
            onClick={() => setTimeRange('24h')}
            className={timeRange === '24h' ? "bg-bitcoin text-white hover:bg-bitcoin-dark" : ""}
          >
            24H
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === '7d' ? "default" : "outline"}
            onClick={() => setTimeRange('7d')}
            className={timeRange === '7d' ? "bg-bitcoin text-white hover:bg-bitcoin-dark" : ""}
          >
            7D
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === '30d' ? "default" : "outline"}
            onClick={() => setTimeRange('30d')}
            className={timeRange === '30d' ? "bg-bitcoin text-white hover:bg-bitcoin-dark" : ""}
          >
            30D
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === 'all' ? "default" : "outline"}
            onClick={() => setTimeRange('all')}
            className={timeRange === 'all' ? "bg-bitcoin text-white hover:bg-bitcoin-dark" : ""}
          >
            ALL
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
              <div className="h-32 bg-gray-100 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-3xl font-bold">{formattedPrice}</h3>
              <div className={`flex items-center mt-1 ${isPriceUp ? 'text-increase' : 'text-decrease'}`}>
                <span>{formattedChange} ({change24hPercentage.toFixed(2)}%)</span>
                <span className="ml-2 text-sm text-gray-500">in the last 24h</span>
              </div>
            </div>
            
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPriceUp ? "#22c55e" : "#ef4444"} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={isPriceUp ? "#22c55e" : "#ef4444"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10 }} 
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={['dataMin - 100', 'dataMax + 100']} 
                    hide 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderColor: '#e2e8f0',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }} 
                    formatter={(value) => [`$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={isPriceUp ? "#22c55e" : "#ef4444"} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    dot={false}
                    activeDot={{ r: 6, stroke: isPriceUp ? "#22c55e" : "#ef4444", strokeWidth: 2, fill: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BitcoinChart;
