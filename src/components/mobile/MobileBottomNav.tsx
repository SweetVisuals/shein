import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MdHomeFilled } from 'react-icons/md';
import { RiMenuSearchLine, RiCompass3Line } from 'react-icons/ri';
import { VscAccount } from 'react-icons/vsc';
import { useAppContext } from '../../context/AppContext';

export const MobileBottomNav = ({ setScreen }: { setScreen?: (s: string) => void }) => {
  const { user, cart } = useAppContext();
  
  // Calculate total distinct items or sum of quantities
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-between items-center px-2 py-1.5 z-50 pb-safe shadow-[0_-1px_6px_rgba(0,0,0,0.05)]">
      
      {/* Shop / Home */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('HOME')}>
         <MdHomeFilled size={24} className="mb-0.5 text-black" />
         <span className={'text-[9px] text-black font-bold'}>Shop</span>
      </div>

      {/* Category */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('PLP')}>
         <RiMenuSearchLine size={24} className="mb-0.5 text-gray-500" />
         <span className={'text-[9px] text-gray-500 font-medium'}>Category</span>
      </div>

      {/* New / Discovery */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('PLP')}>
         <RiCompass3Line size={24} className="mb-0.5 text-gray-500" />
         <span className={'text-[9px] text-gray-500 font-medium'}>New</span>
      </div>

      {/* Cart */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('CART')}>
         <div className="relative flex flex-col items-center">
            <div className="relative">
              <ShoppingCart size={24} strokeWidth={1.5} className="text-gray-500" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1.5 bg-[#D92534] text-white text-[8px] font-bold px-1 min-w-[15px] h-[15px] rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </div>
              )}
            </div>
            {/* Price Tag */}
            <div className="bg-[#D92534] text-white text-[8px] font-bold px-1 rounded-sm mt-0.5 transform scale-90">
               {user?.cartDisplayDiscount || '-£43.04'}
            </div>
         </div>
      </div>

      {/* Me / Profile */}
      <div className="flex flex-col items-center cursor-pointer relative w-[20%]" onClick={() => setScreen && setScreen('PROFILE')}>
         <VscAccount size={24} className="mb-0.5 text-gray-500" />
         <span className={'text-[9px] text-gray-500 font-medium'}>Me</span>
      </div>

    </div>
  );
};
