
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bitcoin, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bitcoin className="h-6 w-6 text-bitcoin" />
          <span className="text-xl font-bold">BitNest</span>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#home" className="text-gray-700 hover:text-bitcoin">Home</a></li>
              <li><a href="#dashboard" className="text-gray-700 hover:text-bitcoin">Dashboard</a></li>
              <li><a href="#invest" className="text-gray-700 hover:text-bitcoin">Invest</a></li>
              <li><a href="#portfolio" className="text-gray-700 hover:text-bitcoin">Portfolio</a></li>
            </ul>
          </nav>
          <Button variant="outline" className="border-bitcoin text-bitcoin hover:bg-bitcoin hover:text-white">
            Login
          </Button>
          <Button className="bg-bitcoin hover:bg-bitcoin-dark text-white">
            Get Started
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#home" className="block py-2 text-gray-700 hover:text-bitcoin" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#dashboard" className="block py-2 text-gray-700 hover:text-bitcoin" onClick={() => setIsMenuOpen(false)}>Dashboard</a></li>
              <li><a href="#invest" className="block py-2 text-gray-700 hover:text-bitcoin" onClick={() => setIsMenuOpen(false)}>Invest</a></li>
              <li><a href="#portfolio" className="block py-2 text-gray-700 hover:text-bitcoin" onClick={() => setIsMenuOpen(false)}>Portfolio</a></li>
              <li className="pt-2 flex space-x-2">
                <Button variant="outline" className="w-1/2 border-bitcoin text-bitcoin hover:bg-bitcoin hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
                <Button className="w-1/2 bg-bitcoin hover:bg-bitcoin-dark text-white" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
