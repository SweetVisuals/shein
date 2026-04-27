import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Heart, Search, Camera, Menu } from 'lucide-react';

export const MobileHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const tabs = ['All', '3-Day Delivery', 'Women', 'Jewelry & Acc', 'Beauty & Health', 'Men'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : ''}`} 
      style={!isScrolled ? {
        backgroundImage: 'linear-gradient(to right, #ba163b, #d92443, #c5183a)'
      } : {}}
    >
      <div className="relative z-10 pt-safe">
        {/* SHEIN Logo */}
        <div className="flex justify-center pt-2 h-8 mb-1">
           <svg 
            viewBox="0 0 100 20" 
            className="h-full object-contain fill-current" 
            style={{ color: isScrolled ? 'black' : 'white' }}
           >
             <text x="50%" y="15" textAnchor="middle" fontWeight="900" fontSize="16" letterSpacing="2">SHEIN</text>
           </svg>
        </div>

        {/* Search Bar Row */}
        <div className="flex items-center justify-between px-3 py-1 gap-2.5">
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <Mail size={24} strokeWidth={1.5} className={isScrolled ? 'text-black' : 'text-white'} />
              <span className="absolute -top-1 -right-1 bg-[#D92534] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-[1.5px] border-white">1</span>
            </div>
            <div className="relative">
              <Calendar size={24} strokeWidth={1.5} className={isScrolled ? 'text-black' : 'text-white'} />
              <span className="absolute -top-1 -right-1 bg-[#D92534] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-[1.5px] border-white"></span>
            </div>
          </div>
          
          <div className={`flex-1 rounded-sm border ${isScrolled ? 'border-black' : 'border-white/20 bg-white'} h-10 flex items-center pl-3 overflow-hidden`}>
            <span className={`flex-1 text-sm font-medium ${isScrolled ? 'text-gray-900' : 'text-gray-500'}`}>Fidget Toys 🔥</span>
            <div className="flex items-center h-full">
              <Camera size={20} className="text-gray-400 mr-2" />
              <button className="bg-black text-white h-full px-3 flex items-center justify-center">
                <Search size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
          
          <Heart size={24} strokeWidth={1.5} className={isScrolled ? 'text-black' : 'text-white'} />
        </div>

        {/* Categories Row */}
        <div className="flex items-center px-3 h-11">
          <div className={`flex-1 flex overflow-x-auto no-scrollbar gap-6 text-sm font-bold items-center tracking-tight ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
            {tabs.map((tab, i) => (
              <button key={i} className={`whitespace-nowrap relative pb-1.5 ${i === 0 ? (isScrolled ? 'text-black' : 'text-white') : 'opacity-90'}`}>
                {tab}
                {i === 0 && <span className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>}
              </button>
            ))}
          </div>
          <button className={`pl-4 h-full flex items-center ml-2 border-l ${isScrolled ? 'border-gray-100 text-black' : 'border-white/20 text-white'}`}>
             <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};
