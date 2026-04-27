import React from 'react';
import { ChevronRight, Settings, HeadphonesIcon, Settings as SettingsIcon, CreditCard, Gift, Ticket, Wallet, MessageSquare, ShieldAlert, Archive, Truck, Star, RotateCcw } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';

export const ProfileScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { user } = useAppContext();

  return (
    <div className="block lg:hidden">
      <MobileLayout setScreen={setScreen}>
        <div className="bg-[#f5f5f5] min-h-screen">
          {/* Header */}
          <div className="bg-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h1 className="font-bold text-lg">Hi, {user?.name || 'Guest'}</h1>
                  <span className="bg-gray-200 text-gray-500 text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 font-bold">
                     <span className="text-[10px]">👑</span> S0 {'>'}
                  </span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
               <HeadphonesIcon size={24} strokeWidth={1.5} />
               <SettingsIcon size={24} strokeWidth={1.5} />
            </div>
          </div>

          <div className="bg-white">
             {/* Stats */}
             <div className="flex justify-around items-center py-4 border-b border-gray-100">
                <div className="flex flex-col items-center">
                   <span className="font-bold text-lg">3</span>
                   <span className="text-xs text-gray-500 mt-1">Coupons</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="font-bold text-lg">0</span>
                   <span className="text-xs text-gray-500 mt-1">Points</span>
                </div>
                <div className="flex flex-col items-center">
                   <Wallet size={20} className="mb-1 text-gray-800" strokeWidth={1.5} />
                   <span className="text-xs text-gray-500">Wallet</span>
                </div>
                <div className="flex flex-col items-center">
                   <Gift size={20} className="mb-1 text-gray-800" strokeWidth={1.5} />
                   <span className="text-xs text-gray-500">Gift Card</span>
                </div>
             </div>

             {/* My Orders */}
             <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="font-bold text-base">My Orders</h2>
                   <button onClick={() => setScreen('ORDERS')} className="text-gray-500 text-sm flex items-center">
                      View All <ChevronRight size={16} />
                   </button>
                </div>
                <div className="flex justify-between px-1">
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <CreditCard size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-xs text-gray-700">Unpaid</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <Archive size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-xs text-gray-700">Processing</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <Truck size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-xs text-gray-700">Shipped</span>
                      <div className="absolute top-0 right-1 border-2 border-white w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <MessageSquare size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-xs text-gray-700">Review</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <RotateCcw size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-xs text-gray-700">Returns</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="mt-2 bg-white p-4 pb-12">
             <h2 className="font-bold text-base mb-4">More Services</h2>
             <div className="flex justify-start gap-8">
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-200 rounded-full mb-1">
                      <ShieldAlert size={18} strokeWidth={1.5} />
                   </div>
                   <span className="text-[11px] text-gray-600">Support</span>
                </div>
                
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setScreen('ADMIN')}>
                   <div className="w-8 h-8 flex items-center justify-center text-[#188a42] border border-[#188a42] bg-[#f0f9f4] rounded-full mb-1">
                      <Settings size={18} strokeWidth={1.5} />
                   </div>
                   <span className="text-[11px] text-[#188a42] font-bold">Admin</span>
                </div>
             </div>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};
