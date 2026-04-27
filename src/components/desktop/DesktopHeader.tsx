import React from 'react';
import { User, ShoppingBag, Heart, Headset, Globe, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export const DesktopHeader = () => {
  const mainNav = ['New In', '3-Day Delivery', 'Sale', 'Women Clothing', 'Beachwear', 'Curve', 'Kids', 'Men Clothing', 'Home & Living', 'Underwear & Sleepwear', 'Shoes', 'Jewelry & Accessories', 'Beauty & Health'];

  return (
    <header className="w-full bg-black text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-[1200px] mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 mr-8 cursor-pointer h-10 w-28 overflow-hidden">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Shein-logo.png" alt="SHEIN" className="h-full w-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[600px] mx-8 flex">
          <div className="relative w-full flex items-center">
            <span className="absolute left-3 text-red-500 font-bold text-sm">⬆ Shorts</span>
            <input 
              type="text" 
              className="w-full h-10 bg-white text-black pl-24 pr-4 border-none outline-none focus:ring-0"
              placeholder=""
            />
            <button className="bg-black border border-white text-white h-10 px-6 ml-[-1px] hover:opacity-90 flex items-center justify-center transition-opacity">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button className="hover:text-gray-300 transition-colors"><User size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-gray-300 transition-colors relative">
            <ShoppingBag size={24} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 text-xs font-bold bg-white text-black px-1 rounded-full">0</span>
          </button>
          <button className="hover:text-gray-300 transition-colors relative">
            <Heart size={24} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 text-xs font-bold bg-white text-black px-1 rounded-full">0</span>
          </button>
          <button className="hover:text-gray-300 transition-colors"><Headset size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-gray-300 transition-colors"><Globe size={24} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 h-[44px] flex items-center justify-between text-sm whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-6 overflow-x-hidden">
             <button className="flex items-center gap-1 hover:text-gray-300 font-semibold">
                Categories <ChevronDown size={16} />
             </button>
             {mainNav.map((item, i) => (
                <a key={i} href="#" className="hover:text-gray-300 hover:underline underline-offset-4">{item}</a>
             ))}
          </div>
          <div className="flex items-center gap-2 pl-4">
             <button className="text-gray-500 hover:text-white"><ChevronLeft size={20} /></button>
             <button className="text-gray-500 hover:text-white"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </header>
  );
};
