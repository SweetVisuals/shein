import React, { useState, useEffect } from 'react';
import { ChevronLeft, Archive, Trash2, Mail, MoreHorizontal, Star, ThumbsUp, ThumbsDown, CornerUpLeft, Reply, Forward, Truck, Smile } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabase';

export const EmailConfirmationScreen = ({ setScreen, goBack }: { setScreen: (s: string) => void, goBack: () => void }) => {
  const { selectedOrderId } = useAppContext();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedOrderId) {
      fetchOrder();
    }
  }, [selectedOrderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), users(first_name, last_name, email)')
        .eq('id', selectedOrderId)
        .single();
      
      if (error) throw error;
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order for email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="bg-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return <div className="bg-white min-h-screen flex items-center justify-center">Order not found</div>;
  }

  // Calculate expected date (just add 14 days to created_at for demo)
  const createdDate = new Date(order.created_at);
  const expectedDate = new Date(createdDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  const formattedExpectedDate = `${expectedDate.toLocaleDateString('en-GB', { weekday: 'short' })}, ${expectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  const formattedSentDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const firstProduct = order.order_items?.[0]?.products;
  const itemCount = order.order_items?.length || 0;
  const customerName = order.users?.first_name ? `${order.users.first_name} ${order.users.last_name || ''}`.trim() : 'Customer';

  return (
    <div className="bg-[#f2f6fa] min-h-screen flex flex-col" style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif' }}>
      {/* Top App Bar matching Gmail */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setScreen('HOME')}>
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        </div>
        <div className="flex items-center gap-6 text-gray-600">
          <Archive size={20} />
          <Trash2 size={20} />
          <Mail size={20} />
          <MoreHorizontal size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 bg-white">
        {/* Email Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-[22px] text-gray-900 leading-tight pr-4">Ordered: ‘{firstProduct?.title?.substring(0, 25) || 'Items from SHEIN'}...’ <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-sm ml-2 align-middle">Inbox</span></h1>
            <Star size={22} className="text-gray-400 flex-shrink-0 mt-1" />
          </div>

          {/* Smart Card Header */}
          <div className="bg-[#f0f4f9] rounded-2xl p-4 mb-6">
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2">
                  {firstProduct?.title || 'Items from SHEIN'}
                </div>
                <div className="text-gray-500 text-sm mt-1">{itemCount} items from SHEIN</div>
              </div>
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                <img src={firstProduct?.main_image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="mb-5 mt-2">
              <div className="text-[34px] text-gray-900 font-normal leading-tight">Expected by</div>
              <div className="text-[34px] text-gray-900 font-normal leading-tight">{formattedExpectedDate}</div>
            </div>

            <div className="flex items-center gap-3 text-[14px] text-gray-700 mb-5">
              <Truck size={18} className="text-gray-700" />
              <span>Order placed • Estimate from SHEIN</span>
            </div>

            <div className="flex gap-4 mb-5">
              <div>
                <div className="text-[11px] font-bold text-gray-900 flex items-center gap-1">
                  <span className="text-gray-500 font-normal">#</span> Order number
                </div>
                <div className="text-[15px] text-gray-600 font-medium">GSO{order.order_number}</div>
              </div>
            </div>

            <div className="flex mt-2">
              <button className="w-full bg-[#005e9e] text-white py-[16px] rounded-full text-[16px] font-medium">
                View order
              </button>
            </div>
          </div>

          {/* AI Summary Feedback */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
            <span>Based on 2 emails <ChevronLeft size={12} className="inline rotate-[-90deg]" /></span>
            <div className="flex items-center gap-3">
              <span>Correct?</span>
              <ThumbsUp size={16} />
              <ThumbsDown size={16} />
            </div>
          </div>

          {/* Sender Details */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
                SHEIN
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] text-gray-900">SHEIN</span>
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">{formattedSentDate}</span>
                </div>
                <div className="text-[13px] text-gray-500 flex items-center gap-1 mt-0.5">
                  to me <ChevronLeft size={14} className="inline rotate-[-90deg]" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 text-gray-500">
              <CornerUpLeft size={20} />
              <MoreHorizontal size={20} />
            </div>
          </div>
        </div>

        {/* Email Body - SHEIN Content */}
        <div className="px-6 text-center pb-8 mt-4">
          <div className="text-[44px] font-black tracking-[0.2em] uppercase mb-6">SHEIN</div>
          <div className="w-4 h-[2px] bg-black mx-auto mb-12"></div>

          <h2 className="text-[38px] font-black text-black leading-tight mb-8">Dear {customerName},</h2>
          
          <p className="text-[18px] text-gray-900 mb-10 leading-relaxed px-2 font-medium">
            Thank you for your order! We hope you enjoyed shopping with us.
          </p>

          <button className="bg-[#f28e7c] text-white text-[22px] font-bold px-8 py-4 w-full max-w-[320px] mx-auto rounded-sm mb-16 shadow-sm">
            Order information
          </button>

          <div className="text-left max-w-[300px] mx-auto space-y-8">
            <div>
              <div className="text-[18px] font-bold text-black mb-2">Order number:</div>
              <div className="text-[16px] text-gray-800">GSO{order.order_number}</div>
            </div>
            
            <div>
              <div className="text-[18px] font-bold text-black mb-2">Total Amount:</div>
              <div className="text-[16px] text-gray-800">£{order.total_amount}</div>
            </div>
          </div>

          <div className="mt-16 mb-8 border-t border-gray-300 mx-6"></div>

          <div className="text-center">
            <h3 className="text-[22px] font-bold border-b-2 border-black inline-block pb-1 mb-6 tracking-wide">Track Order Details</h3>
            <p className="text-[14px] text-gray-800 mb-12">
              Please log in your <span className="bg-[#fff1c7] px-1 text-[#e1a500]">SHEIN</span> account for more product and/or seller information.
            </p>
            
            <div className="bg-black text-white inline-block px-6 py-2 font-bold text-[18px] mb-8">
              We are here to help
            </div>

            <div className="space-y-6 text-left max-w-sm mx-auto">
              <div className="flex justify-between items-center text-[16px] font-bold text-gray-600 border-b border-gray-200 pb-4">
                Where is my order? <span className="text-xl">&gt;</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold text-gray-600 border-b border-gray-200 pb-4">
                Can I change or modify my order? <span className="text-xl">&gt;</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold text-gray-600 border-b border-gray-200 pb-4">
                Can I cancel my order? <span className="text-xl">&gt;</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold text-gray-600 border-b border-gray-200 pb-4">
                Why I didn't get an email about my order being shipped? <span className="text-xl">&gt;</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold text-gray-600">
                How to change or modify billing address? <span className="text-xl">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gmail Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-3 sticky bottom-0 z-50">
        <button className="flex-1 border border-gray-300 rounded-full py-2.5 flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
          <CornerUpLeft size={18} /> Reply
        </button>
        <button className="flex-1 border border-gray-300 rounded-full py-2.5 flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
          <Forward size={18} /> Forward
        </button>
        <button className="w-[46px] h-[46px] border border-gray-300 rounded-full flex justify-center items-center flex-shrink-0 text-gray-500">
          <Smile size={20} />
        </button>
      </div>
    </div>
  );
};
