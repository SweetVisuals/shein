import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Heart, Search, Camera, Menu, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const MobileHeader = ({ setScreen }: { setScreen?: (s: string) => void }) => {
  const { cart, heroTabs, activeHeroTab, setActiveHeroTab, searchQuery } = useAppContext();
  const activeTabObj = heroTabs?.find(t => t.title === activeHeroTab);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]" 
    >
      <div className="relative z-10 pt-safe">
        {/* SHEIN Logo - always visible but changes color */}
        <div className="flex justify-center pt-4 pb-2">
          <span className="text-black font-bold text-xl tracking-[0.15em] leading-none">SHEIN</span>
        </div>
        
        {/* Search Bar Row */}
        <div className="flex items-center px-3 py-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Mail size={24} strokeWidth={1.5} className="text-black" />
              <span className="absolute -top-[2px] -right-[2px] bg-[#f94e27] text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 border border-white">1</span>
            </div>
            <div className="relative">
              <Calendar size={24} strokeWidth={1.5} className="text-black" />
              <span className="absolute -top-[2px] right-0 bg-[#f94e27] w-2 h-2 rounded-full border border-white"></span>
            </div>
          </div>
          
          <div 
            onClick={() => setScreen?.('SEARCH')}
            className="flex-1 rounded-[4px] h-[42px] flex items-center pl-3 pr-0.5 overflow-hidden cursor-text border border-gray-100 bg-gray-50"
          >
            <span className="flex-1 text-[13px] font-medium text-gray-800">
              {searchQuery ? searchQuery : <>Fidget Toys <span className="text-[12px]">🔥</span></>}
            </span>
            <div className="flex items-center h-full gap-1">
              <Camera size={20} className="text-gray-400 mr-1" strokeWidth={1.5} />
              <button className={`${isScrolled ? 'bg-black text-white' : 'bg-black text-white'} h-[85%] rounded-[3px] px-3 flex items-center justify-center`}>
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <button onClick={() => setScreen?.('WISHLIST')} className="relative">
            <Heart size={24} strokeWidth={1.5} className="text-black" />
          </button>
        </div>

        {/* Categories Row */}
        <div className="flex items-center relative h-10">
          <div className="flex-1 flex overflow-x-auto no-scrollbar gap-5 text-[14px] font-bold items-center tracking-tight px-3 text-gray-500">
            {heroTabs.map((tab, i) => {
              const isActive = activeHeroTab === tab.title;
              return (
                <button 
                  key={tab.id || i} 
                  onClick={() => setActiveHeroTab(tab.title)}
                  className={`whitespace-nowrap relative pb-1.5 pt-0.5 ${isActive ? 'text-black' : ''}`}
                >
                  {tab.title}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-black"></span>}
                </button>
              );
            })}
            {/* spacer for hamburger menu to avoid overlap */}
            <div className="min-w-[30px]"></div>
          </div>
          
          {/* Hamburger Menu with Fade */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pl-8 pointer-events-none bg-gradient-to-l from-white via-white to-transparent text-black">
             <button className="pointer-events-auto">
               <Menu size={24} strokeWidth={1.5} />
             </button>
          </div>
        </div>
        
        {/* Sub Banner (Yellow) only show when scrolled */}
        {isScrolled && (
          <div className="bg-[#fff9e6] flex justify-between items-center px-3 py-1.5 border-b border-[#f3e7c8]">
            <div className="flex items-center gap-3">
              <span className="text-[#1b7e5a] text-[11px] font-bold flex items-center gap-1">
                 🚚 Free Shipping
              </span>
              <span className="text-[#1b7e5a] text-[11px] font-bold flex items-center gap-1">
                 📦 Free Return
              </span>
            </div>
            <span className="text-[#f94e27] text-[11px] font-bold">New User Only</span>
          </div>
        )}
      </div>
    </header>
  );
};
