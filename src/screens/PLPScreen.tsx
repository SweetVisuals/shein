import React from 'react';
import { ChevronLeft, Camera, Search, LayoutGrid, Heart, SlidersHorizontal, ShoppingCart, ArrowUp } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const PLPScreen = ({ setScreen, goBack }: { setScreen: (s: string) => void, goBack: () => void }) => {
  const { products, categories, addToCart } = useAppContext();

  const displayCategories = categories.length > 0 ? categories : [
    { name: 'Women Apparel', image_url: 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=100&auto=format&fit=crop' },
    { name: 'Home & Living', image_url: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?q=80&w=100&auto=format&fit=crop' },
    { name: 'Kids', image_url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=100&auto=format&fit=crop' },
    { name: 'Jewelry & Watches', image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=100&auto=format&fit=crop' },
  ];

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout setScreen={setScreen}>
          {/* Header */}
          <div className="bg-white px-3 py-2 sticky top-0 z-10 border-b border-gray-100 flex gap-2 items-center">
             <button onClick={() => goBack()}><ChevronLeft size={28} className="text-black" /></button>
             <div onClick={() => setScreen('SEARCH')} className="flex-1 bg-white border border-gray-300 rounded-sm h-10 flex items-center pr-1 overflow-hidden cursor-text">
               <span className="flex-1 pl-3 text-[#4863C9] flex items-center gap-1 text-sm"><ArrowUp size={14} className="rotate-45" /> Puppy Keep</span>
               <button className="px-2"><Camera size={20} className="text-gray-400" /></button>
               <button className="bg-black text-white h-8 w-10 flex items-center justify-center rounded-sm">
                 <Search size={18} />
               </button>
             </div>
             <button><LayoutGrid size={24} className="text-black" /></button>
             <button><Heart size={24} className="text-black" /></button>
          </div>

          {/* Categories Story */}
          <div className="bg-white py-3 flex gap-4 overflow-x-auto no-scrollbar px-4 border-b border-gray-100">
             {displayCategories.map((c, i) => (
                <div key={c.id || i} className="flex flex-col items-center flex-shrink-0 w-16">
                   <div className="w-14 h-14 rounded-full overflow-hidden mb-1 border border-gray-200">
                      <img 
                         src={c.image_url} 
                         className="w-full h-full object-cover" 
                         referrerPolicy="no-referrer"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           if (!target.getAttribute('data-tried-fallback')) {
                             target.setAttribute('data-tried-fallback', 'true');
                             target.src = 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=100&auto=format&fit=crop';
                           }
                         }}
                       />
                   </div>
                   <span className="text-[10px] text-center leading-tight">{c.name}</span>
                </div>
             ))}
          </div>

          {/* Filter Bar */}
          <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 text-sm">
             <button className="font-bold flex items-center gap-1">Recommend <span className="text-gray-400 text-[10px]">▼</span></button>
             <button className="text-gray-600">Most Popular</button>
             <button className="text-gray-600 flex items-center gap-0.5">Price <span className="flex flex-col -space-y-1"><span className="text-[8px] text-gray-400">▲</span><span className="text-[8px] text-gray-400">▼</span></span></button>
             <button className="text-gray-600 flex items-center gap-1">Filter <SlidersHorizontal size={14} /></button>
          </div>

          {/* Quick Filters */}
          <div className="bg-white px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar mb-2">
             <button className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap flex items-center gap-1"><span className="text-green-600">🚚</span> EU/UK Warehouse</button>
             <button className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap flex items-center gap-1"><span className="text-green-600">🚚</span> 3-Day Delivery</button>
             <button className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap">Trends</button>
             <button className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap">Category</button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-2 px-2 pb-6">
             {products.map((p, i) => (
                <div key={i} className="bg-white rounded-md overflow-hidden cursor-pointer" onClick={() => setScreen('PDP')}>
                   <div className="relative aspect-[3/4]">
                      <img 
                         src={p.img} 
                         className="w-full h-full object-cover" 
                         referrerPolicy="no-referrer"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           if (!target.getAttribute('data-tried-fallback')) {
                             target.setAttribute('data-tried-fallback', 'true');
                             target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                           }
                         }}
                       />
                      {p.isChoice && (
                         <div className="absolute top-0 left-0 bg-white/90 px-2 py-0.5 rounded-br-md flex flex-col items-start">
                            <span className="text-[#cba886] font-bold text-[10px] italic leading-tight">*choices*</span>
                            <span className="text-[10px] font-bold leading-tight">OBOVAY</span>
                         </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0">
                         <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2 py-1 flex justify-between items-center">
                            <span>BANK HOLIDAY SALE</span>
                            <span>Save £0.14</span>
                         </div>
                      </div>
                   </div>
                   <div className="p-2">
                      <h3 className="text-xs text-gray-800 line-clamp-1 mb-1">{p.title}</h3>
                      <div className="flex flex-col gap-0.5 mb-1">
                         <span className="text-red-500 text-[10px] flex items-center gap-1"><span className="text-[8px]">⏳</span> {p.stockLabel}</span>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-500">{p.sold}</span>
                            {p.rating && <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><span className="text-[#FFD700]">★</span> {p.rating}</span>}
                         </div>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                         <div className="flex items-baseline gap-1">
                            <span className="text-red-500 font-bold text-lg leading-none">£{p.price.toFixed(2)}</span>
                            {p.discount && <span className="bg-red-100 text-red-500 text-[10px] px-1 py-0.5 rounded-sm">{p.discount}</span>}
                         </div>
                         <button 
                            className="p-1.5 border border-gray-200 rounded-full text-black hover:bg-gray-50"
                            onClick={(e) => {
                               e.stopPropagation();
                               addToCart(p);
                            }}
                         >
                            <ShoppingCart size={16} />
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </MobileLayout>
      </div>
      <div className="hidden lg:block">
         <DesktopLayout>
            <div className="mt-8 text-center text-gray-500">Wait, you're on desktop. PLP would render differently here, typically with a left sidebar for filters and a larger grid.</div>
         </DesktopLayout>
      </div>
    </>
  );
};
