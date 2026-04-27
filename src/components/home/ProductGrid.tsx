import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const ProductGrid = () => {
  const { products, addToCart, setSelectedProduct, navigateTo } = useAppContext();
  
  return (
    <div className="grid grid-cols-2 gap-px bg-gray-100 mt-2">
      {products.map((product) => {
        const discountPercentage = product.originalPrice && product.price 
          ? Math.round((1 - (product.price / product.originalPrice)) * 100)
          : null;

        return (
          <div key={product.id} className="bg-white p-3 flex flex-col relative group" onClick={() => { setSelectedProduct(product); navigateTo('PDP'); }}>
            <div className="aspect-[3/4] mb-2 overflow-hidden bg-gray-50 relative">
               <img 
                 src={product.img} 
                 alt={product.title} 
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
               {product.tags && product.tags.length > 0 && (
                 <span className="absolute bottom-2 left-2 bg-white/90 text-black text-[9px] px-1.5 py-0.5 font-bold rounded-sm">
                   {product.tags[0]}
                 </span>
               )}
            </div>
            <span className="text-[11px] text-gray-800 line-clamp-1 mb-1 font-medium">{product.title}</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[#D92534] font-black text-[15px]">£{product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-[11px] text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="p-1.5 border border-gray-100 rounded-full hover:bg-gray-50 active:scale-90 transition-transform"
              >
                <ShoppingCart size={14} className="text-gray-900" />
              </button>
            </div>
            {discountPercentage && discountPercentage > 0 && (
              <div className="mt-1">
                 <span className="text-[9px] text-[#D92534] font-bold">-{discountPercentage}%</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
