import React from 'react';
import { Mail, Calendar, Heart, Search, Camera, Menu } from 'lucide-react';

export const MobileHeader = () => {
  const tabs = ['All', '3-Day Delivery', 'Women', 'Curve', 'Men'];

  return (
    <header className="sticky top-0 z-50 text-white" style={{
      /* A CSS gradient and an overlay noise to mimic the glitter background */
      backgroundImage: 'linear-gradient(to right, #ba163b, #d92443, #c5183a)'
    }}>
      <div className="absolute inset-0 bg-white/10 mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', opacity: 0.15, pointerEvents: 'none'}}></div>
      
      <div className="relative z-10 pt-safe">
        {/* SHEIN Logo */}
        <div className="flex justify-center pt-2 h-8 mb-1">
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Shein-logo.png" alt="SHEIN" className="h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        {/* Search Bar Row */}
        <div className="flex items-center justify-between px-3 py-2 gap-3 h-[50px]">
          <button><Mail size={22} strokeWidth={1.5} /></button>
          <button><Calendar size={22} strokeWidth={1.5} /></button>
          
          <div className="flex-1 bg-white rounded-md h-[34px] flex items-center px-3 text-gray-500 text-sm shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <span className="text-gray-800">Tops</span>
            <span className="text-[#a752c4] ml-1 text-[11px] font-bold italic">Trends</span>
            <div className="flex-1"></div>
            <button><Camera size={18} className="text-gray-400" /></button>
          </div>
          
          <button><Heart size={22} strokeWidth={1.5} /></button>
        </div>

        {/* Categories Row */}
        <div className="flex items-center px-3 h-10">
          <div className="flex-1 flex overflow-x-auto no-scrollbar gap-5 text-sm font-semibold items-center tracking-tight">
            {tabs.map((tab, i) => (
              <button key={i} className={`whitespace-nowrap relative pb-1.5 ${i === 0 ? 'font-bold' : 'opacity-90'}`}>
                {tab}
                {i === 0 && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full"></span>}
              </button>
            ))}
          </div>
          <button className="pl-3 h-full flex items-center ml-2 border-l border-white/20">
             <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};
