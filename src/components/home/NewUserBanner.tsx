import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

export const NewUserBanner = () => {
  return (
    <div className="bg-[#FFF0F2] mx-3 mt-0 mb-3 p-3 pt-2.5 rounded-lg flex flex-col relative overflow-hidden shadow-sm border border-[#ffeaec]">
      {/* Top section */}
      <div className="flex justify-between items-center mb-3 border-b border-[#fce1e5] pb-2">
        <span className="text-[#e2364c] font-black text-[16px] italic tracking-tight">New User Only</span>
        <div className="flex text-[10px] text-[#e2364c] gap-3 font-bold items-center">
          <span className="flex items-center gap-1"><Truck size={12} strokeWidth={3} /> Free Shipping</span>
          <span className="flex items-center gap-1"><RotateCcw size={10} strokeWidth={3} /> Free Return</span>
        </div>
      </div>
      
      {/* Coupon section */}
      <div className="flex items-center gap-4">
        {/* Left Card */}
        <div className="bg-[#1a1a1a] text-[#ffcf81] rounded-lg w-[145px] h-[80px] flex flex-col items-center justify-center relative flex-shrink-0 shadow-lg">
           {/* Inner border dash effect */}
           <div className="absolute inset-[4px] border border-white/5 rounded-md pointer-events-none"></div>
           
           {/* small badge */}
           <div className="absolute top-2 left-2 border border-[#ffcf81]/30 text-[#ffcf81] text-[7px] rounded-sm px-1 py-[0px] font-bold tracking-wide uppercase">Up To</div>
           
           <span className="text-[36px] font-black leading-none mt-2 tracking-tighter">£400</span>
           <span className="text-[9px] mt-1 text-[#ffcf81]/70 font-bold tracking-wide uppercase">Coupons & Credit</span>
        </div>
        
        {/* Right Info */}
        <div className="flex-1 flex flex-col items-center justify-center">
           <span className="text-[10px] text-gray-400 mb-0.5 font-medium">Condition applies</span>
           <span className="text-[15px] font-black text-gray-900 leading-tight whitespace-nowrap tracking-wide">SHEIN SUPER START</span>
           <button className="bg-black text-white text-[11px] font-black px-4 py-2 mt-2 w-full max-w-[120px] rounded-sm shadow-md active:scale-95 transition-transform">JOIN NOW</button>
        </div>
      </div>

      {/* Promotion Tag */}
      <div className="absolute bottom-0 right-0 bg-[#e5e5e5] text-gray-500 text-[7px] px-2 py-[2.5px] rounded-tl-md font-bold uppercase tracking-wider">
        Promotion
      </div>
    </div>
  );
};
