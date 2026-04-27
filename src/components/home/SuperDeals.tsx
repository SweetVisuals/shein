import React from 'react';
import { ChevronRight } from 'lucide-react';

export const SuperDeals = () => {
  return (
    <div className="flex gap-2 p-3 pb-8">
      {/* Super Deals Card */}
      <div className="flex-1 bg-gray-50 rounded-md p-3 relative overflow-hidden">
        <div className="flex justify-between items-center mb-2">
           <h3 className="font-bold text-black italic flex items-center shadow-red">
             Super<span className="text-[#D92534]">Deals</span>
           </h3>
           <ChevronRight size={14} className="text-gray-500" />
        </div>
        <div className="flex gap-2">
           <div className="flex-1 aspect-[3/4] bg-gray-200">
             <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Passport holder" />
           </div>
           <div className="flex-1 aspect-[3/4] bg-gray-200">
             <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Cheese container" />
           </div>
        </div>
      </div>

      {/* Brand Deals Card */}
      <div className="flex-1 bg-gray-50 rounded-md p-3 relative overflow-hidden">
        <div className="flex justify-between items-center mb-2">
           <h3 className="font-bold text-black italic flex items-center shadow-red">
             <span className="text-[#D92534] mr-0.5">√</span>Brand Deals
           </h3>
           <ChevronRight size={14} className="text-gray-500" />
        </div>
        <div className="flex gap-2">
           <div className="flex-1 aspect-[3/4] bg-white border border-gray-100 rounded-sm relative p-1">
             <span className="absolute top-0 left-0 bg-black text-white text-[8px] px-1 z-10">Armani</span>
             <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-contain" alt="Perfume" />
           </div>
           <div className="flex-1 aspect-[3/4] bg-white border border-gray-100 rounded-sm relative p-1">
             <span className="absolute top-0 left-0 bg-black text-white text-[8px] px-1 z-10">Nike</span>
             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-contain" alt="Shoe" />
           </div>
        </div>
      </div>
    </div>
  );
};
