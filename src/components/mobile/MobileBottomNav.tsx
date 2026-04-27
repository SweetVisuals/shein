import React from 'react';
import { User } from 'lucide-react';
import { MdHomeFilled } from 'react-icons/md';
import { RiMenuSearchLine } from 'react-icons/ri';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useAppContext } from '../../context/AppContext';

export const MobileBottomNav = ({ setScreen }: { setScreen?: (s: string) => void }) => {
  const { user, cart } = useAppContext();
  
  // Calculate total distinct items or sum of quantities
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-between items-center px-4 py-2 z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      
      {/* Shop / Home */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('HOME')}>
         {/* @ts-ignore */}
         <MdHomeFilled size={24} className="mb-1 text-gray-800" />
         <span className={'text-[10px] text-gray-800 font-medium'}>Shop</span>
      </div>

      {/* Category */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('PLP')}>
         {/* @ts-ignore */}
         <RiMenuSearchLine size={24} className="mb-1 text-gray-800" />
         <span className={'text-[10px] text-gray-500'}>Category</span>
      </div>

      {/* Trends (New) */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('PLP')}>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 text-gray-800">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
         </svg>
         <span className={'text-[10px] text-gray-500'}>Trends</span>
      </div>

      {/* Cart */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('CART')}>
         <div className="relative">
            {/* @ts-ignore */}
            <PiShoppingCartSimple size={24} className="mb-1 text-gray-800" />
            {cartCount > 0 && (
               <div className="absolute -top-1 -right-1.5 bg-[#f00] text-white text-[9px] font-bold px-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
               </div>
            )}
         </div>
         <span className={'text-[10px] text-gray-500'}>Cart</span>
      </div>

      {/* Me / Profile */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => {
          if (setScreen) {
             if (!user) setScreen('AUTH');
             else setScreen('PROFILE');
          }
      }}>
         <User size={24} strokeWidth={1.5} className="mb-1 text-gray-800" />
         <span className={'text-[10px] text-gray-500'}>Me</span>
      </div>

    </div>
  );
};
