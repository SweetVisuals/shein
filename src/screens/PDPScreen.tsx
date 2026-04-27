import React, { useState } from 'react';
import { ChevronLeft, Search, ShoppingCart, Share, MoreHorizontal, Heart, ChevronRight } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const PDPScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState('Green');
  const { addToCart, cart } = useAppContext();
  const [showAdded, setShowAdded] = useState(false);

  const product = {
    id: '1',
    title: 'Moldable Slow Rebound Coconut Oil Handmade Squeezing Ball Stress Relief',
    price: 0.54,
    originalPrice: 0.68,
    img: 'https://images.unsplash.com/photo-1618423851509-24754a6138d4?q=80&w=600&auto=format&fit=crop',
  };

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout hideNav setScreen={setScreen}>
          {/* Header */}
          <div className="bg-white px-3 py-2 sticky top-0 z-50 flex gap-3 items-center">
             <button onClick={() => setScreen('PLP')}><ChevronLeft size={28} className="text-black" /></button>
             <div onClick={() => setScreen('SEARCH')} className="flex-1 bg-gray-100 rounded-full h-9 flex items-center px-3 overflow-hidden text-gray-500 cursor-text">
               Squishies
               <div className="flex-1"></div>
               <Search size={18} />
             </div>
             <button onClick={() => setScreen('CART')} className="relative">
                <ShoppingCart size={24} className="text-black" />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold z-10">{cart.length}</span>}
             </button>
             <button><Share size={24} className="text-black" /></button>
             <button><MoreHorizontal size={24} className="text-black" /></button>
          </div>

          {/* Added to cart toast */}
          {showAdded && (
            <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-sm text-sm z-[100] whitespace-nowrap">
               Added to cart successfully
            </div>
          )}

          {/* Image */}
          <div className="relative aspect-[4/5] bg-gray-100">
             <img src="https://images.unsplash.com/photo-1618423851509-24754a6138d4?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" />
             <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-sm flex flex-col items-start shadow-sm">
                <span className="text-[#cba886] font-bold text-[10px] italic leading-tight">*choices*</span>
                <span className="text-xs font-bold leading-tight">OBOVAY</span>
             </div>
             <div className="absolute bottom-10 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full">
                1/15
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-8 flex">
                <div className="bg-[#D92534] text-white font-bold text-xs flex items-center px-4 italic relative w-1/3">
                   BANK HOLIDAY SALE
                   {/* slant edge */}
                   <div className="absolute right-[-10px] top-0 bottom-0 w-[20px] bg-[#D92534] skew-x-[20deg] z-10"></div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white flex justify-between items-center px-4 z-20">
                   <div className="flex flex-col">
                      <span className="text-[8px]">Can't Miss</span>
                      <span className="text-[10px]"><span className="text-lg">🎁</span></span>
                   </div>
                   <span className="font-bold text-sm">Save £0.14</span>
                   <span className="text-xs">🍬</span>
                </div>
             </div>
          </div>

          {/* Info */}
          <div className="bg-white p-3">
             <div className="flex justify-between items-end mb-2">
                <div className="flex items-baseline gap-1">
                   <span className="text-xs text-gray-500">From</span>
                   <span className="text-red-500 font-bold text-2xl leading-none">£0.54</span>
                   <span className="text-gray-400 text-xs inline-flex items-center justify-center w-3 h-3 border border-gray-300 rounded-full ml-1">i</span>
                   <span className="bg-red-500 text-white text-[10px] font-bold px-1 rounded-sm ml-1">-20%</span>
                   <span className="text-gray-400 text-sm line-through ml-1">£0.68</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                   1.2k+ Sold <span className="text-[10px] inline-flex items-center justify-center w-3 h-3 border border-gray-300 rounded-full">i</span>
                </div>
             </div>
             <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-flex items-center gap-1 mb-3">
                🚚 Free Shipping
             </div>

             <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="font-bold text-sm text-gray-800 leading-snug flex-1">
                   Moldable Slow Rebound Coconut Oil Handmade Squeezing Ball Stress R<span className="text-gray-400">... v</span>
                </h1>
                <div className="flex items-center gap-1 text-xs">
                   <span className="text-[#FFD700]">★</span> 4.20 (5) <ChevronRight size={14} className="text-gray-400" />
                </div>
             </div>

             <div className="bg-[#fff9e6] rounded-sm p-2 flex justify-between items-center border border-[#f5e3b5] cursor-pointer">
                <div className="flex items-center gap-2">
                   <span className="text-[#cba886] font-bold text-sm leading-none">🏆</span>
                   <span className="text-[#cba886] font-bold text-xs">#16 Bestseller <span className="text-gray-500 font-normal">in Sports & Outdoor</span></span>
                </div>
                <div className="flex items-center">
                   <div className="flex -space-x-2">
                      <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=20&h=20&fit=crop" className="w-5 h-5 rounded-full border border-white" />
                      <img src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=20&h=20&fit=crop" className="w-5 h-5 rounded-full border border-white" />
                   </div>
                   <ChevronRight size={14} className="text-[#cba886] ml-1" />
                </div>
             </div>
          </div>

          <div className="h-2 bg-gray-100"></div>

          {/* Size Selector */}
          <div className="bg-white p-3 mb-[80px]">
             <h3 className="font-bold text-sm mb-3">Size</h3>
             <div className="flex gap-3">
                {['Green', 'Blue', 'Pink'].map(s => (
                   <button 
                     key={s}
                     onClick={() => setSelectedSize(s)}
                     className={`px-4 py-2 border rounded-sm text-sm font-medium ${selectedSize === s ? 'border-black text-black' : 'border-gray-200 text-gray-800'}`}
                   >
                     {s}
                   </button>
                ))}
             </div>
          </div>

          {/* Fixed Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 flex items-center px-4 gap-4 z-50">
             <button className="flex flex-col items-center text-gray-600">
                <Heart size={24} />
             </button>
             <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-bold h-10 rounded-sm italic z-10 cursor-pointer">
                20% OFF! Add to Cart
             </button>
             <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[#fce8e8] z-0 pointer-events-none"></div> {/* decorative red tint under button like screenshot */}
          </div>
        </MobileLayout>
      </div>
      <div className="hidden lg:block">
         <DesktopLayout>
            <div className="mt-8 text-center text-gray-500">Wait, you're on desktop. PDP layout.</div>
         </DesktopLayout>
      </div>
    </>
  );
};
