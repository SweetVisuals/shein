import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

export const NewUserBanner = () => {
  return (
    <div className="bg-[#FFF4F6] mx-3 mt-0 mb-3 p-3 pt-2.5 rounded-lg flex flex-col relative overflow-hidden shadow-sm">
      {/* Top section */}
      <div className="flex justify-between items-center mb-3 border-b border-[#fce1e5] pb-2">
        <span className="text-[#e2364c] font-black text-[15px] italic tracking-wide">New User Only</span>
        <div className="flex text-[10px] text-[#e2364c] gap-3 font-bold items-center">
          <span className="flex items-center gap-1"><Truck size={12} strokeWidth={2.5} /> Free Shipping</span>
          <span className="flex items-center gap-1"><RotateCcw size={10} strokeWidth={3} /> Free Return</span>
        </div>
      </div>
      
      {/* Coupon section */}
      <div className="flex items-center gap-4">
        {/* Left Card */}
        <div className="bg-[#383838] text-[#ffcf81] rounded-lg w-[145px] h-[75px] flex flex-col items-center justify-center relative flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
           {/* Inner border dash effect */}
           <div className="absolute inset-[3px] border border-white/10 rounded-md pointer-events-none"></div>
           
           {/* small badge */}
           <div className="absolute top-2 left-2 border border-white/20 text-white/50 text-[7px] rounded-sm px-1 py-[0px] font-medium tracking-wide uppercase">Up To</div>
           
           <span className="text-[34px] font-black leading-none mt-2 tracking-tighter mix-blend-plus-lighter">£400</span>
           <span className="text-[9px] mt-1 text-[#a0a0a0] font-medium tracking-wide">Coupons & Credit</span>
        </div>
        
        {/* Right Info */}
        <div className="flex-1 flex flex-col items-center justify-center">
           <span className="text-[10px] text-gray-500 mb-0.5">Condition applies</span>
           <span className="text-[15px] font-black text-gray-900 leading-tight whitespace-nowrap tracking-wide">SHEIN SUPER START</span>
           <button className="bg-black text-white text-[11px] font-bold px-4 py-1.5 mt-2 w-full max-w-[120px] shadow-md">JOIN NOW</button>
        </div>
      </div>

      {/* Promotion Tag */}
      <div className="absolute bottom-0 right-0 bg-[#e0e0e0] text-white bg-opacity-70 text-[7px] px-1.5 py-[2px] rounded-tl-md font-bold text-gray-500 uppercase tracking-wider">
        Promotion
      </div>
    </div>
  );
};
