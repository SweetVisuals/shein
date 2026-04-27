import React from 'react';

export const NewUserBanner = () => {
  return (
    <div className="mx-3 mt-3 bg-[#FFF0F2] rounded-lg p-2.5 pb-3 relative">
      {/* Top row */}
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-[#D92534] font-black italic text-sm">New User Only</h2>
        <div className="flex gap-3 text-[9px] font-bold text-[#D92534]">
          <span className="flex items-center gap-1">🚚 Free Shipping</span>
          <span className="flex items-center gap-1">🔄 Free Return</span>
        </div>
      </div>

      {/* Main Promotion Card */}
      <div className="bg-white rounded-md p-2 flex shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {/* Left: Dark Coupon Card */}
        <div className="bg-gradient-to-br from-[#4a4a4a] to-[#2c2c2c] rounded-md p-3 flex flex-col items-center justify-center min-w-[130px] relative overflow-hidden shadow-inner">
          <div className="absolute top-2 left-2 text-[7px] text-[#f5d59a] px-1 rounded-sm bg-black/20">Up to</div>
          <span className="text-[32px] font-black tracking-tighter mt-1 text-[#f5d59a]">£400</span>
          <span className="text-[9px] font-medium text-gray-300 tracking-wide">Coupons & Credit</span>
        </div>

        {/* Right: Info and Action */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
          <span className="text-[10px] text-gray-500 font-medium mb-1">Condition applies</span>
          <h3 className="text-[15px] font-black text-gray-900 tracking-tight mb-2 uppercase text-center">SHEIN SUPER START</h3>
          <button className="bg-black text-white text-[11px] font-bold px-8 py-1.5 rounded-sm shadow-md active:scale-95 transition-transform">
            JOIN NOW
          </button>
        </div>
      </div>

      {/* Promotion Label */}
      <span className="absolute bottom-1 right-3 text-[7px] text-gray-300 bg-gray-100/50 px-1 rounded-sm">Promotion</span>
    </div>
  );
};
