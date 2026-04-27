import React from 'react';
import { ChevronLeft, ChevronRight, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';

export const OrdersScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { cart } = useAppContext();
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="block lg:hidden">
      <MobileLayout hideNav>
        <div className="bg-[#f5f5f5] min-h-screen">
          {/* Header */}
          <div className="bg-white px-3 py-3 sticky top-0 z-50 flex items-center border-b border-gray-100">
             <button onClick={() => setScreen('PROFILE')} className="absolute left-3"><ChevronLeft size={28} className="text-black" /></button>
             <div className="flex-1 text-center font-bold text-lg">My Orders</div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white flex justify-between px-4 py-3 text-sm border-b border-gray-100 sticky top-[53px] z-40 shadow-sm">
             <div className="text-gray-500 whitespace-nowrap">Unpaid</div>
             <div className="text-gray-500 whitespace-nowrap">Processing</div>
             <div className="text-black font-bold border-b-2 border-black pb-2 -mb-3 whitespace-nowrap">Shipped</div>
             <div className="text-gray-500 whitespace-nowrap">Review</div>
             <div className="text-gray-500 whitespace-nowrap">Returns</div>
          </div>

          <div className="p-3">
             {/* Order Card */}
             <div className="bg-white rounded-md p-3 mb-3">
                <div className="flex justify-between items-center mb-3 text-sm pb-3 border-b border-gray-100">
                   <div className="text-gray-500 font-bold">Order NO. GSHM8C008453</div>
                   <div className="text-red-500 font-bold uppercase text-[12px] bg-red-50 px-2 py-0.5 rounded-sm">Shipped</div>
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                   {cart.slice(0, 4).map((item, index) => (
                     <div key={item.cartItemId} className="flex-shrink-0 w-[72px] h-[96px] bg-gray-100 rounded-sm overflow-hidden relative">
                        <img src={item.img} className="w-full h-full object-cover" />
                        {index === 3 && cart.length > 4 && (
                           <div className="absolute inset-0 bg-white/70 flex items-center justify-center font-bold text-gray-800 text-sm backdrop-blur-[1px]">
                              +{cart.length - 3}
                           </div>
                        )}
                     </div>
                   ))}
                   {cart.length === 0 && (
                      <div className="text-gray-500 text-sm py-8 text-center w-full">No items in this order.</div>
                   )}
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                   <div className="text-gray-800 text-sm">
                      Total: <span className="font-bold">£{totalPrice}</span> ({itemsCount} items)
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => setScreen('TRACKING')} className="border border-gray-300 rounded-full px-4 py-1.5 text-xs font-bold text-gray-700">Track</button>
                      <button className="border border-black bg-black rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm">Confirm Delivery</button>
                   </div>
                </div>
             </div>

             <div className="text-center text-gray-400 text-xs mt-6 pb-6 before:content-[''] before:block before:w-12 before:border-t before:border-gray-300 before:mx-auto before:mb-2 after:content-[''] after:block after:w-12 after:border-t after:border-gray-300 after:mx-auto after:mt-2">No more orders</div>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};
