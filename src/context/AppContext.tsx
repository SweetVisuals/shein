import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  img: string;
  size?: string;
  stockLabel?: string;
  sold?: string;
  discount?: string;
  rating?: string;
  isChoice?: boolean;
  seller?: string;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  loyaltyPoints?: number;
  walletBalance?: number;
  cartDisplayDiscount?: string;
  discountsCount?: number;
  fullAddress?: string;
  phoneNumber?: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  categories: any[];
  updateCategory: (id: string, updates: any) => Promise<void>;
  fetchOrders: () => Promise<any[]>;
  homepageSections: any[];
  updateHomepageSection: (id: string, updates: any) => Promise<void>;
  updateUser: (id: string, updates: any) => Promise<void>;
  heroTabs: any[];
  fetchHeroTabs: () => Promise<void>;
  updateHeroTab: (id: string, updates: any) => Promise<void>;
  activeHeroTab: string;
  setActiveHeroTab: (title: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  sellers: any[];
  addSeller: (seller: any) => Promise<void>;
  updateSeller: (id: string, updates: any) => Promise<void>;
  deleteSeller: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
     id: 'p1',
     img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop',
     title: 'SHEIN MOD Women\'s3pcs Floral Asymmetric ...',
     stockLabel: '',
     sold: '50+ sold',
     price: 11.99,
     originalPrice: 15.99,
     discount: '-25%',
     isChoice: false,
     size: 'Multicolor / 10(M)',
     seller: 'SHEIN MOD'
  },
  {
     id: 'p2',
     img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=300&auto=format&fit=crop',
     title: 'SHEIN MOD 2pcs Women Elegant Floral Print ...',
     stockLabel: 'Almost Sold Out',
     sold: '100+ sold',
     price: 19.67,
     originalPrice: 25.99,
     discount: '-24%',
     isChoice: false,
     size: 'Blue / 10(M)',
     seller: 'SHEIN MOD'
  },
  {
     id: 'p3',
     img: 'https://images.unsplash.com/photo-1434389678232-0aa0ddbc1c27?q=80&w=300&auto=format&fit=crop',
     title: 'SHEIN MOD Women\'s Contrast Polka Dot Print...',
     stockLabel: 'Almost Sold Out',
     sold: '300+ sold',
     price: 10.74,
     originalPrice: 17.49,
     discount: '-38%',
     isChoice: false,
     size: 'Apricot / 12/14(L)',
     seller: 'SHEIN MOD'
  },
  {
     id: 'p4',
     img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop',
     title: 'Elegant Sexy Women\'s Sheer Asymmetrical ...',
     stockLabel: 'Almost Sold Out',
     sold: '200+ sold',
     price: 8.44,
     originalPrice: 13.99,
     discount: '-39%',
     isChoice: false,
     size: 'Khaki / 10(M)',
     seller: 'Budhaul'
  },
  {
     id: 'p5',
     img: 'https://images.unsplash.com/photo-1512201078372-9c6b2a0d528b?q=80&w=300&auto=format&fit=crop',
     title: 'Radiana Women\'s Apricot Boho Summer Set: ...',
     stockLabel: '',
     sold: '200+ sold',
     price: 21.21,
     originalPrice: 32.99,
     discount: '-35%',
     isChoice: false,
     size: 'Apricot / 10(M)',
     seller: 'Radiana'
  },
  {
     id: 'p6',
     img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop',
     title: 'Slaydiva 2pcs/Set Women\'s Sexy Green Color ...',
     stockLabel: '',
     sold: '100+ sold',
     price: 11.65,
     originalPrice: 16.99,
     discount: '-31%',
     isChoice: false,
     size: 'Orange / 12/14(L)',
     seller: 'Slaydiva'
  },
  {
     id: 'p7',
     img: 'https://images.unsplash.com/photo-1550614000-4b95dd2db1e2?q=80&w=300&auto=format&fit=crop',
     title: 'BamGleam Bohemian Cashew Paisley Print ...',
     stockLabel: '',
     sold: '50+ sold',
     price: 10.43,
     originalPrice: 18.49,
     discount: '-43%',
     isChoice: false,
     size: 'Multicolor / 10(M)',
     seller: 'BamGleam'
  },
  {
     id: 'p8',
     img: 'https://images.unsplash.com/photo-1571216301389-9a74be760ea5?q=80&w=300&auto=format&fit=crop',
     title: 'Yogodlns Hollow Woven Tote Bag, Bohemian ...',
     stockLabel: '',
     sold: '900+ sold',
     price: 5.36,
     originalPrice: 7.18,
     discount: '-25%',
     isChoice: false,
     size: 'Beige',
     seller: 'Yogodlns'
  },
  {
     id: 'p9',
     img: 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=300&auto=format&fit=crop',
     title: 'Women Minimalist Stiletto Heeled Slingback ...',
     stockLabel: '',
     sold: '100+ sold',
     price: 15.53,
     originalPrice: 20.18,
     discount: '-23%',
     isChoice: false,
     size: 'White / UK5.5',
     seller: 'Foot Concubine'
  },
  {
     id: 'p10',
     img: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?q=80&w=300&auto=format&fit=crop',
     title: 'Manfinity Homme Men\'s Pocket Crew Neck ...',
     stockLabel: 'Almost Sold Out',
     sold: '200+ sold',
     price: 17.40,
     originalPrice: 24.99,
     discount: '-30%',
     isChoice: false,
     size: 'Multicolor / 38(M)',
     seller: 'Manfinity Homme'
  },
  {
     id: 'p11',
     img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop',
     title: 'Men\'s Comfortable Retro Open Toe Sandals - ...',
     stockLabel: 'Gone in 3 Day',
     sold: '600+ sold',
     price: 8.09,
     originalPrice: 12.08,
     discount: '-33%',
     isChoice: false,
     size: 'Beige / UK7.5',
     seller: 'MIKGG'
  },
  {
     id: 'p12',
     img: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=300&auto=format&fit=crop',
     title: 'U-Shaped Filled Clothing Portable Travel Long...',
     stockLabel: 'Almost Sold Out',
     sold: '4.9k+ sold',
     price: 3.84,
     originalPrice: 6.18,
     discount: '-37%',
     isChoice: false,
     size: 'Multicolor / Black',
     seller: 'XINLUI'
  },
  {
     id: 'p13',
     img: 'https://images.unsplash.com/photo-1552697611-6677f525bf7b?q=80&w=300&auto=format&fit=crop',
     title: 'Boho 1pc Summer Fresh And Simple Wave Big ...',
     stockLabel: '',
     sold: '100+ sold',
     price: 5.74,
     originalPrice: 7.38,
     discount: '-22%',
     isChoice: false,
     size: 'White',
     seller: 'Jenny'
  },
  {
     id: 'p14',
     img: 'https://images.unsplash.com/photo-1563212891-b3b3cbde3853?q=80&w=300&auto=format&fit=crop',
     title: 'Y2K Style Women\'s Sexy Solid Color Deep V-...',
     stockLabel: 'Almost Sold Out',
     sold: '50+ sold',
     price: 13.46,
     originalPrice: 25.23,
     discount: '-46%',
     isChoice: false,
     size: 'Yellow / M',
     seller: 'miumiuqaz'
  },
  {
     id: 'p15',
     img: 'https://images.unsplash.com/photo-1588636734151-54c3cf7b2b8e?q=80&w=300&auto=format&fit=crop',
     title: 'SHEIN EZwear 3pcs Women High Waist Skinny...',
     stockLabel: '',
     sold: '100+ sold',
     price: 15.99,
     originalPrice: 20.99,
     discount: '-23%',
     isChoice: false,
     size: 'Multicolor / 10(M)',
     seller: 'SHEIN EZwear'
  },
  {
     id: 'p16',
     img: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=300&auto=format&fit=crop',
     title: 'Slaydiva Summer New Elegant Party Daily Dat...',
     stockLabel: '',
     sold: '50+ sold',
     price: 10.07,
     originalPrice: 17.99,
     discount: '-44%',
     isChoice: false,
     size: 'Apricot / 10(M)',
     seller: 'Slaydiva'
  },
  {
     id: 'p17',
     img: 'https://images.unsplash.com/photo-1510207399884-061ff34633e2?q=80&w=300&auto=format&fit=crop',
     title: 'Slaydiva Autumn/Winter New Music Festival, ...',
     stockLabel: '3-Day Delivery',
     sold: '1.0k+ sold',
     price: 19.99,
     originalPrice: 30.99,
     discount: '-35%',
     isChoice: false,
     size: 'Dark Grey / 12/14(L)',
     seller: 'Slaydiva'
  },
  {
     id: 'p18',
     img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=300&auto=format&fit=crop',
     title: 'Soleia Women\'s Spring/Summer Wrap ...',
     stockLabel: 'Almost Sold Out',
     sold: '200+ sold',
     price: 16.31,
     originalPrice: 21.49,
     discount: '-24%',
     isChoice: false,
     size: 'Khaki / 12/14(L)',
     seller: 'Soleia'
  },
  {
     id: 'p19',
     img: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=300&auto=format&fit=crop',
     title: '1pc Pashmina Shawls And Wraps Cashmere Fe...',
     stockLabel: '',
     sold: '100+ sold',
     price: 3.57,
     originalPrice: 5.48,
     discount: '-34%',
     isChoice: false,
     size: 'Viscose Scarf / White',
     seller: 'BOEOA'
  },
  {
     id: 'p20',
     img: 'https://images.unsplash.com/photo-1601053158023-3db52a7cb201?q=80&w=300&auto=format&fit=crop',
     title: '1pc Women\'s Braided Belt, New Retro Style ...',
     stockLabel: '',
     sold: '600+ sold',
     price: 1.88,
     originalPrice: 2.68,
     discount: '-29%',
     isChoice: false,
     size: 'Khaki / one-size',
     seller: 'WZJingXi'
  },
  {
     id: 'p21',
     img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop',
     title: '1 Pair Women Oversized Retro Vintage Fashion...',
     stockLabel: '',
     sold: '800+ sold',
     price: 3.15,
     originalPrice: 4.08,
     discount: '-22%',
     isChoice: false,
     size: 'Orange',
     seller: 'CC GLASSES'
  },
  {
     id: 'p22',
     img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=300&auto=format&fit=crop',
     title: 'Fashionable New Solid Color PU Embossed Mi...',
     stockLabel: '',
     sold: '200+ sold',
     price: 5.47,
     originalPrice: 8.28,
     discount: '-33%',
     isChoice: false,
     size: 'Orange / one-size',
     seller: 'X.Modern Girl'
  },
  {
     id: 'p23',
     img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop',
     title: 'Spring/Summer New H-Shaped Slippers For ...',
     stockLabel: '',
     sold: '600+ sold',
     price: 6.12,
     originalPrice: 7.98,
     discount: '-23%',
     isChoice: false,
     size: 'Orange / UK5.5(EUR38)',
     seller: 'SizzleStrut Boutique'
  },
  {
     id: 'p24',
     img: 'https://images.unsplash.com/photo-1616942475655-081e7d825c88?q=80&w=300&auto=format&fit=crop',
     title: '10Pcs/Pack Multi-Functional Magnetic Cat Eye...',
     stockLabel: '',
     sold: '1.2k+ sold',
     price: 0.80,
     originalPrice: 1.08,
     discount: '-25%',
     isChoice: false,
     size: 'Silver',
     seller: 'FUMOSIK'
  },
  {
     id: 'p25',
     img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=300&auto=format&fit=crop',
     title: 'Swim Basics Solid Color Mesh Cover-Up Skirt ...',
     stockLabel: '',
     sold: '500+ sold',
     price: 4.55,
     originalPrice: 6.99,
     discount: '-34%',
     isChoice: false,
     size: 'Black',
     seller: 'Swim Basics'
  },
  {
     id: 'p26',
     img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop',
     title: '3pcs Fashionable Asymmetrical Shaped ...',
     stockLabel: '',
     sold: '3.4k+ sold',
     price: 2.02,
     originalPrice: 3.78,
     discount: '-46%',
     isChoice: false,
     size: 'Gold',
     seller: 'Iancao'
  },
  {
     id: 'p27',
     img: 'https://images.unsplash.com/photo-1630018596647-7eeaaee989e2?q=80&w=300&auto=format&fit=crop',
     title: '48-12pcs Classic Punk Style Metal Earring Set...',
     stockLabel: '',
     sold: '600+ sold',
     price: 1.42,
     originalPrice: 2.48,
     discount: '-42%',
     isChoice: false,
     size: 'Gold / Style 3 (12 Pcs)',
     seller: 'Viva Jewelry'
  },
  {
     id: 'p28',
     img: 'https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=300&auto=format&fit=crop',
     title: 'Radiana Women\'s Letter Print Color Block Sho...',
     stockLabel: '',
     sold: '200+ sold',
     price: 14.50,
     originalPrice: 19.99,
     discount: '-27%',
     isChoice: false,
     size: 'Pink / 10(M)',
     seller: 'Radiana'
  },
  {
     id: 'p29',
     img: 'https://images.unsplash.com/photo-1550993510-ed4b4ae5ce5c?q=80&w=300&auto=format&fit=crop',
     title: 'Manfinity Homme Men\'s Solid Color Short ...',
     stockLabel: '',
     sold: '300+ sold',
     price: 21.84,
     originalPrice: 31.99,
     discount: '-31%',
     isChoice: false,
     size: 'Khaki / 38(M)',
     seller: 'Manfinity Homme'
  },
  {
     id: 'p30',
     img: 'https://images.unsplash.com/photo-1580828343064-fde4cad202d5?q=80&w=300&auto=format&fit=crop',
     title: 'OTTIMOZO Men\'s Summer Solid Color Short ...',
     stockLabel: '',
     sold: '800+ sold',
     price: 18.71,
     originalPrice: 24.99,
     discount: '-25%',
     isChoice: false,
     size: 'Black / 38(M)',
     seller: 'OTTIMOZO'
  },
  {
     id: 'p31',
     img: 'https://images.unsplash.com/photo-1593922759954-129994c5d518?q=80&w=300&auto=format&fit=crop',
     title: '2pcs Men\'s Set, Fashionable Solid Color Pock...',
     stockLabel: '',
     sold: '100+ sold',
     price: 21.11,
     originalPrice: 28.49,
     discount: '-25%',
     isChoice: false,
     size: 'Khaki / M',
     seller: 'ENRGYU'
  },
  {
     id: 'p32',
     img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=300&auto=format&fit=crop',
     title: 'Manfinity RSRT 2pcs Men\'s Shirt Collar Button...',
     stockLabel: '',
     sold: '50+ sold',
     price: 15.83,
     originalPrice: 20.99,
     discount: '-24%',
     isChoice: false,
     size: 'Orange / 38(M)',
     seller: 'Manfinity RSRT'
  },
  {
     id: 'p33',
     img: 'https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=300&auto=format&fit=crop',
     title: '2pcs/Set Men\'s Summer Outfit, Lightweight ...',
     stockLabel: '',
     sold: '100+ sold',
     price: 14.27,
     originalPrice: 21.99,
     discount: '-35%',
     isChoice: false,
     size: 'Apricot / 34(XS)',
     seller: 'GloMan'
  },
  {
     id: 'p34',
     img: 'https://images.unsplash.com/photo-1592878904946-b3ce8ae24ea5?q=80&w=300&auto=format&fit=crop',
     title: 'HIMLAND Men\'s Solid Color Minimalist Casual ...',
     stockLabel: '',
     sold: '200+ sold',
     price: 19.17,
     originalPrice: 29.99,
     discount: '-36%',
     isChoice: false,
     size: 'Multicolor / 38(M)',
     seller: 'HIMLAND'
  }
];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [homepageSections, setHomepageSections] = useState<any[]>([]);
  const [heroTabs, setHeroTabs] = useState<any[]>([]);
  const [activeHeroTab, setActiveHeroTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [sellers, setSellers] = useState<any[]>([]);
  const [history, setHistory] = useState(['SPLASH']);
  const screen = history[history.length - 1];

  const navigateTo = (s: string) => {
    if (s === 'HOME') {
      setHistory(['HOME']);
    } else if (history[history.length - 1] !== s) {
      setHistory(prev => [...prev, s]);
    }
  };

  const goBack = () => {
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchHomepageSections();
    fetchHeroTabs();
    fetchSellers();
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async (userId: string) => {
    try {
      // Get or create cart
      let { data: cartData, error: cartError } = await supabase
        .from('shopping_carts')
        .select('id')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

      if (!cartData) {
        const { data: newCart, error: createError } = await supabase
          .from('shopping_carts')
          .insert([{ user_id: userId }])
          .select()
          .single();
        if (createError) throw createError;
        cartData = newCart;
      }

      const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select('*, products(*, sellers(name))')
        .eq('cart_id', cartData.id);

      if (itemsError) throw itemsError;

      if (items) {
        const sellerNames = ['Luvlette', '23 Fashion', 'Romwe', 'Zaful', 'Dazy', 'Motf', 'Emery Rose', 'Musera', 'Cuccoo', 'sumwon', 'Glowmode'];

        const formatted = items.map(item => {
          let sellerName = item.products?.sellers?.name || item.products?.seller_id || '';
          // If sellerName is missing or is a UUID (long random string), use a deterministic name from the list
          if (!sellerName || sellerName.length > 20) {
            const index = item.product_id ? item.product_id.charCodeAt(0) % sellerNames.length : Math.floor(Math.random() * sellerNames.length);
            sellerName = sellerNames[index] || 'SHEIN';
          }
          
          return {
            id: item.product_id,
            cartItemId: item.id,
            quantity: item.quantity,
            title: item.products?.title || 'Unknown Product',
            price: item.products?.base_price ? parseFloat(item.products.base_price) : 0,
            img: item.products?.main_image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop',
            seller: sellerName
          };
        });
        setCart(formatted);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const fetchOrders = async () => {
    if (!user) return [];
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)), shipments(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching orders:', err);
      return [];
    }
  };

  const fetchHeroTabs = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_tabs')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      if (data) {
        setHeroTabs(data);
        if (data.length > 0 && activeHeroTab === 'All') {
          setActiveHeroTab(data[0].title);
        }
      }
    } catch (err) {
      console.error('Error fetching hero tabs:', err);
    }
  };

  const updateHeroTab = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('hero_tabs')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      fetchHeroTabs();
    } catch (err) {
      console.error('Error updating hero tab:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, sellers(name)');
      
      if (error) throw error;

      if (data) {
        const formatted = data.map(p => ({
          id: p.id,
          title: p.title,
          price: parseFloat(p.base_price),
          originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
          img: p.main_image,
          sold: `${p.sold_count}+ sold`,
          discount: p.original_price ? `-${Math.round((1 - p.base_price / p.original_price) * 100)}%` : undefined,
          seller: p.sellers?.name,
          tags: p.tags
        }));
        setProducts(formatted);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // Fallback to initial products if needed
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSellers = async () => {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .order('name');
      if (error) throw error;
      setSellers(data || []);
    } catch (err) {
      console.error('Error fetching sellers:', err);
    }
  };

  const addSeller = async (seller: any) => {
    try {
      const { error } = await supabase.from('sellers').insert([seller]);
      if (error) throw error;
      fetchSellers();
    } catch (err) {
      console.error('Error adding seller:', err);
    }
  };

  const updateSeller = async (id: string, updates: any) => {
    try {
      const { error } = await supabase.from('sellers').update(updates).eq('id', id);
      if (error) throw error;
      fetchSellers();
    } catch (err) {
      console.error('Error updating seller:', err);
    }
  };

  const deleteSeller = async (id: string) => {
    try {
      const { error } = await supabase.from('sellers').delete().eq('id', id);
      if (error) throw error;
      fetchSellers();
    } catch (err) {
      console.error('Error deleting seller:', err);
    }
  };

  const updateCategory = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      let userId = session?.user?.id;
      
      // If no session, find the first user in the table (since it's a single-user setup)
      if (!userId) {
        const { data: firstUser } = await supabase
          .from('users')
          .select('id')
          .limit(1)
          .maybeSingle();
        
        if (firstUser) {
          userId = firstUser.id;
        }
      }

      if (userId) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : profile.email.split('@')[0],
            firstName: profile.first_name,
            lastName: profile.last_name,
            loyaltyPoints: profile.loyalty_points,
            walletBalance: profile.wallet_balance,
            cartDisplayDiscount: profile.cart_display_discount || '-£43.04',
            discountsCount: profile.discounts_count || 0,
            fullAddress: profile.full_address || '',
            phoneNumber: profile.phone_number || ''
          });
          fetchCart(profile.id);
        }
      }
    } catch (err) {
      console.error('Error checking user:', err);
    }
  };

  const login = async (email: string) => {
    // For demo purposes, we'll use a simplified auth flow or link to existing profile
    // In a real app, this would be supabase.auth.signInWithOtp({ email })
    // Here we'll simulate it by creating/fetching a user profile
    const { data: existingUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      setUser({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.first_name ? `${existingUser.first_name} ${existingUser.last_name || ''}`.trim() : existingUser.email.split('@')[0],
        firstName: existingUser.first_name,
        lastName: existingUser.last_name,
        loyaltyPoints: existingUser.loyalty_points,
        walletBalance: existingUser.wallet_balance,
        cartDisplayDiscount: existingUser.cart_display_discount || '-£43.04',
        discountsCount: existingUser.discounts_count || 0,
        fullAddress: existingUser.full_address || '',
        phoneNumber: existingUser.phone_number || ''
      });
    } else {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ email, first_name: email.split('@')[0] }])
        .select()
        .single();
      
      if (newUser) {
        setUser({
          id: newUser.id,
          email: newUser.email,
          name: newUser.first_name,
          loyaltyPoints: 0,
          walletBalance: 0
        });
      }
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const addProduct = async (product: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          title: product.title,
          base_price: product.price,
          original_price: product.originalPrice,
          main_image: product.img,
          seller_id: '021e33ac-9be3-47e8-9f28-51fba0fddf86', // SHEIN MOD UUID
          description: 'New Arrival'
        }]);
      
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.price !== undefined) dbUpdates.base_price = updates.price;
      if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
      if (updates.img) dbUpdates.main_image = updates.img;
      
      const { error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id);
      
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      console.warn('addToCart: No user logged in, using local state');
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id && item.size === product.size);
        if (existing) {
          return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prev, { ...product, cartItemId: 'local-' + Math.random().toString(36).substr(2, 9), quantity }];
      });
      return;
    }

    try {
      console.log('addToCart: Adding product', product.id, product.title);

      // 1. Ensure user has a cart
      let { data: cartData, error: cartError } = await supabase
        .from('shopping_carts')
        .select('id')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (cartError) throw cartError;

      if (!cartData) {
        console.log('addToCart: Creating new cart for user', user.id);
        const { data: newCart, error: createError } = await supabase
          .from('shopping_carts')
          .insert([{ user_id: user.id }])
          .select()
          .single();
        
        if (createError) throw createError;
        cartData = newCart;
      }

      // 2. Ensure product exists in DB (handle mock/JSON IDs)
      let dbProductId = product.id;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id);

      if (!isUuid) {
        console.log('addToCart: Product ID is not a UUID, checking for existing product by title');
        const { data: existingProd } = await supabase
          .from('products')
          .select('id')
          .eq('title', product.title)
          .limit(1)
          .maybeSingle();
        
        if (existingProd) {
          dbProductId = existingProd.id;
        } else {
          console.log('addToCart: Creating new product from mock data');
          const { data: newProd, error: prodError } = await supabase
            .from('products')
            .insert([{
              title: product.title,
              base_price: product.price,
              original_price: product.originalPrice || product.price * 1.2,
              main_image: product.img,
              description: 'Imported from UI section'
            }])
            .select()
            .single();
          
          if (prodError) throw prodError;
          dbProductId = newProd.id;
        }
      }

      // 3. Upsert into cart_items
      console.log('addToCart: Processing cart_items', cartData.id, dbProductId);
      
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cartData.id)
        .eq('product_id', dbProductId)
        .maybeSingle();

      if (existingItem) {
        console.log('addToCart: Incrementing quantity for existing item');
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
        if (updateError) throw updateError;
      } else {
        console.log('addToCart: Inserting new cart item');
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert([{
            cart_id: cartData.id,
            product_id: dbProductId,
            quantity: quantity
          }]);
        if (insertError) throw insertError;
      }

      console.log('addToCart: Success, refreshing cart');
      await fetchCart(user.id);
    } catch (err) {
      console.error('Error in addToCart:', err);
      // Fallback to local state if DB fails so user isn't blocked
      setCart(prev => [...prev, { ...product, cartItemId: 'error-' + Date.now(), quantity }]);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (user) {
      try {
        await supabase.from('cart_items').delete().eq('id', cartItemId);
        fetchCart(user.id);
      } catch (err) {
        console.error('Error removing from cart:', err);
      }
    } else {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    if (user) {
      try {
        await supabase.from('cart_items').update({ quantity }).eq('id', cartItemId);
        fetchCart(user.id);
      } catch (err) {
        console.error('Error updating quantity:', err);
      }
    } else {
      setCart((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { data: cartData } = await supabase
          .from('shopping_carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (cartData) {
          await supabase.from('cart_items').delete().eq('cart_id', cartData.id);
          fetchCart(user.id);
        }
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    } else {
      setCart([]);
    }
  };

  const fetchHomepageSections = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .order('section_key');
      
      if (error) throw error;
      setHomepageSections(data || []);
    } catch (err) {
      console.error('Error fetching homepage sections:', err);
    }
  };

  const updateHomepageSection = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('homepage_sections')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      fetchHomepageSections();
    } catch (err) {
      console.error('Error updating homepage section:', err);
    }
  };

  const updateUser = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      checkUser(); // Refresh local state
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      products, isLoading, addProduct, deleteProduct, updateProduct, 
      categories, updateCategory, fetchOrders,
      homepageSections, updateHomepageSection,
      updateUser,
      heroTabs,
      fetchHeroTabs,
      updateHeroTab,
      activeHeroTab,
      setActiveHeroTab,
      selectedProduct,
      setSelectedProduct,
      searchQuery,
      setSearchQuery,
      selectedOrderId,
      setSelectedOrderId,
      screen,
      history,
      navigateTo,
      goBack
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
