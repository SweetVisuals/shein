import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SectionHeader = ({ title, icon }: { title: React.ReactNode, icon?: boolean }) => (
  <div className="flex justify-between items-center mb-2 px-0.5">
    <h3 className="font-black text-[13px] text-gray-900 italic flex items-center tracking-tight">
      {title}
    </h3>
    <ChevronRight size={14} className="text-gray-400" />
  </div>
);

const DealCard = ({ title, items, badge }: { title: React.ReactNode, items: any[], badge?: boolean }) => {
  const { addToCart } = useAppContext();
  
  return (
  <div className="bg-white rounded-lg p-2.5 pb-3 overflow-hidden shadow-sm">
    <SectionHeader title={title} />
    <div className="grid grid-cols-2 gap-1.5 px-0.5">
      {items.slice(0, 2).map((item, i) => (
        <div key={i} className="flex flex-col relative group">
          <div className="aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden mb-1 relative">
             {item.sub && <span className="absolute top-0 left-0 bg-black text-white text-[7px] px-1 py-0.5 z-10 font-bold uppercase">{item.sub}</span>}
             <img 
               src={item.img} 
               alt="Product" 
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
             {/* Tiny Quick Add */}
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 addToCart({
                   id: item.id || `mock-${i}`,
                   title: item.title || 'Special Deal Product',
                   price: parseFloat(item.price),
                   img: item.img
                 });
               }}
               className="absolute bottom-1 right-1 bg-white/90 p-1 rounded-full shadow-sm active:scale-90 transition-all"
             >
               <ShoppingCart size={10} className="text-black" />
             </button>
          </div>
          <div className="flex flex-col leading-tight mt-1">
            <span className="text-[#D92534] font-black text-[13px] tracking-tight">£{parseFloat(item.price).toFixed(2)}</span>
            {item.bottom_text && (
              <span className={`text-[10px] font-medium mt-0.5 ${item.bottom_text_color === 'purple' ? 'text-[#a752c4]' : 'text-[#D92534]'}`}>
                {item.bottom_text}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export const HomeGridSections = () => {
  const { homepageSections } = useAppContext();

  const getSection = (key: string) => homepageSections.find(s => s.section_key === key);

  const superDeals = getSection('super_deals');
  const brandDeals = getSection('brand_deals');
  const trends = getSection('trends');
  const bankHoliday = getSection('bank_holiday');

  return (
    <div className="bg-[#F8F8F8] px-3 py-4 flex flex-col gap-3">
      {/* Row 1: Super Deals & Brand Deals */}
      <div className="grid grid-cols-2 gap-3">
        {superDeals && (
          <DealCard 
            title={<><span className="text-gray-900">Super</span><span className="text-[#a752c4] italic">Deals</span></>}
            badge
            items={superDeals.items}
          />
        )}
        {brandDeals && (
          <DealCard 
            title={<><span className="text-[#D92534] mr-0.5">√</span>Brand Deals</>}
            items={brandDeals.items}
          />
        )}
      </div>

      {/* Row 2: Trends & Bank Holiday Sale */}
      <div className="grid grid-cols-2 gap-3">
        {trends && (
          <DealCard 
            title={<><span className="text-[#a752c4] mr-1 italic">Trends</span></>}
            items={trends.items}
          />
        )}
        {bankHoliday && (
          <DealCard 
            title={<><span className="text-gray-900 uppercase text-[11px]">{bankHoliday.title}</span></>}
            items={bankHoliday.items}
          />
        )}
      </div>

      {/* For You Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 py-2 mt-2">
        {['For You', '3-Day Delivery', 'New In', 'Deals', 'Best Sellers'].map((tab, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold ${i === 0 ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
            {tab === 'New In' ? '✨ ' : tab === '3-Day Delivery' ? '🚚 ' : ''}{tab}
          </button>
        ))}
      </div>
    </div>
  );
};
