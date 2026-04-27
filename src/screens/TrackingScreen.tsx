import React from 'react';
import { ChevronLeft, X, Copy, MapPin } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';

export const TrackingScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { cart } = useAppContext();

  return (
    <div className="block lg:hidden">
      <MobileLayout hideNav>
        <div className="bg-[#f5f5f5] min-h-screen">
          {/* Header */}
          <div className="bg-white px-3 py-3 sticky top-0 z-50 flex items-center border-b border-gray-100 shadow-sm">
             <button onClick={() => setScreen('ORDERS')} className="absolute left-3 p-1"><ChevronLeft size={28} className="text-black" /></button>
             <div className="flex-1 text-center font-bold text-lg tracking-wide">Track</div>
             <div className="absolute right-3 text-[10px] text-gray-600 font-bold border rounded-full px-2 py-1 border-gray-300 flex items-center gap-1 shadow-sm">
                EN
             </div>
          </div>
          
          <div className="bg-[#fff8e1] px-3 py-2 flex items-center justify-between text-[#d48c00] text-xs font-bold border-b border-[#ffeebb]">
             <div className="flex items-center gap-1">
                <span>🔊</span> Register and fill in the information to get a £3 coupon
             </div>
             <X size={14} className="text-[#d48c00] opacity-50" />
          </div>

          <div className="bg-white px-4 pt-3 border-b border-gray-200">
             <div className="flex justify-between text-sm font-bold pb-2">
                <div className="border-b-[3px] border-black pb-1 px-1">Package1</div>
                <div className="text-gray-400 font-medium">Package2</div>
                <div className="text-gray-400 font-medium">Package3</div>
             </div>
             
             <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar">
                {cart.length > 0 ? cart.slice(0, 5).map(item => (
                   <div key={item.cartItemId} className="w-[72px] h-[96px] flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-100">
                       <img src={item.img} className="w-full h-full object-cover" />
                   </div>
                )) : (
                   <div className="w-[72px] h-[96px] flex-shrink-0 bg-gray-100 rounded-sm"></div>
                )}
             </div>
          </div>

          <div className="bg-white px-4 py-4 border-b border-gray-100 flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight">UPS</span>
                <span className="text-[#4863C9] text-base font-bold">400-820-8388</span>
             </div>
             <div className="flex items-center text-sm text-gray-700">
                Tracking NO. <span className="font-medium mx-1">1Z9999999999999999</span> <Copy size={14} className="text-gray-400 cursor-pointer" />
             </div>
          </div>

          <div className="bg-white p-5 mt-2">
             <div className="relative border-l-2 border-[#188a42] ml-4 pb-8">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#188a42] flex items-center justify-center text-white border-2 border-white shadow-md ring-2 ring-green-100">
                   <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="pl-6">
                   <div className="font-bold text-[#188a42] text-sm mb-0.5 leading-tight">Arrived at Sort Facility<br/>London - United Kingdom</div>
                   <div className="text-gray-400 text-xs">Today 12:45</div>
                </div>
             </div>
             <div className="relative border-l-2 border-gray-200 ml-4 pb-8">
                <div className="absolute -left-[7px] top-0 w-[12px] h-[12px] rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-200"></div>
                <div className="pl-6">
                   <div className="text-gray-800 font-medium text-sm mb-0.5 leading-tight">Departed from Facility<br/>Guangzhou, Guangdong - China</div>
                   <div className="text-gray-400 text-xs">Yesterday 09:30</div>
                </div>
             </div>
             <div className="relative border-l-2 border-gray-200 ml-4 pb-8">
                <div className="absolute -left-[7px] top-0 w-[12px] h-[12px] rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-200"></div>
                <div className="pl-6">
                   <div className="text-gray-800 font-medium text-sm mb-0.5 leading-tight">Origin Scan<br/>Guangzhou, Guangdong - China</div>
                   <div className="text-gray-400 text-xs">08-23 21:15</div>
                </div>
             </div>
             <div className="relative border-l-2 border-transparent ml-4">
                <div className="absolute -left-[7px] top-0 w-[12px] h-[12px] rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-200"></div>
                <div className="pl-6">
                   <div className="text-gray-800 font-medium text-sm mb-0.5 leading-tight">Order Processed: Ready for UPS</div>
                   <div className="text-gray-400 text-xs">08-22 09:12</div>
                </div>
             </div>
             
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};
