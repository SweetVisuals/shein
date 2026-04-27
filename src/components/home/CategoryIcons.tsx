import React from 'react';
import { useAppContext } from '../../context/AppContext';

const FALLBACK_CATEGORIES = [
  { name: 'Women', image_url: 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=200&auto=format&fit=crop' },
  { name: 'Curve', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=200&auto=format&fit=crop' },
  { name: 'Kids', image_url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=200&auto=format&fit=crop' },
  { name: 'Men', image_url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Dresses', image_url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop' },
  { name: 'Home & Living', image_url: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?q=80&w=200&auto=format&fit=crop' },
  { name: 'Jewelry & Accessories', image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
  { name: 'Tops', image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=200&auto=format&fit=crop' },
  { name: 'Beachwear', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop' },
  { name: 'Shoes', image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop' },
];

export const CategoryIcons = () => {
  const { categories } = useAppContext();
  
  // If no categories from DB, use fallback
  const displayCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <div className="grid grid-rows-2 grid-flow-col overflow-x-auto no-scrollbar gap-y-6 gap-x-[2vw] pl-4 pr-10 py-5 bg-white">
      {displayCategories.map((cat, i) => (
        <div key={cat.id || i} className="flex flex-col items-center cursor-pointer group w-[22.22%] lg:w-[12.5%] min-w-[80px]">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-1.5 bg-gray-50">
            <img 
              src={cat.image_url} 
              alt={cat.name} 
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
          <span className="text-[10px] md:text-xs text-center text-gray-800 leading-tight font-medium line-clamp-2 w-full px-1">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};
