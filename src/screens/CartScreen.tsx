import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal, X, MapPin, Trash2, ShoppingCart, Store, Check } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const CartScreen = ({ setScreen, goBack }: { setScreen: (s: string) => void, goBack: () => void }) => {
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
        <MobileLayout setScreen={setScreen} hideNav>
          {/* Header - Matching Screenshot */}
           <div className="bg-white px-3 py-2 sticky top-0 z-50 flex items-center justify-between border-b border-gray-100">
             <div className="flex items-center gap-1.5">
                 <button className="flex items-center gap-1 pr-1">
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                       <Check size={14} className="text-white" strokeWidth={4} />
                    </div>
                    <span className="text-[15px] font-medium">All</span>
                 </button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                 <div className="flex items-center">
                    <span className="font-bold text-[18px]">Cart<span className="text-[14px]">({cart.length})</span></span>
                 </div>
                 <div className="flex items-center text-gray-500 text-[10px] font-medium leading-none ml-1 truncate max-w-[120px]">
                    <MapPin size={10} className="mr-0.5 flex-shrink-0" /> Ship to 20 Limes Avenue <ChevronRight size={10} className="flex-shrink-0 ml-0.5" />
                 </div>
             </div>
             <div className="flex items-center gap-3">
                <button><MoreHorizontal size={22} className="text-gray-800" /></button>
                <button onClick={() => setScreen('HOME')} className="p-1 -mr-1">
                   <X size={24} className="text-gray-800" />
                </button>
             </div>
          </div>

          <div className="bg-white min-h-screen pb-48">
             {/* Green Ticker */}
             <div className="bg-white px-3 py-2">
                <div className="border border-[#1b7e5a] text-[#1b7e5a] text-[11px] font-bold px-2 py-1.5 flex justify-between items-center bg-[#f2faf7]">
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> 5 GBP Credits if late</span>
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Free shipping</span>
                  <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Free Returns</span>
                </div>
             </div>

             {/* Tab selector */}
             <div className="flex bg-gray-50 px-3 py-2 gap-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
                <div className="bg-white px-3 py-1 rounded-[2px] text-[12px] font-medium text-gray-800 flex items-center gap-1 shadow-sm whitespace-nowrap">
                   Selected Items
                </div>
                <div className="bg-white px-3 py-1 rounded-[2px] text-[12px] font-medium text-gray-800 flex items-center gap-1 shadow-sm whitespace-nowrap">
                   <span className="text-[#f94e27]">🔥</span> Almost Out of Stock
                </div>
                <div className="bg-white px-3 py-1 rounded-[2px] text-[12px] font-medium text-gray-800 flex items-center gap-1 shadow-sm whitespace-nowrap">
                   <Store size={12} className="text-[#1b7e5a]" /> EU/UK Warehouse
                </div>
             </div>
             
             {/* Cart Items */}
             {(Object.entries(groupedCart) as [string, any[]][]).map(([sellerName, items]) => (
                <div key={sellerName} className="bg-white mb-2 pb-2">
                   {/* Store Header */}
                   <div className="flex items-center py-3 px-3 gap-2 border-b border-gray-50">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                         <Check size={14} className="text-white" strokeWidth={4} />
                      </div>
                      <div className="flex items-center gap-1">
                         <Store size={18} className="text-black" />
                         <span className="font-bold text-[15px] tracking-tight uppercase">{sellerName}</span>
                         <span className="bg-[#1b7e5a] text-white text-[10px] px-1.5 py-[2px] rounded-[2px] font-medium ml-1 flex items-center gap-1">
                            <Check size={10} strokeWidth={4} /> Free Shipping
                         </span>
                      </div>
                   </div>

                   <div className="px-3">
                      {items.map((item) => (
                        <div key={item.cartItemId} className="flex gap-3 py-4 relative border-b border-gray-50 last:border-0">
                           {/* Item Checkbox */}
                           <div className="flex flex-col justify-center">
                              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                 <Check size={14} className="text-white" strokeWidth={4} />
                              </div>
                           </div>
                           
                           {/* Item Image */}
                           <div className="w-[90px] h-[120px] bg-gray-100 rounded-[2px] overflow-hidden flex-shrink-0 relative">
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
                                <span className="text-[10px]">⌛</span> 10 Left
                             </div>
                           </div>
                           
                           {/* Item Content */}
                           <div className="flex-1 flex flex-col min-w-0">
                             <div className="flex justify-between items-start">
                                <h4 className="text-[13px] text-gray-900 leading-snug font-medium line-clamp-1 pr-4">{item.title}</h4>
                                <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-gray-600">
                                  <Trash2 size={16} />
                                </button>
                             </div>
                             
                             <div className="mt-1 flex flex-col gap-0.5">
                                <div className="text-[11px] text-gray-500 flex items-center">
                                   <Store size={10} className="mr-1" /> Sold by {sellerName} <ChevronRight size={10} />
                                </div>
                                <div className="text-[11px] text-gray-500 flex items-center">
                                   {item.size || 'Blue / Multicolor'} <ChevronRight size={10} className="ml-1" />
                                </div>
                             </div>

                             <div className="mt-1.5 flex flex-col items-start gap-1">
                                <span className="border border-[#f94e27]/50 text-[#f94e27] text-[10px] px-1 py-[0.5px] rounded-[2px]">Voucher ⓘ | for new user in Home & Living</span>
                                <span className="text-[#f94e27] text-[11px] font-medium">May Sell Out Today</span>
                             </div>

                             <div className="flex items-end justify-between mt-2">
                                <div className="flex items-baseline gap-1 relative top-1">
                                  <span className="text-[#f94e27] font-bold text-[18px] leading-none">£{item.price.toFixed(2)}</span>
                                  <span className="text-gray-400 text-[11px] line-through">£{(item.price * 1.5).toFixed(2)}</span>
                                  <span className="bg-[#fef1f1] text-[#f94e27] text-[10px] font-bold px-1 py-0.5 rounded-sm flex items-center">-33% <ChevronRight size={10} /></span>
                                </div>

                                <div className="flex items-center border border-gray-300 rounded-[4px] px-2 py-0.5 bg-white gap-2">
                                  <span className="text-[13px] font-medium">{item.quantity}</span>
                                  <ChevronRight size={12} className="rotate-90 text-gray-500" />
                                </div>
                             </div>
                             
                             <div className="mt-3 flex items-center text-gray-400 text-[10px]">
                                <div className="w-[12px] h-[12px] rounded-full border border-gray-300 flex items-center justify-center text-[8px] mr-1">ⓘ</div>
                                Refund within 14days: This product is re... <ChevronRight size={10} className="rotate-90 ml-1" />
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             ))}

             <div className="px-3 py-3 border-t border-gray-100 flex justify-between items-center text-gray-500 text-[11px]">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] rounded-full border border-gray-300 flex items-center justify-center text-[8px] mr-1.5">ⓘ</div>
                  Some items cannot enjoy discounts. <span className="text-gray-800 font-medium ml-1 flex items-center">View <ChevronRight size={10} /></span>
                </div>
             </div>

             {/* Recommendations Section */}
             <div className="py-4 px-3 bg-gray-50">
                <div className="flex items-center justify-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                   <h2 className="font-bold text-[16px] text-gray-900 tracking-tight">You Might Like to Fill it With</h2>
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   {products.slice(0, 4).map((p) => (
                      <div key={'sugg-' + p.id} className="flex flex-col bg-white rounded-[2px] mb-2 shadow-sm pb-2" onClick={() => setScreen('PDP')}>
                         <div className="relative aspect-[4/5] w-full rounded-t-[2px] overflow-hidden mb-1.5 bg-gray-100 flex-shrink-0">
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
                         <div className="text-[12px] text-gray-800 line-clamp-1 mb-0.5 px-2 font-medium tracking-tight">{p.title}</div>
                         <div className="text-[11px] text-gray-500 mb-1 px-2">{p.sold || '50+ sold'}</div>
                         <div className="flex items-center justify-between px-2">
                            <div className="flex flex-col">
                               <span className="text-[#f94e27] font-bold text-[15px] leading-none">£{p.price.toFixed(2)}</span>
                               <div className="text-gray-400 text-[9px] mt-1">Estimated</div>
                            </div>
                            <button 
                              className="border border-gray-300 rounded-full p-1 shadow-sm"
                              onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                            >
                              <ShoppingCart size={14}/>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Sticky Footer - Matching Screenshot */}
          <div className="fixed bottom-0 w-full bg-white z-50 pb-safe">
             {/* Promo Banner */}
             <div className="bg-[#fff1ed] px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="bg-[#f94e27] w-[18px] h-[18px] flex items-center justify-center rounded-[3px]">
                      <span className="text-white text-[10px] font-black italic">S</span>
                   </div>
                   <span className="text-gray-900 text-[12px] tracking-tight">Get <span className="text-[#f94e27] font-bold">50% OFF</span>, no minimum!</span>
                </div>
                <div className="text-[12px] font-bold text-gray-900 flex items-center">Add <ChevronRight size={14} className="ml-0.5 stroke-[3px]"/></div>
             </div>

             <div className="flex items-center justify-between py-2 px-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-100">
                 <div className="flex flex-col flex-shrink-0">
                    <div className="flex items-baseline gap-0.5 relative">
                       <span className="text-[#f94e27] font-black text-[22px] leading-none tracking-tight">£{Math.floor(totalPrice)}<span className="text-[14px]">.{totalPrice.toFixed(2).split('.')[1]}</span></span>
                    </div>
                    <div className="text-gray-500 text-[11px] flex items-center mt-0.5">
                       Saved £45.07 <ChevronRight size={12} className="-rotate-90 ml-0.5 stroke-[2px]" />
                    </div>
                 </div>
                 
                 <div className="flex-1 flex justify-end pl-4 relative">
                    <button 
                      disabled={selectedCount === 0}
                      onClick={() => setScreen('CHECKOUT')}
                      className={`w-full max-w-[190px] h-[46px] rounded-[2px] flex flex-col items-center justify-center relative ${selectedCount === 0 ? 'bg-[#ffc1b5] text-white' : 'bg-black text-white'}`}
                    >
                      <div className="text-[16px] leading-none font-bold uppercase">Checkout({selectedCount})</div>
                      <div className="text-[10px] leading-none text-[#f94e27] font-bold mt-1.5 flex items-center gap-[2px]">
                         <span className="text-[#f94e27]">⌛</span> Almost sold out!
                      </div>
                      
                      {selectedCount > 0 && (
                        <div className="absolute -top-[8px] right-0 bg-[#1b7e5a] text-white text-[9px] font-bold px-1.5 py-[3px] rounded-bl-[4px] rounded-tr-[2px] flex items-center z-10">
                           <Check size={10} className="mr-0.5" strokeWidth={4}/> Free Shipping
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
