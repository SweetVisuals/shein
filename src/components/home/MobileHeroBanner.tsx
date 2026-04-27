import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const MobileHeroBanner = () => {
  const { activeHeroTab, heroTabs } = useAppContext();
  const activeTabObj = heroTabs?.find(t => t.title === activeHeroTab);
  const bgImage = activeTabObj?.image_url;

  return (
    <div 
      className="w-full relative cursor-pointer text-center text-white flex flex-col items-center justify-center pt-24 lg:pt-8 pb-24 px-4 bg-cover bg-center" 
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(to right, #ba163b, #d92443, #c5183a)'
      }}
    >
         {/* Decorative overlay for the texture (only show if no custom image) */}
         {!bgImage && (
           <>
             <div className="absolute inset-0 bg-white/10 mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', opacity: 0.25, pointerEvents: 'none'}}></div>
             
             <div className="z-10 bg-[#fde9a8] text-[#c01d36] font-bold px-3 py-0.5 text-[11px] mt-2 relative uppercase tracking-wide">
               BANK HOLIDAY SALE
             </div>
             
             <h2 className="z-10 text-[22px] font-bold mt-1 tracking-wider drop-shadow-md">GET PAYDAY-READY!</h2>
             
             <div className="z-10 flex items-baseline drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] mt-[-4px] bg-gradient-to-b from-[#fff3b8] via-[#ffd559] to-[#df9725] text-transparent bg-clip-text">
               <span className="text-[14px] font-bold origin-right translate-y-[0px] rotate-[-90deg] inline-block mr-1">UP<br/>TO</span>
               <span className="text-[85px] leading-none font-black tracking-tighter">80%</span>
               <span className="text-[34px] leading-none font-black ml-1">OFF</span>
             </div>
             
             <button className="z-10 bg-white text-black px-4 py-1 text-[11px] font-bold mt-1 shadow-sm">SHOP NOW</button>
           </>
         )}
         
         {/* Carousel Dots */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
            <div className="w-5 h-[3px] bg-white rounded-full"></div>
            <div className="w-[4px] h-[4px] bg-white/60 rounded-full"></div>
            <div className="w-[4px] h-[4px] bg-white/60 rounded-full"></div>
            <div className="w-[4px] h-[4px] bg-white/60 rounded-full"></div>
         </div>
    </div>
  );
};
