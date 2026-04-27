import React from 'react';

const categories = [
  { name: 'Women', img: 'https://images.unsplash.com/photo-1515347619362-e64e9eee8821?q=80&w=200&auto=format&fit=crop' },
  { name: 'Curve', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=200&auto=format&fit=crop' },
  { name: 'Kids', img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=200&auto=format&fit=crop' },
  { name: 'Men', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Dresses', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop' },
  { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?q=80&w=200&auto=format&fit=crop' },
  { name: 'Jewelry & Accessories', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
  { name: 'Tops', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=200&auto=format&fit=crop' },
  { name: 'Beachwear', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop' },
  { name: 'Shoes', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop' },
];

export const CategoryIcons = () => {
  return (
    <div className="grid grid-cols-5 gap-y-4 gap-x-2 px-2 py-4 bg-white">
      {categories.map((cat, i) => (
        <div key={i} className="flex flex-col items-center cursor-pointer group">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-1 border border-transparent group-hover:border-gray-200">
            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] md:text-xs text-center text-gray-800 leading-tight">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};
