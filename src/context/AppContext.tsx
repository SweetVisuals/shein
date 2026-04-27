import React, { createContext, useContext, useState } from 'react';

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
  email: string;
  name?: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
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
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(
    INITIAL_PRODUCTS.map((p) => ({
       ...p,
       cartItemId: Math.random().toString(36).substr(2, 9),
       quantity: 1, // Let's just default to 1
       selected: true
    }))
  );

  const login = (email: string) => setUser({ email, name: email.split('@')[0] });
  const logout = () => setUser(null);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === product.size);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === existing.cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, cartItemId: Math.random().toString(36).substr(2, 9), quantity }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, updateQuantity, clearCart, products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
