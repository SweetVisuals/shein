import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Tag, Hash, Save, LayoutDashboard, Trash2, List, X, Archive, Mail, MoreHorizontal, ChevronLeft, Star, Truck, ChevronDown, ThumbsUp, ThumbsDown, Check, Smile, Reply, Forward } from 'lucide-react';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabase';
import { useEffect } from 'react';

export const AdminScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { products, addProduct, deleteProduct, updateProduct, cart, refetchProducts } = useAppContext();
  const [view, setView] = useState<'LIST' | 'CREATE' | 'INVOICE'>('INVOICE');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  
  // Quick Edit Modal
  const [editModalProduct, setEditModalProduct] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImg, setEditImg] = useState('');

  // Create form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [seller, setSeller] = useState('');
  const [category, setCategory] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [latestOrder, setLatestOrder] = useState<any>(null);

  useEffect(() => {
    if (view === 'INVOICE') {
      fetchLatestOrder();
    }
  }, [view]);

  const fetchLatestOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), users(name, email)')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      setLatestOrder(data);
    } catch (err) {
      console.error('Error fetching latest order:', err);
    }
  };

  const openEditModal = (p: any) => {
     setEditModalProduct(p);
     setEditTitle(p.title);
     setEditImg(p.img);
  };

  const saveEdit = () => {
     if (editModalProduct) {
        updateProduct(editModalProduct.id, { title: editTitle, img: editImg });
        setEditModalProduct(null);
     }
  };

  const handleSaveCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;

    try {
      // 1. Ensure seller exists or use default
      let sellerId = '75d86237-7726-47b2-990a-113543d8108a'; // Default SHEIN seller from seed
      
      // 2. Insert product
      const { data: product, error: prodError } = await supabase
        .from('products')
        .insert([{
          title,
          base_price: parseFloat(price),
          main_image: imageUrl,
          seller_id: sellerId,
          description: 'New Arrival'
        }])
        .select()
        .single();

      if (prodError) throw prodError;

      if (refetchProducts) await refetchProducts();

      setSavedMessage('Product created successfully in Supabase!');
      setTimeout(() => {
        setSavedMessage('');
        setView('LIST');
      }, 1500);
      setTitle('');
      setPrice('');
      setImageUrl('');
      setSeller('');
      setCategory('');
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Failed to save product to database.');
    }
  };

  const AdminContent = () => (
    <div className="max-w-6xl mx-auto py-4 lg:py-8 px-2 sm:px-4 lg:px-8 relative min-h-screen">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <LayoutDashboard size={24} className="text-gray-800 lg:w-8 lg:h-8" />
          <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <button onClick={() => setScreen('HOME')} className="text-gray-500 hover:text-black font-semibold text-xs lg:text-sm">
          Exit Admin
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4 lg:mb-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setView('LIST')} 
            className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'LIST' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
          >
            <List size={16} /> Products List
          </button>
          <button 
            onClick={() => setView('CREATE')} 
            className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'CREATE' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
          >
            <Plus size={16} /> Add Product
          </button>
          <button 
            onClick={() => setView('INVOICE')} 
            className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'INVOICE' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
          >
            <List size={16} /> View Invoice
          </button>
      </div>

      {view === 'LIST' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-2 lg:px-6 py-2 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-sm lg:text-lg font-bold text-gray-900">All Products</h2>
              <span className="text-xs lg:text-sm text-gray-500">{products.length} products total</span>
          </div>
          {products.length === 0 ? (
              <div className="p-8 lg:p-12 text-center text-sm lg:text-base text-gray-500">
                No products available. Switch to "Add Product" to create one.
              </div>
          ) : (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-2 lg:p-6 bg-gray-50">
                {products.map((p) => (
                  <div key={p.id} onClick={() => openEditModal(p)} className="bg-white rounded-sm border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="aspect-[3/4] relative bg-gray-100">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-1 lg:p-2 flex-grow flex flex-col justify-start">
                        <div className="text-[9px] lg:text-xs font-bold text-gray-900 line-clamp-2 leading-tight" title={p.title}>{p.title}</div>
                      </div>
                  </div>
                ))}
              </div>
          )}
        </div>
      )}

      {view === 'CREATE' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm lg:text-lg font-bold text-gray-900">Create New Product Card</h2>
          </div>
          
          <div className="p-4 lg:p-6">
            {savedMessage && (
              <div className="mb-4 lg:mb-6 bg-green-50 text-green-700 p-3 lg:p-4 rounded-md text-xs lg:text-sm border border-green-200 flex items-center gap-2">
                <span className="font-bold">✓</span> {savedMessage}
              </div>
            )}

            <form onSubmit={handleSaveCreate} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 gap-y-4 lg:gap-y-6 gap-x-4 lg:gap-x-6 sm:grid-cols-2">
                
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-xs lg:text-sm font-bold text-gray-700">Product Title</label>
                  <div className="mt-1 relative rounded-sm shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-2 lg:pl-3 flex items-center pointer-events-none">
                      <Tag size={14} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full pl-8 lg:pl-10 pr-3 py-2 border border-gray-300 rounded-sm text-xs lg:text-sm focus:ring-black focus:border-black"
                      placeholder="e.g., Casual Striped T-Shirt"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-xs lg:text-sm font-bold text-gray-700">Price (£)</label>
                  <div className="mt-1 relative rounded-sm shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-2 lg:pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-xs lg:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.01"
                      className="block w-full pl-6 lg:pl-8 pr-3 py-2 border border-gray-300 rounded-sm text-xs lg:text-sm focus:ring-black focus:border-black"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="seller" className="block text-xs lg:text-sm font-bold text-gray-700">Seller / Brand Name</label>
                  <div className="mt-1 relative rounded-sm shadow-sm">
                    <input
                      type="text"
                      id="seller"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-xs lg:text-sm focus:ring-black focus:border-black"
                      placeholder="e.g., SHEIN MOD"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-xs lg:text-sm font-bold text-gray-700">Category</label>
                  <div className="mt-1 relative rounded-sm shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-2 lg:pl-3 flex items-center pointer-events-none">
                      <Hash size={14} className="text-gray-400" />
                    </div>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full pl-8 lg:pl-10 pr-3 py-2 border border-gray-300 rounded-sm text-xs lg:text-sm focus:ring-black focus:border-black"
                      required
                    >
                      <option value="" disabled>Select category</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="home">Home & Living</option>
                      <option value="electronics">Electronics</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="imageUrl" className="block text-xs lg:text-sm font-bold text-gray-700">Asset Image URL</label>
                  <div className="mt-1 flex rounded-sm shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-2 lg:pl-3 flex items-center pointer-events-none">
                        <ImageIcon size={14} className="text-gray-400" />
                      </div>
                      <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="block w-full pl-8 lg:pl-10 pr-3 py-2 border border-gray-300 rounded-none rounded-l-sm text-xs lg:text-sm focus:ring-black focus:border-black"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop')}
                      className="-ml-px relative inline-flex items-center space-x-2 px-3 lg:px-4 py-2 border border-gray-300 text-xs lg:text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-r-sm"
                    >
                      <span>Test Image</span>
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-4 lg:mt-6 border-t border-gray-100 pt-4 lg:pt-6">
                  <p className="block text-xs lg:text-sm font-bold text-gray-700 mb-2 lg:mb-3">Asset Preview / Card Generation Check</p>
                  <div className="w-[100px] lg:w-[120px] h-[133px] lg:h-[160px] border border-gray-200 rounded-sm overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=Invalid+Image';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 lg:pt-6 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-sm font-bold text-xs lg:text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <Save size={16} />
                  Save Asset & Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {view === 'INVOICE' && (
        <div className="bg-[#fff] md:bg-[#f0f2f5] lg:min-h-screen font-sans flex flex-col pt-0 sm:pt-4 sm:px-4 items-center w-full">
            <div className="bg-white w-[400px] max-w-full overflow-hidden flex flex-col relative pb-20 shadow-sm sm:border border-gray-200">
               {/* Gmail Title Bar Component */}
               <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10 w-full">
                  <div className="flex items-center gap-4">
                     <ChevronLeft size={24} className="text-gray-700 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-5 text-gray-700">
                     <Archive size={20} className="cursor-pointer font-light" strokeWidth={1.5} />
                     <Trash2 size={20} className="cursor-pointer" strokeWidth={1.5} />
                     <Mail size={20} className="cursor-pointer" strokeWidth={1.5} />
                     <MoreHorizontal size={20} className="cursor-pointer" strokeWidth={1.5} />
                  </div>
               </div>

               <div className="flex items-center justify-between pl-4 pr-3 py-3">
                  <div className="flex items-center gap-2">
                     <h1 className="text-[22px] text-black">Order Confirmation</h1>
                     <span className="bg-[#f0f2f5] text-gray-700 text-[11px] px-1.5 py-0.5 rounded-[4px] font-medium tracking-tight">Inbox</span>
                  </div>
                  <Star size={22} className="text-gray-400" strokeWidth={1.5} />
               </div>

               {/* Gmail Native Smart Summary Card block */}
               <div className="mx-4 mb-4 bg-[#f4f7fc] rounded-[24px] p-5 flex flex-col relative">
                  <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 pr-4">
                          <h2 className="text-[14px] font-bold text-black leading-snug line-clamp-2">
                              {products[0]?.title || '1pc Mini Portable Heat Sealer Machine, 2x AA Battery Powered Plastic Bag Se...'}
                          </h2>
                          <div className="text-[13px] text-gray-600 mt-1">{cart?.length || 4} items from SHEIN</div>
                      </div>
                      <div className="w-[52px] h-[52px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white">
                          <img src={products[0]?.img || "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73"} className="w-full h-full object-cover" />
                      </div>
                  </div>

                  <div className="mb-6">
                      <div className="text-[34px] font-normal leading-[1.1] text-[#1f1f1f] tracking-tight">Expected by<br/>Tue 21 Jan</div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[14px] text-black mb-6">
                      <Truck size={20} className="text-gray-600" strokeWidth={1.5} />
                      <span>Dispatched · Estimate from SHEIN</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex gap-2.5 relative">
                          <Hash size={20} className="text-gray-800 absolute top-0 -left-1 opacity-80" strokeWidth={1.5} />
                          <div className="pl-6">
                              <div className="text-[13px] font-bold text-black">Order number</div>
                              <div className="text-[13px] text-gray-600">GSO10K49500151G</div>
                          </div>
                      </div>
                      <div className="flex gap-2">
                          <div>
                              <div className="text-[13px] font-bold text-black">Tracking number</div>
                              <div className="text-[13px] text-gray-600">OJ534343034GB</div>
                          </div>
                      </div>
                  </div>

                  <div className="flex gap-2">
                      <button className="bg-[#0b57d0] text-white px-5 py-2.5 rounded-full text-[14px] font-medium">Track parcel</button>
                      <button className="bg-[#c2e7ff] text-[#001d35] px-5 py-2.5 rounded-full text-[14px] font-medium">View order</button>
                  </div>
               </div>

               {/* Was this correct pill + sender section */}
               <div className="px-4 flex items-center justify-between mt-1 mb-5">
                   <div className="text-[12px] text-gray-500 flex items-center gap-1 cursor-pointer">Based on 2 emails <ChevronDown size={14}/></div>
                   <div className="flex items-center gap-1 text-[12px] text-gray-500">
                       Correct? 
                       <ThumbsUp size={16} className="ml-2 cursor-pointer" strokeWidth={1.5} />
                       <ThumbsDown size={16} className="ml-2 cursor-pointer" strokeWidth={1.5} />
                   </div>
               </div>

               {/* Email Sender Header */}
               <div className="px-4 flex items-start gap-3 mb-6 w-full">
                   <div className="w-[42px] h-[42px] rounded-full bg-black text-white flex items-center justify-center font-bold text-[11px] tracking-widest flex-shrink-0">
                       SHEIN
                   </div>
                   <div className="flex flex-col flex-1 mt-0.5">
                       <div className="flex items-center mb-0.5">
                           <span className="text-[15px] text-black">SHEIN</span>
                           <div className="w-3.5 h-3.5 bg-[#1b6df9] rounded-full flex items-center justify-center relative flex-shrink-0 ml-1.5"><Check size={8} className="text-white" strokeWidth={4} /></div>
                           <span className="text-[12px] text-gray-500 ml-2 mt-0.5">7 Jan 2025</span>
                       </div>
                       <div className="text-[12px] text-gray-500 flex items-center gap-1">to me <ChevronDown size={12} className="mt-0.5 relative top-[-1px]" /></div>
                   </div>
                   <div className="flex items-center gap-4 text-gray-500 mt-1 border border-transparent">
                       <Smile size={20} className="cursor-pointer" strokeWidth={1.5} />
                       <Reply size={20} className="scale-x-[-1] cursor-pointer" strokeWidth={1.5} />
                       <MoreHorizontal size={20} className="cursor-pointer" strokeWidth={1.5} />
                   </div>
               </div>

               {/* Actual Email Content matching SHEIN mail design */}
               <div className="px-5 w-full">
                   <div className="flex justify-center mb-6 pt-4">
                       <h2 className="text-[34px] font-black tracking-[0.1em] uppercase text-black">SHEIN</h2>
                   </div>

                   <div className="text-center mb-6 text-black text-[12px] font-light">-</div>

                   <h3 className="text-[34px] font-bold text-black mb-6 mt-4 leading-tight tracking-tight">Dear {latestOrder?.users?.name || 'Customer'},</h3>

                   <p className="text-[17px] text-black leading-relaxed mb-6 font-normal">
                      Thank you for your order! We hope you enjoyed shopping with us.
                   </p>

                   <div className="flex justify-start mb-14 mt-10">
                       <button className="bg-[#f09581] text-white text-[22px] font-bold px-8 py-3.5 w-full max-w-[300px]">
                          Order information
                       </button>
                   </div>

                   <div className="flex flex-col gap-10 mb-12">
                       <div>
                           <div className="text-[19px] font-bold text-black mb-3">Order number:</div>
                           <div className="text-[17px] font-normal text-black">{latestOrder?.order_number || 'GSO10K49500151G'}</div>
                       </div>
                       
                       <div>
                           <div className="text-[19px] font-bold text-black mb-3">Total Amount:</div>
                           <div className="text-[17px] font-normal text-black">£{latestOrder?.total_amount || '0.00'}</div>
                       </div>

                       <div>
                           <div className="text-[19px] font-bold text-black mb-3">Payment Date:</div>
                           <div className="text-[17px] font-normal text-black">{latestOrder?.created_at ? new Date(latestOrder.created_at).toLocaleDateString() : '-'}</div>
                       </div>
                   </div>

                   <p className="text-[16px] font-normal leading-relaxed text-black mb-10 pt-2">
                      Logistics tracking will be available on<br/>"TRACK-My orders" in <span className="bg-[#fcf1a1] px-1 font-bold">SHEIN</span> App.<br/>
                      Thank you for your understanding.
                   </p>

                   <div className="relative mt-12 w-full">
                       <div className="bg-black text-white px-3 py-2 w-fit absolute -top-5 left-0 z-10 border-[1px] border-black">
                           <span className="font-bold text-[19px]">Order Summary:</span>
                       </div>
                       
                       {/* Table borders for summary */}
                       <div className="border border-gray-200 border-b-0 pt-12 px-5 pb-8">
                           {latestOrder?.order_items?.map((item: any) => (
                             <div key={item.id} className="mb-8 last:mb-0">
                                <div className="w-[120px] h-[120px] mb-5">
                                    <img src={item.products?.main_image} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="text-[#a1a1aa] text-[15px] leading-relaxed mb-6 font-normal">
                                    {item.products?.title}
                                </div>
                                
                                <div className="flex flex-col gap-3 font-bold text-[15px] text-black tracking-tight">
                                    <div>QTY: {item.quantity}</div>
                                    <div>PRICE: £{item.unit_price}</div>
                                </div>
                             </div>
                           ))}
                       </div>
                       <div className="border-t border-gray-200"></div>
                   </div>
               </div>

               {/* Bottom Gmail action buttons */}
               <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex gap-2 p-3 justify-center items-center pb-5 pt-3 mx-auto left-0 right-0 z-50">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-full h-[42px] text-[15px] font-medium text-gray-700 ml-2 cursor-pointer">
                        <Reply size={20} className="scale-x-[-1] text-gray-700" strokeWidth={1.5} /> <span className="mt-[1px]">Reply</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-full h-[42px] text-[15px] font-medium text-gray-700 cursor-pointer">
                        <Forward size={20} className="scale-x-[-1] text-gray-700" strokeWidth={1.5} /> <span className="mt-[1px]">Forward</span>
                    </button>
                    <button className="w-[42px] h-[42px] rounded-full border border-gray-300 flex items-center justify-center text-gray-600 mr-2 flex-shrink-0 cursor-pointer">
                        <Smile size={20} strokeWidth={1.5} />
                    </button>
               </div>
            </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalProduct && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="bg-white w-full max-w-sm rounded-sm shadow-xl overflow-hidden flex flex-col">
               <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm">Quick Edit Product</h3>
                  <button onClick={() => setEditModalProduct(null)} className="text-gray-500 hover:text-black">
                     <X size={20} />
                  </button>
               </div>
               <div className="p-4 flex-grow overflow-y-auto">
                  <div className="mb-4">
                     <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                     <input 
                        type="text" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black"
                     />
                  </div>
                  <div className="mb-4">
                     <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                     <textarea 
                        value={editImg}
                        onChange={(e) => setEditImg(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black h-20 resize-none"
                     />
                  </div>
                  <div className="flex gap-4">
                     <div className="w-[80px] h-[106px] bg-gray-100 flex-shrink-0 border border-gray-200 rounded-sm overflow-hidden">
                        <img src={editImg} alt="Preview" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col justify-end gap-2 flex-grow">
                        <button onClick={() => { deleteProduct(editModalProduct.id); setEditModalProduct(null); }} className="w-full py-2 bg-red-100 text-red-700 text-xs font-bold rounded-sm hover:bg-red-200 transition-colors">
                           Delete Product
                        </button>
                        <button onClick={saveEdit} className="w-full py-2 bg-black text-white text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors">
                           Save Changes
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout setScreen={setScreen} hideNav>
           <AdminContent />
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout setScreen={setScreen}>
           <AdminContent />
        </DesktopLayout>
      </div>
    </>
  );
};
