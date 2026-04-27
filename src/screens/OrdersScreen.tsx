import React, { useState, useEffect } from 'react';
import { ChevronLeft, Package } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabase';

export const OrdersScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Processing');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), shipments(*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'SHIPPED' })
        .eq('id', orderId);
      
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      console.error('Error confirming order:', err);
      alert('Failed to confirm order');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Unpaid') return order.status === 'UNPAID';
    if (activeTab === 'Processing') return order.status === 'PROCESSING' || order.status === 'PAID';
    if (activeTab === 'Shipped') return order.status === 'SHIPPED';
    if (activeTab === 'Review') return order.status === 'REVIEW' || order.status === 'DELIVERED';
    if (activeTab === 'Returns') return order.status === 'RETURNED';
    return true;
  });


  return (
    <div className="block lg:hidden">
      <MobileLayout hideNav>
        <div className="bg-[#f5f5f5] min-h-screen">
          {/* Header */}
          <div className="bg-white px-3 py-3 sticky top-0 z-50 flex items-center border-b border-gray-100">
             <button onClick={() => setScreen('PROFILE')}><ChevronLeft size={28} className="text-black" /></button>
             <div className="flex-1 text-center font-bold text-lg">My Orders</div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white flex justify-between px-4 py-3 text-sm border-b border-gray-100 sticky top-[53px] z-40 shadow-sm">
             {['Unpaid', 'Processing', 'Shipped', 'Review', 'Returns'].map(tab => (
               <div 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`whitespace-nowrap cursor-pointer ${activeTab === tab ? 'text-black font-bold border-b-2 border-black pb-2 -mb-3' : 'text-gray-500'}`}
               >
                 {tab}
               </div>
             ))}
          </div>

          <div className="p-3">
             {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-md p-3 mb-3 shadow-sm border-none">
                   <div className="flex justify-between items-center mb-3 text-sm pb-3 border-b border-gray-50">
                      <div className="text-gray-500 font-bold">Order NO. {order.order_number}</div>
                      <div className="text-red-500 font-bold uppercase text-[12px] bg-red-50 px-2 py-0.5 rounded-sm">{order.status}</div>
                   </div>

                   <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex-shrink-0 w-[72px] h-[96px] bg-gray-50 rounded-sm overflow-hidden relative">
                           <img 
                              src={item.products?.main_image} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.getAttribute('data-tried-fallback')) {
                                  target.setAttribute('data-tried-fallback', 'true');
                                  target.src = 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=200&auto=format&fit=crop';
                                }
                              }}
                            />
                        </div>
                      ))}
                   </div>

                   <div className="bg-[#fcfcfc] p-3 mt-3 rounded-sm border border-gray-50">
                      <div className="text-[11px] text-gray-400 uppercase font-bold mb-2">Recipient Details</div>
                      <div className="text-[13px] font-bold text-gray-800">{order.shipping_address_json?.full_name}</div>
                      <div className="text-[12px] text-gray-500 leading-snug">
                         {order.shipping_address_json?.address}<br/>
                         {order.shipping_address_json?.postal_code}
                      </div>
                   </div>

                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                      <div className="text-gray-800 text-sm">
                         Total: <span className="font-bold">£{parseFloat(order.total_amount).toFixed(2)}</span> ({order.order_items.length} items)
                      </div>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => setScreen('TRACKING')} 
                            className="border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-700"
                          >
                            Track
                          </button>
                          {order.status === 'PROCESSING' && (
                            <button 
                              onClick={() => handleConfirmOrder(order.id)}
                              className="border border-black bg-black rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                            >
                              Confirm
                            </button>
                          )}
                       </div>
                    </div>
                </div>
             )) : (
               <div className="text-center py-20">
                 <Package size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 text-sm">No orders found</p>
               </div>
             )}

             <div className="text-center text-gray-400 text-xs mt-6 pb-6">No more orders</div>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};
