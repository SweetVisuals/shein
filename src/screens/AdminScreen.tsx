import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Tag, Hash, Save, LayoutDashboard, Trash2, List, X, Archive, Mail, MoreHorizontal, ChevronLeft, Star, Truck, ChevronDown, ThumbsUp, ThumbsDown, Check, Smile, Reply, Forward, User } from 'lucide-react';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabase';
import { useEffect } from 'react';

export const AdminScreen = ({ setScreen, goBack }: { setScreen: (s: string) => void, goBack: () => void }) => {
  const { 
    products, addProduct, deleteProduct, updateProduct, 
    categories, updateCategory, 
    homepageSections, updateHomepageSection,
    user, updateUser,
    heroTabs, updateHeroTab,
    setSelectedOrderId,
    sellers, addSeller, updateSeller, deleteSeller
  } = useAppContext();
  
  const [view, setView] = useState<'LIST' | 'CREATE' | 'INVOICE' | 'CATEGORIES' | 'HOMEPAGE' | 'PROFILE' | 'HEROTABS' | 'EMAILS' | 'SELLERS'>('HOMEPAGE');
  const [allOrders, setAllOrders] = useState<any[]>([]);
  
  // Homepage Management State
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [sectionItems, setSectionItems] = useState<any[]>([]);

  // Profile Management State
  const [profName, setProfName] = useState(user?.name || '');
  const [profEmail, setProfEmail] = useState(user?.email || '');
  const [profBalance, setProfBalance] = useState(user?.walletBalance || 0);
  const [profCartDiscount, setProfCartDiscount] = useState(user?.cartDisplayDiscount || '-£43.04');
  const [profDiscountsCount, setProfDiscountsCount] = useState(user?.discountsCount || 0);
  const [profAddress, setProfAddress] = useState(user?.fullAddress || '');
  const [profPhone, setProfPhone] = useState(user?.phoneNumber || '');

  // Create Product form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [category, setCategory] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  // Seller Form State
  const [sellerName, setSellerName] = useState('');
  const [sellerRating, setSellerRating] = useState('4.8');
  const [editingSeller, setEditingSeller] = useState<any | null>(null);

  // Edit Modal State
  const [editModalProduct, setEditModalProduct] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImg, setEditImg] = useState('');

  // Category Edit state
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [catImg, setCatImg] = useState('');

  // Hero Tab Edit State
  const [editingHeroTab, setEditingHeroTab] = useState<any | null>(null);
  const [htTitle, setHtTitle] = useState('');
  const [htImg, setHtImg] = useState('');

  // Invoice state
  const [latestOrder, setLatestOrder] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setProfName(user.name || '');
      setProfEmail(user.email || '');
      setProfBalance(user.walletBalance || 0);
      setProfCartDiscount(user.cartDisplayDiscount || '-£43.04');
      setProfDiscountsCount(user.discountsCount || 0);
      setProfAddress(user.fullAddress || '');
      setProfPhone(user.phoneNumber || '');
    }
  }, [user]);

  useEffect(() => {
    if (view === 'INVOICE') {
      fetchLatestOrder();
    }
  }, [view]);

  const fetchLatestOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), users(first_name, last_name, email)')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      setLatestOrder(data);
    } catch (err) {
      console.error('Error fetching latest order:', err);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), users(first_name, last_name, email)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAllOrders(data || []);
    } catch (err) {
      console.error('Error fetching all orders:', err);
    }
  };

  useEffect(() => {
    if (view === 'EMAILS') {
      fetchAllOrders();
    }
  }, [view]);

  const handleSaveCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;

    try {
      await addProduct({
        title,
        price: parseFloat(price),
        img: imageUrl,
        seller_id: sellerId
      });

      setSavedMessage('Product created successfully!');
      setTimeout(() => {
        setSavedMessage('');
        setView('LIST');
      }, 1500);
      setTitle('');
      setPrice('');
      setImageUrl('');
      setSellerId('');
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  const saveCategoryEdit = async () => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, { image_url: catImg });
      setEditingCategory(null);
      alert('Category updated successfully!');
    }
  };

  const saveHeroTabEdit = async () => {
    if (editingHeroTab) {
      await updateHeroTab(editingHeroTab.id, { title: htTitle, image_url: htImg });
      setEditingHeroTab(null);
      alert('Hero tab updated successfully!');
    }
  };

  const openEditModal = (p: any) => {
     setEditModalProduct(p);
     setEditTitle(p.title);
     setEditImg(p.img);
  };

   const saveEdit = async () => {
      if (editModalProduct) {
         await updateProduct(editModalProduct.id, { 
           title: editTitle, 
           img: editImg,
           seller_id: sellerId || editModalProduct.seller_id 
         });
         setEditModalProduct(null);
         alert('Product updated successfully!');
      }
   };

  const saveProfile = async () => {
    if (user) {
      const names = profName.split(' ');
      await updateUser(user.id, { 
        first_name: names[0] || '', 
        last_name: names.slice(1).join(' ') || '',
        email: profEmail,
        wallet_balance: profBalance,
        cart_display_discount: profCartDiscount,
        discounts_count: profDiscountsCount,
        full_address: profAddress,
        phone_number: profPhone
      });
      alert('Profile updated!');
    }
  };

  const openSectionEdit = (section: any) => {
    setEditingSection(section);
    setSectionItems(section.items ? [...section.items] : []);
  };

  const saveSection = async () => {
    if (editingSection) {
      await updateHomepageSection(editingSection.id, { items: sectionItems });
      setEditingSection(null);
      alert('Homepage section updated successfully!');
    }
  };

  const updateItemField = (index: number, field: string, value: string) => {
    const newItems = [...sectionItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSectionItems(newItems);
  };
  
  const adminContent = (
    <div className="max-w-6xl mx-auto py-4 lg:py-8 px-2 sm:px-4 lg:px-8 relative min-h-screen">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <LayoutDashboard size={24} className="text-gray-800 lg:w-8 lg:h-8" />
          <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <button onClick={() => goBack()} className="text-gray-500 hover:text-black font-semibold text-xs lg:text-sm">
          Exit Admin
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4 lg:mb-6 overflow-x-auto no-scrollbar">
          <button onClick={() => setView('HOMEPAGE')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'HOMEPAGE' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <LayoutDashboard size={16} /> Homepage
          </button>
          <button onClick={() => setView('HEROTABS')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'HEROTABS' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <Star size={16} /> Hero Tabs
          </button>
          <button onClick={() => setView('CATEGORIES')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'CATEGORIES' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <ImageIcon size={16} /> Categories
          </button>
          <button onClick={() => setView('LIST')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'LIST' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <List size={16} /> Products
          </button>
          <button onClick={() => setView('PROFILE')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'PROFILE' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <User size={16} /> Profile Settings
          </button>
          <button onClick={() => setView('INVOICE')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'INVOICE' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <Mail size={16} /> Invoices
          </button>
           <button onClick={() => setView('EMAILS')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'EMAILS' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <Mail size={16} /> Order Emails
          </button>
          <button onClick={() => setView('SELLERS')} className={`pb-2 lg:pb-3 text-xs lg:text-sm font-bold flex items-center gap-1 lg:gap-2 whitespace-nowrap ${view === 'SELLERS' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
            <User size={16} /> Sellers
          </button>
      </div>

      {view === 'HOMEPAGE' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-sm lg:text-lg font-bold text-gray-900">Manage Homepage Grid</h2>
          </div>
          <div className="p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {homepageSections?.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-sm p-4 bg-gray-50 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">{section.title}</h3>
                  <button onClick={() => openSectionEdit(section)} className="bg-black text-white px-3 py-1.5 text-[10px] font-bold rounded-sm uppercase tracking-wider">
                    Edit Content
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {section.items?.map((item: any, i: number) => (
                    <div key={i} className="aspect-[3/4] bg-white rounded-sm border border-gray-200 overflow-hidden">
                      <img src={item.img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'PROFILE' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden max-w-2xl mx-auto w-full">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-sm lg:text-lg font-bold text-gray-900">User Profile Settings</h2>
          </div>
          <div className="p-4 lg:p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profName} 
                  onChange={(e) => setProfName(e.target.value)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={profEmail} 
                  onChange={(e) => setProfEmail(e.target.value)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Wallet Balance (£)</label>
                <input 
                  type="number" 
                  value={profBalance} 
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setProfBalance(isNaN(val) ? 0 : val);
                  }} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cart Discount Text (e.g. -£43.04)</label>
                <input 
                  type="text" 
                  value={profCartDiscount} 
                  onChange={(e) => setProfCartDiscount(e.target.value)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Discounts Badge Count (Bottom Bar)</label>
                <input 
                  type="number" 
                  value={profDiscountsCount} 
                  onChange={(e) => setProfDiscountsCount(parseInt(e.target.value) || 0)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={profPhone} 
                  onChange={(e) => setProfPhone(e.target.value)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black" 
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Shipping Address</label>
                <textarea 
                  value={profAddress} 
                  onChange={(e) => setProfAddress(e.target.value)} 
                  className="w-full p-2.5 border border-gray-300 rounded-sm focus:ring-black focus:border-black min-h-[80px]" 
                  placeholder="Enter full address details"
                />
              </div>
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-black text-white font-bold rounded-sm shadow-md hover:bg-gray-800 transition-colors">
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {view === 'CATEGORIES' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-2 lg:px-6 py-2 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-sm lg:text-lg font-bold text-gray-900">Manage Categories</h2>
              <span className="text-xs lg:text-sm text-gray-500">{categories?.length} categories</span>
          </div>
          <div className="p-4 lg:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex flex-col border border-gray-100 rounded-sm overflow-hidden bg-white shadow-sm">
                <div className="aspect-square relative bg-gray-50">
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-900 truncate">{cat.name}</span>
                  <button 
                    onClick={() => { setEditingCategory(cat); setCatImg(cat.image_url); }}
                    className="w-full py-1.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-sm hover:bg-gray-200"
                  >
                    Edit Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'LIST' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
           <div className="px-2 lg:px-6 py-2 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-sm lg:text-lg font-bold text-gray-900">All Products</h2>
              <button onClick={() => setView('CREATE')} className="bg-black text-white px-3 py-1.5 text-xs font-bold rounded-sm">+ Add New</button>
           </div>
           <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 p-2 lg:p-6">
              {products?.map(p => (
                <div key={p.id} onClick={() => openEditModal(p)} className="aspect-[3/4] border border-gray-200 rounded-sm overflow-hidden bg-white cursor-pointer shadow-sm hover:shadow-md">
                   <img src={p.img} className="w-full h-full object-cover" />
                </div>
              ))}
           </div>
         </div>
      )}

      {view === 'HEROTABS' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50">
             <h2 className="text-sm lg:text-lg font-bold text-gray-900">Manage Hero Tabs & Images</h2>
          </div>
          <div className="p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {heroTabs?.map(tab => (
               <div key={tab.id} className="border border-gray-200 rounded-sm p-4 bg-gray-50 flex flex-col gap-4">
                 <div className="flex justify-between items-center">
                   <h3 className="font-bold text-gray-800">{tab.title}</h3>
                   <button onClick={() => { setEditingHeroTab(tab); setHtTitle(tab.title); setHtImg(tab.image_url || ''); }} className="bg-black text-white px-3 py-1.5 text-[10px] font-bold rounded-sm uppercase tracking-wider">
                     Edit
                   </button>
                 </div>
                 {tab.image_url ? (
                   <img src={tab.image_url} alt={tab.title} className="w-full h-32 object-cover rounded-sm border border-gray-200" />
                 ) : (
                   <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs rounded-sm border border-gray-300">
                     No Hero Image
                   </div>
                 )}
               </div>
             ))}
          </div>
        </div>
      )}

      {view === 'CREATE' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm lg:text-lg font-bold text-gray-900">Create New Product</h2>
          </div>
          
          <div className="p-4 lg:p-6">
            {savedMessage && (
              <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-xs border border-green-200">
                {savedMessage}
              </div>
            )}

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-sm text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">Price (£)</label>
                  <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-sm text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">Image URL</label>
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-sm text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">Seller</label>
                  <select 
                    value={sellerId} 
                    onChange={(e) => setSellerId(e.target.value)} 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-sm text-xs"
                    required
                  >
                    <option value="">Select a seller...</option>
                    {sellers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider">Save Product</button>
            </form>
          </div>
        </div>
      )}

      {view === 'INVOICE' && (
        <div className="bg-white p-4 lg:p-8 min-h-screen">
          {latestOrder ? (
            <div className="max-w-xl mx-auto border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black tracking-widest uppercase mb-2">INVOICE</h2>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Order Confirmation</div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Dear {latestOrder.users?.first_name || 'Customer'},</h3>
                <p className="text-gray-600 text-sm">Thank you for your order! Your tracking number is <span className="font-bold">GS{latestOrder.order_number}</span>.</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-bold">{latestOrder.order_number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-bold">£{parseFloat(latestOrder.total_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-bold">{new Date(latestOrder.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-bold text-xs uppercase tracking-wider text-gray-400 border-b pb-2">Items</div>
                {latestOrder.order_items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <img src={item.products?.main_image} className="w-16 h-20 object-cover rounded-sm" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-800 line-clamp-1">{item.products?.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</div>
                      <div className="text-xs font-bold mt-1">£{parseFloat(item.unit_price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                <button onClick={() => window.print()} className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800">Print Invoice</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 italic">No orders found yet.</div>
          )}
        </div>
      )}

      {view === 'SELLERS' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm lg:text-lg font-bold text-gray-900">Manage Sellers</h2>
            <button 
              onClick={() => {
                setEditingSeller(null);
                setSellerName('');
                setSellerRating('4.8');
              }}
              className="bg-black text-white px-3 py-1.5 text-xs font-bold rounded-sm"
            >
              + Add Seller
            </button>
          </div>
          <div className="p-4 lg:p-6 space-y-6">
            <div className="bg-gray-50 p-4 border rounded-sm">
              <h3 className="font-bold text-sm mb-4">{editingSeller ? 'Edit Seller' : 'Create New Seller'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller Name</label>
                  <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full p-2 border rounded-sm text-xs" placeholder="e.g. Romwe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rating (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" value={sellerRating} onChange={(e) => setSellerRating(e.target.value)} className="w-full p-2 border rounded-sm text-xs" />
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={async () => {
                    if (!sellerName) return;
                    if (editingSeller) {
                      await updateSeller(editingSeller.id, { name: sellerName, rating: parseFloat(sellerRating) });
                    } else {
                      await addSeller({ name: sellerName, rating: parseFloat(sellerRating) });
                    }
                    setSellerName('');
                    setEditingSeller(null);
                  }}
                  className="bg-black text-white px-4 py-2 text-xs font-bold rounded-sm uppercase tracking-wider"
                >
                  {editingSeller ? 'Update Seller' : 'Create Seller'}
                </button>
                {editingSeller && (
                  <button onClick={() => { setEditingSeller(null); setSellerName(''); }} className="bg-gray-200 text-gray-700 px-4 py-2 text-xs font-bold rounded-sm uppercase tracking-wider">
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sellers.map(s => (
                <div key={s.id} className="border border-gray-200 rounded-sm p-4 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-sm text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" /> {s.rating} Rating
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => { setEditingSeller(s); setSellerName(s.name); setSellerRating(s.rating.toString()); }} className="flex-1 py-1.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-sm hover:bg-gray-200">
                      Edit
                    </button>
                    <button onClick={() => { if(confirm('Delete seller?')) deleteSeller(s.id); }} className="flex-1 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-sm hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'EMAILS' && (
        <div className="bg-white lg:shadow-sm rounded-sm lg:border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm lg:text-lg font-bold text-gray-900">Select Order for Confirmation Email</h2>
          </div>
          <div className="p-4 lg:p-6 space-y-4">
            {allOrders.length > 0 ? (
              allOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-sm p-4 flex justify-between items-center bg-gray-50">
                  <div>
                    <div className="font-bold text-sm">Order #{order.order_number}</div>
                    <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Total: £{parseFloat(order.total_amount).toFixed(2)} | User: {order.users?.email}</div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setScreen('EMAIL_CONFIRMATION');
                    }}
                    className="bg-black text-white px-4 py-2 text-xs font-bold rounded-sm uppercase tracking-wider"
                  >
                    View Email
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 text-sm italic">No orders found.</div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalProduct && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="bg-white w-full max-w-sm rounded-sm shadow-xl overflow-hidden flex flex-col">
               <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm">Quick Edit: {editTitle}</h3>
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
                  <div className="mb-4">
                     <label className="block text-xs font-bold text-gray-700 mb-1">Seller</label>
                     <select 
                        value={sellerId || editModalProduct.seller_id || ''} 
                        onChange={(e) => setSellerId(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black"
                     >
                        <option value="">Select a seller...</option>
                        {sellers.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                     </select>
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

      {/* Category Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white w-full max-w-sm rounded-sm shadow-xl overflow-hidden flex flex-col">
             <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm">Edit Category: {editingCategory.name}</h3>
                <button onClick={() => setEditingCategory(null)} className="text-gray-500 hover:text-black">
                   <X size={20} />
                </button>
             </div>
             <div className="p-4">
                <div className="mb-4">
                   <label className="block text-xs font-bold text-gray-700 mb-1">Category Name</label>
                   <input type="text" value={editingCategory.name} disabled className="w-full p-2 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-500" />
                </div>
                <div className="mb-4">
                   <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                   <textarea 
                      value={catImg}
                      onChange={(e) => setCatImg(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black h-24 resize-none"
                   />
                </div>
                <div className="flex gap-4">
                   <div className="w-[100px] h-[100px] bg-gray-100 border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={catImg} alt="Preview" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col justify-end flex-grow">
                      <button onClick={saveCategoryEdit} className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors">
                         Update Category
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Hero Tab Edit Modal */}
      {editingHeroTab && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white w-full max-w-sm rounded-sm shadow-xl overflow-hidden flex flex-col">
             <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm">Edit Hero Tab</h3>
                <button onClick={() => setEditingHeroTab(null)} className="text-gray-500 hover:text-black">
                   <X size={20} />
                </button>
             </div>
             <div className="p-4">
                <div className="mb-4">
                   <label className="block text-xs font-bold text-gray-700 mb-1">Tab Title</label>
                   <input 
                      type="text"
                      value={htTitle}
                      onChange={(e) => setHtTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black"
                   />
                </div>
                <div className="mb-4">
                   <label className="block text-xs font-bold text-gray-700 mb-1">Hero Image URL (Optional)</label>
                   <textarea 
                      value={htImg}
                      onChange={(e) => setHtImg(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:ring-black focus:border-black h-20 resize-none"
                      placeholder="Leave empty to use default gradient..."
                   />
                </div>
                <button onClick={saveHeroTabEdit} className="w-full py-2 bg-black text-white text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors">
                   Save Tab
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Homepage Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white w-full max-w-xl rounded-sm shadow-xl flex flex-col">
            <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-gray-900 text-sm">Edit {editingSection.title}</h3>
               <button onClick={() => setEditingSection(null)}><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[80vh] space-y-6">
               {sectionItems?.map((item, idx) => (
                 <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Item {idx + 1}</h4>
                    <div className="flex gap-4">
                       <div className="w-[100px] h-[133px] bg-gray-100 border rounded-sm overflow-hidden flex-shrink-0">
                          <img src={item.img} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1">IMAGE URL</label>
                            <textarea value={item.img} onChange={(e) => updateItemField(idx, 'img', e.target.value)} className="w-full p-2 border rounded-sm text-xs h-16 resize-none" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1">PRICE (£)</label>
                            <input type="text" value={item.price} onChange={(e) => updateItemField(idx, 'price', e.target.value)} className="w-full p-2 border rounded-sm text-xs" />
                          </div>
                          {item.sub !== undefined && (
                            <div>
                               <label className="block text-[10px] font-bold text-gray-400 mb-1">BRAND/SUBTITLE</label>
                               <input type="text" value={item.sub} onChange={(e) => updateItemField(idx, 'sub', e.target.value)} className="w-full p-2 border rounded-sm text-xs" />
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
               <button onClick={saveSection} className="bg-black text-white px-8 py-2.5 rounded-sm font-bold text-sm">Save Section Content</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout setScreen={setScreen}>
           {adminContent}
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout>
           {adminContent}
        </DesktopLayout>
      </div>
    </>
  );
};
