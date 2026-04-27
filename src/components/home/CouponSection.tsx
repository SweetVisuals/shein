import React from 'react';

export const CouponSection = () => {
  return (
    <div className="mx-3 mt-4">
      <div className="bg-[#FFF0F2] rounded-md shadow-sm p-3 flex items-center justify-between relative overflow-hidden">
        {/* Decorative Circle notches on sides */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F8F8F8] rounded-full"></div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F8F8F8] rounded-full"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline text-[#D92534]">
              <span className="text-xl font-black">£</span>
              <span className="text-3xl font-black leading-none">15</span>
              <span className="text-sm font-bold ml-1 uppercase">OFF</span>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">ON ORDERS OVER £100</span>
          </div>
          
          <div className="h-10 w-px bg-[#D92534]/10 mx-1"></div>
          
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">NEW USER COUPON</span>
            <span className="text-[9px] text-[#D92534] font-medium mt-0.5">Expires in 2 days</span>
          </div>
        </div>

        <button className="bg-[#D92534] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform whitespace-nowrap">
          COLLECT
        </button>
      </div>
    </div>
  );
};
