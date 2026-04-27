import React, { useState } from 'react';
import { ChevronRight, MoreHorizontal, X, MapPin, Search, Grid, Trash2, ShoppingCart, Store, Clock, ChevronLeft, MessageSquare, Check } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const CartScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { cart, removeFromCart, updateQuantity, products, addToCart } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>(
    cart.reduce((acc, item) => ({ ...acc, [item.cartItemId]: true }), {})
  );

  const toggleSelect = (cartItemId: string) => {
    setSelectedItems((prev) => ({ ...prev, [cartItemId]: !prev[cartItemId] }));
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((i) => selectedItems[i.cartItemId]);
    const newState = cart.reduce((acc, item) => ({ ...acc, [item.cartItemId]: !allSelected }), {});
    setSelectedItems(newState);
  };

  const selectedCount = cart.filter((i) => selectedItems[i.cartItemId]).reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart
    .filter((i) => selectedItems[i.cartItemId])
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Group by seller for realism based on screenshot
  const groupedCart = cart.reduce<Record<string, any[]>>((acc, item) => {
     const sellerName = item.seller || 'Other';
     if (!acc[sellerName]) acc[sellerName] = [];
     acc[sellerName].push(item);
     return acc;
  }, {});

  const isAllSelected = cart.length > 0 && cart.every((i) => selectedItems[i.cartItemId]);

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout hideNav>
          <div className="bg-[#e4e4e4] px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
             <div className="flex items-center gap-2">
                 <button onClick={() => setScreen('HOME')}><ChevronLeft size={28} className="text-black" /></button>
                 <span className="font-bold text-[18px]">Checkout({cart.length})</span>
             </div>
             <button><MessageSquare size={22} className="text-gray-800" /></button>
          </div>

          <div className="bg-[#e4e4e4] pb-36 min-h-screen">
             
             {/* Info ticker */}
             <div className="bg-[#e4e4e4] flex items-center gap-4 px-3 py-2 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] text-gray-500 font-medium">
               <span className="flex items-center text-[#555]"><Check size={12} className="mr-0.5" /> Free Returns on Select Items</span>
               <span className="flex items-center text-[#555]"><Check size={12} className="mr-0.5" /> 500 points if late</span>
               <span className="flex items-center text-[#555]"><Check size={12} className="mr-0.5" /> Free shipping</span>
             </div>

             {/* Delivery Address Snapshot */}
             <div className="bg-[#e4e4e4] px-3 pb-3 mb-2 flex items-center text-sm border-b border-[#ccc] relative">
               <div className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-[10px] mr-2 flex-shrink-0 bg-white">📍</div>
               <div className="flex-1 overflow-hidden font-medium text-gray-800">
                  <div className="flex items-center font-bold text-[15px] mb-0.5">Dolly Williams <span className="font-normal text-gray-500 text-sm ml-2">07838264887</span></div>
                  <div className="text-[13px] text-gray-500 truncate">14 Boyce Close Borehamwood Hertfordshire United Kingdom...</div>
               </div>
               <ChevronRight size={16} className="text-gray-400" />
               <div className="absolute -bottom-1 left-0 w-full h-[3px]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #FF6B6B, #FF6B6B 15px, transparent 15px, transparent 25px, #4863C9 25px, #4863C9 40px, transparent 40px, transparent 50px)' }}></div>
             </div>

             {/* Almost sold out banner */}
             <div className="bg-[#fcf1f3] px-3 py-2 flex items-center justify-between text-[#d63f3f] text-[13px] font-bold border-b border-[#fce4e8]">
                <div className="flex items-center gap-2">
                   <span>{cart.length} Items Almost sold out!</span>
                   <span className="bg-[#d63f3f] text-white px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1"><span className="text-[10px]">🕒</span> Last Chance!</span>
                </div>
                <div className="text-gray-500 text-[10px] cursor-pointer">✕</div>
             </div>

             {(Object.entries(groupedCart) as [string, any[]][]).map(([sellerName, items]) => (
                <div key={sellerName} className="bg-white border-b border-gray-100">
                   <div className="flex items-center py-3 px-3 border-b border-gray-100 gap-2">
                      <div className="flex items-center gap-1 flex-1">
                         <h3 className="font-bold text-[16px]">{sellerName}({items.length})</h3>
                         <span className="text-[11px] text-gray-500 ml-1">Seller Information <span className="inline-flex items-center justify-center w-3 h-3 border border-gray-400 text-gray-400 rounded-full text-[9px] ml-0.5">?</span></span>
                      </div>
                   </div>

                   <div className="px-3">
                      {items.map((item) => (
                        <div key={item.cartItemId} className="flex gap-3 py-4 border-b border-gray-50 last:border-0 relative">
                           
                           <div className="w-[84px] h-[112px] bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 relative cursor-pointer" onClick={() => setScreen('PDP')}>
                             <img src={item.img} className="w-full h-full object-cover" />
                             <div className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-0.5 font-medium leading-tight">
                                Almost Sold Out
                             </div>
                           </div>
                           
                           <div className="flex-1 flex flex-col pt-0.5">
                             <div className="flex items-start justify-between gap-1 mb-1 relative">
                                <h4 className="text-[13px] text-gray-800 leading-snug mb-1 line-clamp-1">{item.title}</h4>
                             </div>
                             
                             <div className="text-[11px] text-gray-500 mb-2 flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#f0e6d2] mr-1 flex-shrink-0 shadow-[inset_0_0_1px_rgba(0,0,0,0.2)]"></div>
                                {item.size || 'Multicolor / 38(M)'} <span className="text-orange-500 ml-2 font-medium">🔥 200+ sold</span>
                             </div>

                             <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="text-[#f94e27] font-bold text-[16px] leading-none">£{item.price.toFixed(2)}</span>
                                  <span className="text-gray-400 text-[11px] line-through decoration-gray-400">£{(item.price * 1.5).toFixed(2)}</span>
                                  <span className="text-[#f94e27] bg-[#feebea] text-[10px] px-1 py-[1px] rounded-[2px] font-semibold">-30% | 23:58:56</span>
                                </div>

                                <div className="flex items-center border border-gray-300 rounded-sm h-[28px] bg-[#fcfcfc] shadow-sm ml-2">
                                  <button 
                                    className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 text-[18px] font-medium"
                                    onClick={() => {
                                       if(item.quantity === 1) {
                                           removeFromCart(item.cartItemId);
                                       } else {
                                           updateQuantity(item.cartItemId, item.quantity - 1);
                                       }
                                    }}
                                  >-</button>
                                  <span className="text-[13px] font-bold px-1 min-w-[20px] text-center">{item.quantity}</span>
                                  <button 
                                    className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 text-[16px] font-medium"
                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                  >+</button>
                                </div>
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             ))}

             <div className="px-3 py-3 bg-[#f5f5f5] flex items-center justify-between text-gray-500 text-[12px]">
                <div className="flex items-center gap-1">
                   <div className="w-3.5 h-3.5 border border-gray-400 rounded-full flex items-center justify-center text-[9px] font-bold text-gray-500 italic">i</div>
                   Some items cannot enjoy discounts.
                </div>
                <div className="flex items-center font-bold text-gray-800">View <ChevronRight size={14} /></div>
             </div>

             {/* Recommendations Section */}
             <div className="py-4 px-3 bg-white min-h-[300px]">
                <div className="flex items-center justify-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                   <h2 className="font-bold text-[16px] text-gray-900 tracking-tight">You Might Like to Fill it With</h2>
                   <div className="w-1.5 h-1.5 bg-gray-300 rotate-45"></div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-3">
                   <button className="bg-black text-white text-[12px] font-bold px-4 py-1.5 rounded-full border border-black">All</button>
                   <button className="bg-white text-gray-700 text-[12px] px-3 py-1.5 rounded-full border border-gray-200 whitespace-nowrap flex items-center gap-1 font-medium"><span className="text-orange-500">🔥</span> Hot Deals</button>
                   <button className="bg-white text-gray-700 text-[12px] px-3 py-1.5 rounded-full border border-gray-200 whitespace-nowrap flex items-center gap-1 font-medium"><span className="text-[10px]">🛒</span> Popular Picks</button>
                   <button className="bg-white text-gray-700 text-[12px] px-3 py-1.5 rounded-full border border-gray-200 whitespace-nowrap flex items-center gap-1 font-medium">🏫 EU/UK Wa...</button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   {products.slice(0, 4).map((p) => (
                      <div key={'sugg-' + p.id} className="flex flex-col bg-white rounded-sm mb-2" onClick={() => setScreen('PDP')}>
                         <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden mb-1.5 bg-gray-100 flex-shrink-0">
                            <img src={p.img} className="w-full h-full object-cover" />
                            {p.seller && (
                               <div className="absolute top-0 left-0 bg-white/90 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black">
                                  Choices <br/> {p.seller}
                               </div>
                            )}
                            {p.discount && (
                               <div className="absolute bottom-0 w-full bg-gradient-to-r from-red-500 via-pink-500 to-pink-500 text-white text-[10px] px-1 py-0.5 flex justify-between items-center whitespace-nowrap overflow-hidden">
                                  <span className="font-black italic flex items-center"><span className="bg-white/20 px-1 rounded-sm mr-1">SALE</span> Can't Miss</span>
                                  <span className="font-bold flex-shrink-0 bg-white/20 px-1 rounded-sm border border-white/40">Save {(p.originalPrice! - p.price).toFixed(2)}</span>
                               </div>
                            )}
                         </div>
                         <div className="text-[12px] text-gray-800 line-clamp-1 mb-0.5 px-1 font-medium tracking-tight h-[18px]">{p.title}</div>
                         <div className="text-[11px] text-gray-500 mb-1 px-1 h-[16px]">{p.sold}</div>
                         <div className="flex items-center justify-between px-1">
                            <div className="flex flex-col">
                               <div className="flex items-center gap-1">
                                  <span className="text-[#f94e27] font-bold text-[15px] leading-none">£{p.price.toFixed(2)}</span>
                               </div>
                               {p.discount ? (
                                 <div className="text-[#f94e27] text-[9px] bg-[#feebea] w-fit px-1 mt-1 font-medium py-[1px] rounded-[1px]">{p.discount} Before 21:41</div>
                               ) : (
                                 <div className="h-[15px] mt-1"></div>
                               )}
                               <div className="text-gray-400 text-[9px] mt-0.5">Estimated</div>
                            </div>
                            <button 
                              className="border border-gray-300 rounded-sm p-1.5 self-end mb-2 shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(p);
                              }}
                            >
                              <ShoppingCart size={15}/>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="fixed bottom-0 w-full bg-white z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe block lg:hidden border-t-0">
             {/* Tiny banner */}
             <div className="bg-[#fcf1f3] px-3 py-2 flex items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute -left-2 -bottom-2 w-10 h-10 bg-[#f94e27] rounded-full opacity-10"></div>
                <div className="flex items-center gap-2 relative z-10">
                   <div className="bg-[#f94e27] w-[22px] h-[22px] flex items-center justify-center rounded-[4px] shadow-sm"><span className="text-white text-[12px] font-black italic">S</span></div>
                   <span className="text-gray-800 text-[13px] font-medium tracking-tight">Get <span className="text-[#e2364c] font-black">50% OFF</span>, no minimum!</span>
                </div>
                <div className="text-[13px] font-black text-gray-900 flex items-center relative z-10">Add <ChevronRight size={16} className="ml-0.5 stroke-[3px]"/></div>
             </div>

             <div className="flex items-center justify-between py-2.5 pl-4 pr-3 border-t border-gray-100/50">
                 <div className="flex flex-col flex-shrink-0 mr-3">
                    <div className="flex items-baseline gap-1 relative">
                       <span className="text-[#f94e27] font-black text-[22px] leading-none tracking-tighter">£{Math.floor(totalPrice)}<span className="text-[15px]">.{(totalPrice % 1).toFixed(2).substring(2)}</span></span>
                    </div>
                    <div className="text-[#f94e27] text-[12px] font-medium flex items-center mt-1 cursor-pointer">
                       Saved £45.07 <ChevronRight size={14} className="-rotate-90 ml-0.5 stroke-[2.5px]" />
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-end flex-1 pl-2 relative">
                    <button 
                      disabled={selectedCount === 0}
                      onClick={() => setScreen('CHECKOUT')}
                      className={`w-full max-w-[210px] h-12 rounded-[2px] flex flex-col items-center justify-center relative ${selectedCount === 0 ? 'bg-[#ffc1b5] text-white' : 'bg-[#111] text-white px-2 shadow-lg shadow-black/20'}`}
                    >
                      <div className="text-[15px] leading-none font-bold mb-0.5">Checkout({selectedCount})</div>
                      <div className="text-[9px] leading-none text-[#ffc870] font-black tracking-tight italic flex items-center gap-[2px]"><span>⏳</span> Almost sold out!</div>
                      
                      {selectedCount > 0 && (
                        <div className="absolute -top-[9px] right-0 bg-[#1b7e5a] text-white text-[9px] font-bold px-1.5 py-[3px] rounded-bl-[4px] rounded-tr-[2px] flex items-center z-10 shadow-sm border border-[#1b7e5a]">
                           <Store size={9} className="mr-1 fill-current"/> Free Shipping
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

