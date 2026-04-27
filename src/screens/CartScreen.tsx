import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal, X, MapPin, Trash2, ShoppingCart, Store, Check } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const CartScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { cart, removeFromCart, products, addToCart } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>(
    cart.reduce((acc, item) => ({ ...acc, [item.cartItemId]: true }), {})
  );

  const selectedCount = cart.filter((i) => selectedItems[i.cartItemId]).reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart
    .filter((i) => selectedItems[i.cartItemId])
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Group by seller for realism based on screenshot
  const groupedCart = cart.reduce<Record<string, any[]>>((acc, item) => {
     const sellerName = item.seller || 'SHEIN';
     if (!acc[sellerName]) acc[sellerName] = [];
     acc[sellerName].push(item);
     return acc;
  }, {});

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout setScreen={setScreen}>
          {/* Header - Matching Screenshot */}
           <div className="bg-white px-4 py-2 sticky top-0 z-50 flex items-center justify-between border-b border-gray-100">
             <div className="flex items-center gap-2">
                 <button onClick={() => setScreen('HOME')} className="p-1 -ml-2">
                    <ChevronLeft size={26} className="text-gray-800" />
                 </button>
                 <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                       <span className="font-bold text-[18px]">Cart<span className="text-[14px] ml-0.5">({cart.length})</span></span>
                    </div>
                    <div className="flex items-center text-gray-400 text-[10px] font-medium leading-none">
                       <MapPin size={10} className="mr-0.5" /> Ship to 20 Limes... <ChevronRight size={10} />
                    </div>
                 </div>
             </div>
             <div className="flex items-center gap-3">
                <button><MoreHorizontal size={22} className="text-gray-800" /></button>
                <button onClick={() => setScreen('HOME')} className="p-1 -mr-2">
                   <X size={24} className="text-gray-800" />
                </button>
             </div>
          </div>

          <div className="bg-white min-h-screen pb-40">
             {/* Scrolling Green Ticker */}
             <div className="bg-white py-1.5 overflow-hidden whitespace-nowrap border-b border-gray-100">
                <div className="flex items-center gap-6 px-3 animate-marquee-slow text-[11px] font-bold text-[#1b7e5a]">
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Returns on Select Items</span>
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> 5 GBP Credits if late</span>
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Free shipping</span>
                </div>
             </div>

             {/* Tab selector */}
             <div className="flex bg-gray-50 px-3 py-2 gap-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
                <div className="bg-white px-3 py-1 rounded-sm text-[11px] font-bold shadow-sm flex items-center gap-1">
                   <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={4} />
                   </div>
                   Selected Items
                </div>
                <div className="bg-white px-3 py-1 rounded-sm text-[11px] font-bold text-gray-800 shadow-sm flex items-center gap-1 whitespace-nowrap">
                   <span className="text-red-500">🔥</span> Almost Out of Stock
                </div>
                <div className="bg-white px-3 py-1 rounded-sm text-[11px] font-bold text-gray-800 shadow-sm flex items-center gap-1 whitespace-nowrap">
                   <Store size={12} className="text-green-700" /> EU/UK Warehouse
                </div>
             </div>
             
             {/* Cart Items */}
             {(Object.entries(groupedCart) as [string, any[]][]).map(([sellerName, items]) => (
                <div key={sellerName} className="bg-white mb-2">
                   {/* Store Header */}
                   <div className="flex items-center py-3 px-3 gap-2">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                         <Check size={14} className="text-white" strokeWidth={4} />
                      </div>
                      <div className="flex items-center gap-1">
                         <Store size={18} className="text-black" />
                         <span className="font-black text-[15px] tracking-tight uppercase">{sellerName}</span>
                         <span className="bg-[#1b7e5a] text-white text-[9px] px-1.5 py-0.5 rounded-[2px] font-bold ml-1 flex items-center gap-1">
                            <Check size={8} strokeWidth={4} /> Free Shipping
                         </span>
                      </div>
                   </div>

                   <div className="px-3">
                      {items.map((item) => (
                        <div key={item.cartItemId} className="flex gap-3 py-4 border-b border-gray-50 last:border-0 relative">
                           {/* Item Checkbox */}
                           <div className="flex flex-col justify-center">
                              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                 <Check size={14} className="text-white" strokeWidth={4} />
                              </div>
                           </div>
                           
                           {/* Item Image */}
                           <div className="w-[100px] h-[133px] bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                             <img 
                               src={item.img} 
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
                             <div className="absolute bottom-0 w-full bg-[#f94e27] text-white text-[10px] text-center py-0.5 font-bold flex items-center justify-center gap-1">
                                <span className="text-[11px]">🔥</span> 10 Left
                             </div>
                           </div>
                           
                           {/* Item Content */}
                           <div className="flex-1 flex flex-col min-w-0">
                             <div className="flex justify-between items-start">
                                <h4 className="text-[14px] text-gray-900 leading-snug font-medium line-clamp-2 pr-4">{item.title}</h4>
                                <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-gray-600">
                                  <Trash2 size={16} />
                                </button>
                             </div>
                             
                             <div className="mt-1 flex flex-col gap-0.5">
                                <div className="text-[11px] text-gray-500 flex items-center font-medium">
                                   <Store size={12} className="mr-1" /> Sold by {sellerName} <ChevronRight size={12} />
                                </div>
                                <div className="text-[12px] text-gray-500 flex items-center">
                                   {item.size || 'Default Size'} <ChevronRight size={12} className="ml-1" />
                                </div>
                             </div>

                             <div className="mt-2 flex flex-wrap gap-1">
                                <span className="border border-[#f94e27] text-[#f94e27] text-[10px] px-1 py-[0.5px] rounded-[2px] font-bold">Voucher ⓘ | for new user...</span>
                                <span className="text-[#f94e27] text-[11px] font-bold w-full mt-0.5">100+ buying now</span>
                             </div>

                             <div className="flex items-end justify-between mt-2">
                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                  <span className="text-[#f94e27] font-black text-[20px] leading-none">£{item.price.toFixed(2)}</span>
                                  <span className="text-gray-400 text-[12px] line-through">£{(item.price * 1.5).toFixed(2)}</span>
                                  <span className="text-[#f94e27] text-[10px] font-bold flex items-center">-33% <ChevronRight size={10} /></span>
                                </div>

                                <div className="flex items-center border border-gray-200 rounded-[2px] px-2 py-0.5 bg-white shadow-sm gap-1">
                                  <span className="text-[14px] font-medium">{item.quantity}</span>
                                  <ChevronRight size={12} className="rotate-90 text-gray-500" />
                                </div>
                             </div>
                             
                             <div className="mt-2 flex items-center text-gray-400 text-[10px]">
                                <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center text-[8px] mr-1">ⓘ</div>
                                Refund within 14days: This product is re... <ChevronRight size={10} className="rotate-90" />
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             ))}

             {/* Recommendations Section */}
             <div className="py-4 px-3 bg-white">
                <div className="flex items-center justify-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                   <h2 className="font-bold text-[16px] text-gray-900 tracking-tight">You Might Like to Fill it With</h2>
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   {products.slice(0, 4).map((p) => (
                      <div key={'sugg-' + p.id} className="flex flex-col bg-white rounded-sm mb-2" onClick={() => setScreen('PDP')}>
                         <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden mb-1.5 bg-gray-100 flex-shrink-0">
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
                         </div>
                         <div className="text-[12px] text-gray-800 line-clamp-1 mb-0.5 px-1 font-medium tracking-tight">{p.title}</div>
                         <div className="text-[11px] text-gray-500 mb-1 px-1">{p.sold || '50+ sold'}</div>
                         <div className="flex items-center justify-between px-1">
                            <div className="flex flex-col">
                               <span className="text-[#f94e27] font-bold text-[15px] leading-none">£{p.price.toFixed(2)}</span>
                               <div className="text-gray-400 text-[9px] mt-1">Estimated</div>
                            </div>
                            <button 
                              className="border border-gray-300 rounded-sm p-1.5"
                              onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                            >
                              <ShoppingCart size={15}/>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Sticky Footer - Matching Screenshot */}
          <div className="fixed bottom-0 w-full bg-white z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-safe border-t border-gray-50">
             {/* Promo Banner */}
             <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-gray-50 relative">
                <div className="flex items-center gap-2">
                   <div className="bg-[#f94e27] w-[18px] h-[18px] flex items-center justify-center rounded-[3px]">
                      <span className="text-white text-[10px] font-black italic">S</span>
                   </div>
                   <span className="text-gray-900 text-[13px] font-medium tracking-tight">Get <span className="text-[#f94e27] font-black">50% OFF</span>, no minimum!</span>
                </div>
                <div className="text-[13px] font-black text-gray-900 flex items-center">Add <ChevronRight size={16} className="ml-0.5 stroke-[3px]"/></div>
             </div>

             <div className="flex items-center justify-between py-3 px-3">
                 <div className="flex flex-col flex-shrink-0">
                    <div className="flex items-baseline gap-1 relative">
                       <span className="text-[#f94e27] font-black text-[24px] leading-none tracking-tighter">£{Math.floor(totalPrice)}<span className="text-[16px]">.{(totalPrice * 100 % 100).toString().padStart(2, '0').slice(0, 2)}</span></span>
                    </div>
                    <div className="text-[#f94e27] text-[11px] font-medium flex items-center mt-1">
                       Saved £45.07 <ChevronRight size={14} className="-rotate-90 ml-0.5 stroke-[2.5px]" />
                    </div>
                 </div>
                 
                 <div className="flex-1 flex justify-end pl-4 relative">
                    <button 
                      disabled={selectedCount === 0}
                      onClick={() => setScreen('CHECKOUT')}
                      className={`w-full max-w-[200px] h-[48px] rounded-[2px] flex flex-col items-center justify-center relative ${selectedCount === 0 ? 'bg-[#ffc1b5] text-white' : 'bg-black text-white px-2'}`}
                    >
                      <div className="text-[16px] leading-none font-black uppercase">Checkout({selectedCount})</div>
                      <div className="text-[10px] leading-none text-white/90 font-bold mt-1 flex items-center gap-[2px]">
                         <span className="text-[#f94e27]">🔥</span> Almost sold out!
                      </div>
                      
                      {selectedCount > 0 && (
                        <div className="absolute -top-[10px] right-0 bg-[#1b7e5a] text-white text-[9px] font-bold px-2 py-[4px] rounded-bl-[6px] rounded-tr-[2px] flex items-center z-10 shadow-sm">
                           <Check size={10} className="mr-1" strokeWidth={4}/> Free Shipping
                        </div>
                      )}
                    </button>
                 </div>
             </div>
          </div>
        </MobileLayout>
      </div>
      
      <div className="hidden lg:block">
        <DesktopLayout setScreen={setScreen}>
           <div className="text-center mt-12 bg-white p-12 border border-gray-200 shadow-sm max-w-lg mx-auto rounded-sm">
             <h2 className="text-2xl font-bold mb-4">Cart Simulated</h2>
             <p className="text-gray-600 mb-6">Please use the mobile view (responsive frame) to see the exact UI replica of the checkout/cart flow.</p>
          </div>
        </DesktopLayout>
      </div>
    </>
  );
};
