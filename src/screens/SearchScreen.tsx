import React from 'react';
import { ChevronLeft, Camera, Search, ArrowUp } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';

export const SearchScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const trendingSearches = [
     { rank: 1, name: 'Need Doh', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=100&auto=format&fit=crop' },
     { rank: 2, name: 'Modest Summer Ou...', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=100&auto=format&fit=crop' },
     { rank: 3, name: 'Holiday Heels', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=100&auto=format&fit=crop' },
     { rank: 4, name: 'Jersey Tops Women', img: null },
     { rank: 5, name: '2 Piece Summer Outfit', img: null },
  ];

  const womenCoords = [
     { rank: 1, name: '2 Piece Summer Ou...', img: 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=100&auto=format&fit=crop' },
     { rank: 2, name: 'Co Ord Sets Wo...', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=100&auto=format&fit=crop' },
     { rank: 3, name: 'Summer Two Piec...', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=100&auto=format&fit=crop' },
     { rank: 4, name: 'Linen 2 Piece Set', img: null },
     { rank: 5, name: 'Summer Two Piec...', img: null },
  ];

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout hideNav setScreen={setScreen}>
          <div className="bg-white px-4 py-2 sticky top-0 z-10 border-b border-gray-100 flex gap-3 items-center">
             <button onClick={() => goBack()}><ChevronLeft size={28} className="text-black" /></button>
             <div className="flex-1 bg-white border border-gray-300 rounded-sm h-10 flex items-center pr-1 overflow-hidden">
               <input type="text" autoFocus placeholder="jeans" className="flex-1 h-full pl-3 outline-none text-black bg-transparent" />
               <button className="px-2"><Camera size={20} className="text-gray-400" /></button>
               <button onClick={() => setScreen('PLP')} className="bg-black text-white h-8 w-10 flex items-center justify-center rounded-sm">
                 <Search size={18} />
               </button>
             </div>
          </div>

          <div className="p-4 bg-white">
             <h2 className="font-bold text-base mb-3">Search Discovery</h2>
             <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs text-black">BANK HOLIDAY SALE</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Puppy Keep</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Bikini</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Wedding Guest Dress Women</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Summer</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Tops</span>
                <span className="bg-[#f0f5ff] text-[#4863C9] px-3 py-1.5 rounded-sm text-xs flex items-center gap-1"><ArrowUp size={12} className="rotate-45" /> Shorts</span>
                <span className="bg-gray-100 px-3 py-1.5 rounded-sm text-xs text-black flex items-center gap-1"><span className="text-red-500">🔥</span> Jeans</span>
                <span className="bg-transparent border border-gray-200 px-3 py-1.5 rounded-sm text-xs text-gray-500">More v</span>
             </div>

             <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4">
                <div className="w-[300px] flex-shrink-0 bg-gradient-to-br from-red-50 to-white rounded-md p-3 border border-red-100">
                   <h3 className="text-[#D92534] font-bold flex items-center gap-1 mb-4">
                      <span className="bg-[#D92534] text-white text-[10px] px-1 rounded-sm">TOP</span>
                      Trending Search
                   </h3>
                   <div className="flex flex-col gap-4">
                      {trendingSearches.map((item, i) => (
                         <div key={i} className="flex flex-row items-center gap-3">
                            <span className={`w-4 h-5 flex items-center justify-center text-[10px] text-white font-bold ${i < 3 ? 'bg-[#cba886] rounded-t-sm' : 'bg-gray-300 rounded-t-sm'}`}>{item.rank}</span>
                            {item.img && <img 
                              src={item.img} 
                              className="w-10 h-10 object-cover rounded-sm" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.getAttribute('data-tried-fallback')) {
                                  target.setAttribute('data-tried-fallback', 'true');
                                  target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                                }
                              }}
                            />}
                            <span className="flex-1 font-bold text-sm text-gray-800">{item.name}</span>
                            <ArrowUp size={16} className="text-red-500" />
                         </div>
                      ))}
                   </div>
                </div>

                <div className="w-[300px] flex-shrink-0 bg-gradient-to-br from-red-50 to-white rounded-md p-3 border border-red-100">
                   <h3 className="text-[#D92534] font-bold flex items-center gap-1 mb-4">
                      <span className="bg-[#D92534] text-white text-[10px] px-1 rounded-sm">TOP</span>
                      Women Co-o...
                   </h3>
                   <div className="flex flex-col gap-4">
                      {womenCoords.map((item, i) => (
                         <div key={i} className="flex flex-row items-center gap-3">
                            <span className={`w-4 h-5 flex items-center justify-center text-[10px] text-white font-bold ${i < 3 ? 'bg-[#cba886] rounded-t-sm' : 'bg-gray-300 rounded-t-sm'}`}>{item.rank}</span>
                            {item.img && <img 
                              src={item.img} 
                              className="w-10 h-10 object-cover rounded-sm" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.getAttribute('data-tried-fallback')) {
                                  target.setAttribute('data-tried-fallback', 'true');
                                  target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                                }
                              }}
                            />}
                            <span className="flex-1 font-bold text-sm text-gray-800">{item.name}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </MobileLayout>
      </div>
      <div className="hidden lg:block">
         <DesktopLayout>
            <div className="mt-8 text-center text-gray-500">Wait, you're on desktop. Use the header search.</div>
         </DesktopLayout>
      </div>
    </>
  );
};
