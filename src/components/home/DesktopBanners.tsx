import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DesktopBanners = () => {
  return (
    <div className="flex gap-4 mt-6">
      {/* Left Column */}
      <div className="w-[300px] flex flex-col gap-4">
        <div className="relative h-[110px] bg-gradient-to-r from-stone-400 to-stone-200 overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=400&auto=format&fit=crop" 
            className="absolute right-0 top-0 h-full object-cover w-1/2 mix-blend-luminosity opacity-80" 
            alt="" 
            referrerPolicy="no-referrer" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.getAttribute('data-tried-fallback')) {
                target.setAttribute('data-tried-fallback', 'true');
                target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-6 text-white font-bold text-lg z-10 shadow-sm drop-shadow-md">
            3-Day Delivery
          </div>
        </div>
        <div className="relative h-[110px] bg-gradient-to-r from-stone-400 to-stone-200 overflow-hidden cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop" 
            className="absolute right-0 top-0 h-full object-cover w-1/2 mix-blend-luminosity opacity-80" 
            alt="" 
            referrerPolicy="no-referrer" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.getAttribute('data-tried-fallback')) {
                target.setAttribute('data-tried-fallback', 'true');
                target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-6 text-white font-bold text-lg z-10 drop-shadow-md">
            Bank Holiday Sale
          </div>
        </div>
        <div className="relative h-[110px] bg-gradient-to-r from-blue-300 to-stone-200 overflow-hidden cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=400&auto=format&fit=crop" 
            className="absolute right-0 top-0 h-full object-cover w-1/2 mix-blend-luminosity opacity-80" 
            alt="" 
            referrerPolicy="no-referrer" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.getAttribute('data-tried-fallback')) {
                target.setAttribute('data-tried-fallback', 'true');
                target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-6 text-white font-bold text-lg z-10 drop-shadow-md uppercase tracking-wider">
            SHEIN CLUB
          </div>
        </div>
      </div>

      {/* Center Huge Banner */}
      <div className="flex-1 relative cursor-pointer group bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 overflow-hidden text-center text-white flex flex-col items-center justify-center">
         {/* Decorative overlay for the texture */}
         <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
         
         <div className="z-10 bg-[#FFD700] text-red-600 font-bold px-4 py-1 text-xl md:text-2xl mt-4">BANK HOLIDAY SALE</div>
         <h2 className="z-10 text-4xl md:text-5xl lg:text-6xl font-serif mt-4 tracking-wider">GET PAYDAY-READY!</h2>
         <div className="z-10 flex text-[#FFD700] items-baseline mt-2 drop-shadow-lg">
           <span className="text-xl md:text-3xl font-bold -rotate-90 origin-right translate-y-[-10px] relative -left-4">UP TO</span>
           <span className="text-[100px] md:text-[140px] leading-none font-bold tracking-tighter">80%</span>
           <span className="text-6xl md:text-8xl leading-none font-bold ml-4">OFF</span>
         </div>
         <button className="z-10 bg-white text-black px-6 py-2 text-sm font-semibold mt-4">SHOP NOW</button>
         
         {/* Carousel Dots */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-6 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
         </div>

         {/* Carousel Arrows */}
         <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={24} className="text-black" />
         </button>
         <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={24} className="text-black" />
         </button>
      </div>

      {/* Right Column */}
      <div className="w-[300px] flex flex-col gap-4">
         <div className="relative h-[110px] bg-[#4a4746] flex items-center justify-center cursor-pointer overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" 
              alt="" 
              referrerPolicy="no-referrer" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.getAttribute('data-tried-fallback')) {
                  target.setAttribute('data-tried-fallback', 'true');
                  target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                }
              }}
            />
            <span className="relative z-10 text-white text-4xl font-thin tracking-widest">MUSERA</span>
         </div>
         <div className="relative h-[110px] bg-[#333333] flex items-center justify-center cursor-pointer overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=400&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" 
              alt="" 
              referrerPolicy="no-referrer" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.getAttribute('data-tried-fallback')) {
                  target.setAttribute('data-tried-fallback', 'true');
                  target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                }
              }}
            />
            <span className="relative z-10 text-white text-3xl font-bold tracking-tighter lowercase">missguided</span>
         </div>
         <div className="relative h-[110px] bg-[#423d3a] flex items-center justify-center cursor-pointer overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1434389678232-04ce6ca8bc88?q=80&w=400&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity" 
              alt="" 
              referrerPolicy="no-referrer" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.getAttribute('data-tried-fallback')) {
                  target.setAttribute('data-tried-fallback', 'true');
                  target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                }
              }}
            />
            <span className="relative z-10 text-white text-4xl font-serif tracking-[0.3em]">MOTF</span>
         </div>
      </div>
    </div>
  );
};
