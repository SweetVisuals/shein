import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, CheckCircle, ShieldCheck, Clock, HelpCircle, Gift, X } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabase';

export const CheckoutScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { cart, clearCart, user } = useAppContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showCouponOverlay, setShowCouponOverlay] = useState(true);

  // Deriving values strictly based on actual cart
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 15 ? 0 : 3.00;
  const promotions = - (subtotal * 0.1); // 10% discount
  const coupons = -1.36;
  const orderTotal = Math.max(0, subtotal + shippingFee + promotions + coupons);
  const saved = Math.abs(promotions + coupons) + (subtotal > 15 ? 3.00 : 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      setScreen('AUTH');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setIsLoading(true);
      
      // Artificial delay of 3 seconds as requested
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 1. Create the order
      const orderNumber = 'GSO' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          user_id: user.id,
          status: 'PROCESSING',
          shipping_address_json: { 
             full_name: 'Ann Aggrey-Darkoh', 
             phone: '0541896517', 
             address: '20 Limes Avenue, Alfreton, Derbyshire, UK',
             postal_code: 'DE55 7AS'
          },
          subtotal: subtotal,
          shipping_fee: shippingFee,
          discount_total: Math.abs(promotions + coupons),
          total_amount: orderTotal,
          payment_method: selectedPayment,
          payment_status: 'PAID',
          payment_date: new Date().toISOString(),
          estimated_delivery_start: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          estimated_delivery_end: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      // 3. Create Shipment and Tracking Number
      const trackingNumber = 'OJ' + Math.floor(100000000 + Math.random() * 900000000) + 'GB';
      await supabase
        .from('shipments')
        .insert([{
          order_id: order.id,
          tracking_number: trackingNumber,
          carrier: 'SHEIN Express',
          status: 'PREPARING'
        }]);
      
      // 4. Create Initial Tracking Event
      const { data: shipment } = await supabase.from('shipments').select('id').eq('order_id', order.id).single();
      if (shipment) {
        await supabase.from('tracking_events').insert([{
          shipment_id: shipment.id,
          status: 'Order Placed',
          location: 'Distribution Center',
          description: 'Your order has been placed and is being prepared for shipment.'
        }]);
      }

      // 5. Update user loyalty points
      const newPoints = (user.loyaltyPoints || 0) + Math.floor(orderTotal);
      await supabase
        .from('users')
        .update({ loyalty_points: newPoints })
        .eq('id', user.id);

      // 6. Clear Cart
      await clearCart();
      setIsSuccess(true);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MobileLayout hideNav>
        <div className="bg-white min-h-screen flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin-slow mb-4"></div>
          <p className="text-[14px] text-gray-500 font-medium">Processing your order...</p>
        </div>
      </MobileLayout>
    );
  }

  if (isSuccess) {
    return (
      <MobileLayout hideNav>
        <div className="bg-white min-h-screen">
          <div className="bg-white px-4 py-4 sticky top-0 z-50 flex items-center border-b border-gray-100">
             <button onClick={() => { clearCart(); setScreen('HOME'); }} className="absolute left-4"><X size={24} className="text-gray-600" strokeWidth={1.5} /></button>
             <span className="font-bold w-full text-center text-[16px] text-gray-900">Payment</span>
          </div>
          
          <div className="bg-white flex flex-col items-center pt-10 pb-8 px-6">
            <div className="w-16 h-16 rounded-full border-[2.5px] border-[#188a42] flex items-center justify-center mb-6">
               <CheckCircle size={32} className="text-[#188a42]" strokeWidth={2.5} />
            </div>
            <h1 className="text-[17px] font-bold text-black mb-3 text-center">Payment successful!</h1>
            <p className="text-[13px] text-gray-500 text-center mb-8 px-2 leading-relaxed">
               Thank you for shopping with us. Your order is currently<br/>being processed.
            </p>

            <button 
               onClick={() => { clearCart(); setScreen('ORDERS'); }}
               className="bg-black text-white px-6 h-10 text-[11px] tracking-wider font-bold uppercase rounded-[2px]"
            >
               VIEW MY ORDERS
            </button>
          </div>
          
          <div className="w-full h-3 bg-[#f5f5f5]"></div>

          <div className="bg-white p-5">
             <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[14px] font-bold text-gray-900">Please confirm your shipping address:</span>
             </div>
             
             <div className="pl-6 mb-4">
                <div className="text-[13px] text-gray-800 mb-2 font-bold">{user?.name || 'Guest User'} {user?.phoneNumber || ''}</div>
                
                <div className="text-[13px] text-gray-600 leading-relaxed">
                   {user?.fullAddress || 'No address set in admin'}
                </div>
             </div>

             <div className="pl-6 flex items-center gap-3">
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-1.5 text-[12px] bg-white"
                >
                  Edit
                </button>
                <button 
                  onClick={() => { clearCart(); setScreen('HOME'); }}
                  className="bg-[#1f1f1f] text-white px-4 py-1.5 text-[12px]"
                >
                  Confirm
                </button>
             </div>
          </div>

        </div>
      </MobileLayout>
    );
  }

  const CheckedIcon = () => (
     <div className="w-[18px] h-[18px] rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
     </div>
  );

  const UncheckedIcon = () => (
     <div className="w-[18px] h-[18px] rounded-full border border-gray-400 flex items-center justify-center flex-shrink-0"></div>
  );

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout hideNav>
          {/* Header */}
          <div className="bg-white px-3 py-3 sticky top-0 z-50 flex items-center border-b border-gray-100">
             <button onClick={() => setScreen('CART')} className="absolute left-3"><ChevronLeft size={28} className="text-black" /></button>
             <span className="font-bold w-full text-center text-lg">Checkout({itemsCount})</span>
          </div>

          <div className="bg-gray-50 min-h-screen pb-32">
            
            {/* Top Ticker */}
            <div className="bg-white border-b border-gray-200 flex items-center gap-4 px-3 py-2 overflow-x-auto no-scrollbar whitespace-nowrap">
               <div className="text-[#188a42] text-[11px] flex items-center gap-1 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Tick for Free On-Time Delivery
               </div>
               <div className="text-[#188a42] text-[11px] flex items-center gap-1 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Free shipping <ChevronRight size={10} className="rotate-90 ml-[-2px]"/>
               </div>
               <div className="text-[#188a42] text-[11px] flex items-center gap-1 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Free return
               </div>
            </div>

            {/* Address */}
            <div className="bg-white px-3 py-4 mb-2 relative border-b border-gray-200">
               <div className="flex items-center gap-3 pr-4">
                  <MapPin size={22} strokeWidth={1.5} className="text-gray-700 mt-1 self-start" />
                  <div className="flex-1 flex flex-col">
                     <div className="flex items-center gap-2 mb-1 text-[15px]">
                        <span className="font-bold">{user?.name || 'Guest User'}</span>
                        <span className="text-gray-700">{user?.phoneNumber || ''}</span>
                     </div>
                     <p className="text-[13px] text-gray-600 leading-snug line-clamp-1">
                        {user?.fullAddress || 'No address set in admin'}
                     </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #FF6B6B, #FF6B6B 15px, transparent 15px, transparent 25px, #4863C9 25px, #4863C9 40px, transparent 40px, transparent 50px)' }}></div>
            </div>

            {/* Ship from SHEIN */}
            <div className="bg-white mb-2 p-3">
               <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-[15px]">Ship from Warehouse ({itemsCount})</h2>
                  <ChevronRight size={18} className="text-gray-400" />
               </div>
               <div className="bg-[#FFF0F2] text-red-500 text-xs px-2 py-1.5 flex items-center gap-2 mb-3 rounded-sm font-medium">
                  We aim to deliver your order on time! <Clock size={12} className="ml-auto" /> Last Chance!
               </div>

               <div className="flex flex-col gap-3 mt-2">
                  {cart.length > 0 ? cart.map((item, index) => (
                     <div key={item.cartItemId} className="flex gap-3">
                        <div className="w-[70px] h-[90px] relative bg-gray-100 rounded-[2px] overflow-hidden flex-shrink-0">
                           <img src={item.img} className="w-full h-full object-cover" />
                           <div className="absolute bottom-0 w-full bg-[#f94e27] text-white text-[9px] text-center py-0.5 leading-tight font-bold">
                              {index === 0 ? '9 Left' : 'May Sell Out'}
                           </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                           <div>
                              <h4 className="text-[13px] text-gray-900 leading-snug font-medium line-clamp-2 pr-2">{item.title}</h4>
                              <div className="text-[11px] text-gray-500 mt-1">{item.size || 'Blue / Multicolor'}</div>
                           </div>
                           <div className="flex items-end justify-between">
                              <div className="flex items-center gap-1">
                                 <span className="text-red-500 font-bold text-[15px]">£{item.price.toFixed(2)}</span>
                                 <span className="text-gray-400 text-[11px] line-through">£{(item.originalPrice || (item.price * 1.5)).toFixed(2)}</span>
                              </div>
                              <span className="text-[13px] text-gray-600 font-medium">x{item.quantity}</span>
                           </div>
                        </div>
                     </div>
                  )) : (
                     <div className="flex gap-3">
                        <div className="w-[70px] h-[90px] relative bg-gray-100 rounded-[2px] overflow-hidden flex-shrink-0">
                           <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                           <div className="absolute bottom-0 w-full bg-[#f94e27] text-white text-[9px] text-center py-0.5 leading-tight font-bold">
                              9 Left
                           </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                           <div>
                              <h4 className="text-[13px] text-gray-900 leading-snug font-medium line-clamp-2 pr-2">Sample Product</h4>
                              <div className="text-[11px] text-gray-500 mt-1">Default Size</div>
                           </div>
                           <div className="flex items-end justify-between">
                              <div className="flex items-center gap-1">
                                 <span className="text-red-500 font-bold text-[15px]">£0.29</span>
                                 <span className="text-gray-400 text-[11px] line-through">£0.58</span>
                              </div>
                              <span className="text-[13px] text-gray-600 font-medium">x1</span>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white mb-2 p-3">
               <h2 className="font-bold text-[15px] mb-4">Shipping Method</h2>
               
               <div className="flex flex-col gap-4">
                  <div className="flex items-start" onClick={() => setSelectedShipping('standard')}>
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="font-bold text-sm text-gray-800">Standard Shipping:</span>
                           <span className="bg-[#188a42] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">Free Shipping</span>
                        </div>
                        <div className="text-gray-500 text-xs flex items-center">
                           Delivery: 6-8 working days(May 5 - May 7) <ChevronRight size={14} className="ml-1 text-gray-400" />
                        </div>
                     </div>
                     <div className="mr-1 mt-1">{selectedShipping === 'standard' ? <CheckedIcon /> : <UncheckedIcon />}</div>
                  </div>

                  <div className="flex items-start" onClick={() => setSelectedShipping('click')}>
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="font-bold text-sm text-gray-800">Click & Collect:</span>
                           <span className="bg-[#188a42] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">Free Shipping</span>
                        </div>
                        <div className="text-gray-500 text-xs flex items-center">
                           Delivery: 6-8 working days(May 5 - May 7) <ChevronRight size={14} className="ml-1 text-gray-400" />
                        </div>
                     </div>
                     <div className="mr-1 mt-1">{selectedShipping === 'click' ? <CheckedIcon /> : <UncheckedIcon />}</div>
                  </div>

                  <div className="flex items-start" onClick={() => setSelectedShipping('express')}>
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="font-bold text-sm text-gray-800">Express Shipping: <span className="text-black ml-1">£9.00</span></span>
                        </div>
                        <div className="text-gray-500 text-xs flex items-center">
                           Delivery: 5-6 working days(May 1 - May 5) <ChevronRight size={14} className="ml-1 text-gray-400" />
                        </div>
                     </div>
                     <div className="mr-1 mt-1">{selectedShipping === 'express' ? <CheckedIcon /> : <UncheckedIcon />}</div>
                  </div>
               </div>

               <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center text-sm">
                  <div className="flex items-center font-bold text-gray-800">
                     On-Time Delivery: <span className="font-normal text-gray-500 ml-1 flex items-center">5 GBP Credits if late <ChevronRight size={14} className="ml-0.5" /></span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[#188a42] font-bold">FREE</span>
                     <UncheckedIcon />
                  </div>
               </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white mb-2 p-3">
               <h2 className="font-bold text-[15px] mb-4 flex items-center">
                  Payment Method <CheckCircle size={14} className="ml-1 text-[#188a42] fill-[#188a42]/10" />
               </h2>
               
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between" onClick={() => setSelectedPayment('paypal')}>
                     <div className="flex items-center gap-2">
                        {selectedPayment === 'paypal' ? <CheckedIcon /> : <UncheckedIcon />}
                        <div className="h-6 px-3 border border-gray-200 rounded-sm flex items-center bg-gray-50/50">
                           <span className="text-[#003087] font-bold italic text-sm">Pay</span><span className="text-[#0079C1] font-bold italic text-sm">Pal</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between" onClick={() => setSelectedPayment('card')}>
                     <div className="flex items-center gap-2">
                        {selectedPayment === 'card' ? <CheckedIcon /> : <UncheckedIcon />}
                        <div className="flex gap-1 items-center bg-gray-50 px-2 py-1 rounded-sm">
                           <div className="w-8 h-5 bg-[#ff5f00] rounded-sm relative overflow-hidden flex-shrink-0">
                              <div className="absolute w-4 h-4 rounded-full bg-[#eb001b] -left-1 top-0.5 opacity-80"></div>
                              <div className="absolute w-4 h-4 rounded-full bg-[#f79e1b] -right-1 top-0.5 opacity-80"></div>
                           </div>
                           <span className="text-xs text-gray-600 font-bold ml-1">Credit/Debit Card</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Coupons & Gift Cards */}
            <div className="bg-white mb-2">
               <div className="flex justify-between items-center p-3 border-b border-gray-50">
                  <span className="text-[15px] text-gray-800 font-medium">Apply Coupon</span>
                  <div className="flex items-center gap-1">
                     <span className="text-red-500 font-bold">-£1.36</span>
                     <ChevronRight size={16} className="text-gray-400" />
                  </div>
               </div>
               <div className="flex justify-between items-center p-3 border-b border-gray-50">
                  <span className="text-[15px] text-gray-800 font-medium">Gift Card</span>
                  <ChevronRight size={16} className="text-gray-400" />
               </div>
               <div className="text-center py-2 text-xs text-gray-500 flex items-center justify-center gap-1 cursor-pointer">
                  View More <ChevronRight size={12} className="rotate-90" />
               </div>
            </div>

            {/* SHEIN Club */}
            <div className="bg-gradient-to-br from-[#fff2e8] to-[#fff] mb-2 p-3 border border-[#fce4d4]">
               <h3 className="text-[#a55220] font-bold text-xs flex items-center gap-1 mb-1">
                  <ShieldCheck size={14} className="fill-[#a55220] text-white" /> MEMBERS CLUB
               </h3>
               <p className="text-[#a55220] font-bold text-[13px] mb-2">
                  Join & Get 4 Exclusive Benefits (£75.90 Total Value){'>'}
               </p>
               <div className="bg-gradient-to-r from-[#ffe4c4] to-[#ffedd9] p-2 rounded-sm mb-3 border border-[#f5dbb9]">
                  <p className="text-[#a55220] text-[10px] font-bold mb-1">Quarterly(Max £16 credit per order🎁)</p>
                  <div className="flex items-center gap-1 mb-2">
                     <span className="bg-[#a55220] text-white text-[8px] px-0.5 rounded-sm">💰</span>
                     <span className="text-[#a55220] font-bold text-sm">2%~8% Extra Credit Rewards</span>
                     <span className="bg-red-500 text-white text-[8px] px-1 rounded-sm uppercase">Limited</span>
                  </div>
                  <p className="text-[#a55220] text-[10px] pl-4 mb-2">Claim Max. £16.00 Credit Back per order</p>
                  <div className="flex justify-between items-center text-[#a55220] font-bold text-[9px]">
                     <span className="flex items-center gap-0.5"><Gift size={10} /> 3X Free Gift(s)</span>
                     <span className="flex items-center gap-0.5"><span className="bg-[#a55220] text-white px-0.5 text-[8px]">%</span> Extra 5% off</span>
                     <span className="flex items-center gap-0.5"><Clock size={10} /> 9X Shipping Voucher(s)</span>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <UncheckedIcon />
                  <span className="text-red-500 font-bold text-[15px]">£8.99</span>
               </div>
               <p className="text-xs text-gray-400 mt-2">By continuing, you agree to <span className="text-[#4863C9]">Club Terms & Conditions</span>.</p>
            </div>

            {/* Order Summary */}
            <div className="bg-white mb-2 p-3 pb-4">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 text-sm">Retail Price: <span className="text-gray-400 ml-1">{itemsCount} Items</span></span>
                  <span className="font-bold text-gray-800 text-sm">£{(subtotal).toFixed(2)}</span>
               </div>
               
               <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 text-sm">Shipping Fee:</span>
                  <div className="flex items-center gap-1">
                     <span className="text-gray-400 line-through text-xs">£{shippingFee.toFixed(2)}</span>
                     <span className="font-bold text-[#188a42] text-sm">FREE</span>
                  </div>
               </div>
               
               <div className="flex justify-between items-center mb-3 text-red-500">
                  <span className="text-sm flex items-center gap-1">
                     <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">%</span>
                     Promotions
                  </span>
                  <div className="flex items-center text-sm">
                     {promotions.toFixed(2)} <ChevronRight size={14} className="text-gray-400 ml-1" />
                  </div>
               </div>

               <div className="flex justify-between items-center mb-4 text-red-500">
                  <span className="text-sm flex items-center gap-1">
                     <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">🎟</span>
                     Coupon(s)
                  </span>
                  <div className="flex items-center text-sm">
                     {coupons.toFixed(2)} <ChevronRight size={14} className="text-gray-400 ml-1" />
                  </div>
               </div>

               <div className="flex justify-between items-start">
                  <span className="font-bold text-gray-800 text-[15px] mt-1">Order Total:</span>
                  <div className="flex flex-col items-end">
                     <div className="flex items-baseline text-red-500">
                        <span className="text-sm font-bold">£</span>
                        <span className="text-2xl font-bold leading-none">{orderTotal.toFixed(2)}</span>
                     </div>
                     <div className="text-red-500 text-xs mt-1">
                        Saved £{saved.toFixed(2)}
                     </div>
                  </div>
               </div>
            </div>

            {/* Rewards */}
            <div className="bg-white mb-2 p-3 flex items-center justify-between">
               <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
                  <span className="w-4 h-4 bg-[#FFD700] rounded-full text-white flex items-center justify-center text-[10px]">S</span>
                  Reward <span className="text-[#a55220]">1</span> Points
                  <HelpCircle size={14} className="text-gray-400 font-normal ml-0.5" />
               </div>
            </div>

            {/* Shop Safely */}
            <div className="bg-[#F8F8F8] p-4 text-center pb-8">
               <h3 className="font-bold text-gray-800 text-[15px] mb-4 text-left">Shop Safely and Sustainably</h3>
               <div className="flex justify-between items-start mb-6 px-2">
                  <div className="flex flex-col items-center flex-1">
                     <ShieldCheck size={28} className="text-[#188a42] mb-2" strokeWidth={1.5} />
                     <span className="text-[10px] text-gray-500 leading-tight">Secure Delivery<br/>Guarantee</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                     <div className="w-7 h-7 rounded-full border-2 border-[#188a42] text-[#188a42] flex items-center justify-center mb-2 font-bold text-sm">$</div>
                     <span className="text-[10px] text-gray-500 leading-tight">Secure Your<br/>Payment</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                     <div className="w-7 h-7 rounded-sm border-2 border-[#188a42] text-[#188a42] flex items-center justify-center mb-2">
                        <div className="w-3 h-3 border-2 border-[#188a42] rounded-full -mt-2"></div>
                     </div>
                     <span className="text-[10px] text-gray-500 leading-tight">Security<br/>& Privacy</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 relative">
                     <div className="w-7 h-7 rounded-full border-2 border-[#188a42] text-[#188a42] flex items-center justify-center mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                     </div>
                     <ChevronRight size={16} className="text-gray-400 absolute right-[-5px] top-1" />
                     <span className="text-[10px] text-gray-500 leading-tight">Customer<br/>Support</span>
                  </div>
               </div>
               
               <p className="text-[11px] text-gray-400 text-left leading-relaxed">
                  By placing this order you agree to our <a href="#" className="text-[#4863C9]">Terms and Conditions</a>, 
                  and acknowledge that you have read our <a href="#" className="text-[#4863C9]">Privacy Policy</a>.
               </p>
            </div>
          </div>

          {/* Floating Coupon Overlay */}
          {showCouponOverlay && (
             <div className="fixed bottom-[80px] right-2 left-2 z-50 flex justify-end pointer-events-none">
                <div className="bg-[#333] text-white rounded-md flex items-stretch shadow-xl overflow-hidden pointer-events-auto h-[44px]">
                   <div className="bg-[#FFE4E8] text-red-500 flex flex-col items-center justify-center px-4 relative">
                      <span className="font-black text-lg leading-none">50%</span>
                      <span className="text-[10px] font-bold">OFF</span>
                      {/* Ticket jagged edge simulation */}
                      <div className="absolute right-0 top-0 bottom-0 w-1 flex flex-col justify-between py-1">
                         <div className="w-1.5 h-1.5 bg-[#333] rounded-full -mr-1"></div>
                         <div className="w-1.5 h-1.5 bg-[#333] rounded-full -mr-1"></div>
                         <div className="w-1.5 h-1.5 bg-[#333] rounded-full -mr-1"></div>
                         <div className="w-1.5 h-1.5 bg-[#333] rounded-full -mr-1"></div>
                      </div>
                   </div>
                   <div className="flex items-center px-4 font-bold text-[13px] gap-2">
                      Coupon expires soon!
                      <button onClick={() => setShowCouponOverlay(false)} className="bg-white/20 text-white rounded-full p-0.5 ml-2">
                         <X size={12} />
                      </button>
                   </div>
                </div>
             </div>
          )}

          {/* Fixed Footer */}
          <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 flex items-center justify-between px-3 h-[70px]">
             
             {/* Left Stats */}
             <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                   <span className="text-red-500 font-bold text-[20px] leading-none">£{orderTotal.toFixed(2)}</span>
                   <span className="text-gray-400 text-[11px] line-through">£6.26</span>
                   <ChevronRight size={14} className="-rotate-90 text-gray-500 p-0" />
                </div>
                <div className="text-red-500 text-[11px] flex items-center gap-0.5 mt-1 font-medium">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                   Saved £{saved.toFixed(2)}
                </div>
             </div>

             {/* Order Button */}
             <button 
                onClick={handlePlaceOrder}
                className="w-[200px] h-12 rounded-sm font-bold flex bg-black text-white relative shadow-md"
             >
                {/* Absolute tag on right top */}
                <div className="absolute -top-3 -right-2 bg-gradient-to-b from-[#188a42] to-[#126b33] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold flex items-center gap-1 z-10">
                   <span className="text-[10px]">🚚</span> Free Shipping
                </div>

                <div className="flex flex-col items-center justify-center w-full mt-1">
                   <span className="text-[15px] font-bold">Order and Pay</span>
                   <span className="text-[#FFD700] text-[10px] mt-0.5 flex items-center font-medium opacity-90 delay">
                      <span className="text-[9px] mr-1">⏳</span> {itemsCount} Item(s) 9 left
                   </span>
                </div>
             </button>
          </div>
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout setScreen={setScreen}>
          <div className="text-center mt-12 bg-white p-12 border border-gray-200 shadow-sm max-w-lg mx-auto rounded-sm">
             <h2 className="text-2xl font-bold mb-4">Checkout Simulated</h2>
             <p className="text-gray-600 mb-6">Please use the mobile view (responsive frame) to see the exact UI replica of the checkout flow.</p>
             <button 
                onClick={handlePlaceOrder}
                disabled={!user || cart.length === 0}
                className={`w-full h-12 rounded-sm font-bold flex items-center justify-center text-white ${!user || cart.length === 0 ? 'bg-gray-300' : 'bg-black'}`}
             >
                FORCE PLACE ORDER (DESKTOP)
             </button>
          </div>
        </DesktopLayout>
      </div>
    </>
  );
};

