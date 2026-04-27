import React from 'react';
import { ChevronRight, Settings, HeadphonesIcon, Settings as SettingsIcon, CreditCard, Gift, Ticket, Wallet, MessageSquare, ShieldAlert, Archive, Truck, Star, RotateCcw } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';

export const ProfileScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { user, updateUser, login } = useAppContext();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(user?.name || '');
  const [editEmail, setEditEmail] = React.useState(user?.email || '');

  React.useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (user) {
      const names = editName.split(' ');
      await updateUser(user.id, {
        first_name: names[0] || '',
        last_name: names.slice(1).join(' ') || '',
        email: editEmail
      });
      setIsEditing(false);
    } else {
      // If no user, treat "saving" as a login/registration
      await login(editEmail || 'guest@example.com');
      setIsEditing(false);
    }
  };

  return (
    <div className="block lg:hidden">
      <MobileLayout setScreen={setScreen}>
        <div className="bg-[#f5f5f5] min-h-screen">
          {/* Header */}
          <div className="bg-white px-4 py-3 flex justify-between items-center relative">
            <div className="flex items-center gap-3">
               <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.getAttribute('data-tried-fallback')) {
                        target.setAttribute('data-tried-fallback', 'true');
                        target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
                      }
                    }}
                  />
               </div>
                <div className="flex flex-col">
                   <div className="flex items-center gap-1">
                      <h1 className="font-bold text-lg">{user?.name || editName || 'Guest User'}</h1>
                      <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 hover:text-black">
                        <SettingsIcon size={14} />
                      </button>
                   </div>
                   <div className="flex flex-col gap-0.5">
                     <span className="text-[11px] text-gray-500 font-medium">{user?.email || editEmail || 'No email set'}</span>
                     <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 font-bold w-fit mt-0.5">
                        <span className="text-[10px]">👑</span> S0 {'>'}
                     </span>
                   </div>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
               <HeadphonesIcon size={24} strokeWidth={1.2} />
               <button onClick={() => setIsEditing(true)}>
                  <SettingsIcon size={24} strokeWidth={1.2} />
               </button>
            </div>
          </div>

          <div className="bg-white">
             {/* Stats */}
             <div className="flex justify-around items-center py-5 border-b border-gray-100">
                <div className="flex flex-col items-center">
                   <span className="font-bold text-[17px] leading-none">{user?.discountsCount || 0}</span>
                   <span className="text-[10px] text-gray-500 mt-1.5 uppercase font-bold tracking-tight">Coupons</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-[17px] leading-none">{user?.loyaltyPoints || 0}</span>
                    <span className="text-[10px] text-gray-500 mt-1.5 uppercase font-bold tracking-tight">Points</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[17px] leading-none">£{(user?.walletBalance ?? 0).toFixed(2)}</span>
                      <span className="text-[10px] text-gray-500 mt-1.5 uppercase font-bold tracking-tight">Wallet</span>
                    </div>
                 </div>
                 <div className="flex flex-col items-center">
                    <Gift size={20} className="mb-1 text-gray-800" strokeWidth={1.5} />
                    <span className="text-[10px] text-gray-500 mt-0.5 uppercase font-bold tracking-tight">Gift Card</span>
                 </div>
             </div>

             {/* My Orders */}
             <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="font-bold text-[15px]">My Orders</h2>
                   <button onClick={() => setScreen('ORDERS')} className="text-gray-400 text-xs font-medium flex items-center">
                      View All <ChevronRight size={14} className="ml-0.5" />
                   </button>
                </div>
                <div className="flex justify-between px-1">
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <CreditCard size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-[11px] text-gray-700 font-medium">Unpaid</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <Archive size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-[11px] text-gray-700 font-medium">Processing</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <Truck size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-[11px] text-gray-700 font-medium">Shipped</span>
                      <div className="absolute top-0 right-1 border-2 border-white w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <MessageSquare size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-[11px] text-gray-700 font-medium">Review</span>
                   </div>
                   <div className="flex flex-col items-center relative cursor-pointer pt-2" onClick={() => setScreen('ORDERS')}>
                      <RotateCcw size={26} strokeWidth={1} className="mb-1.5 text-gray-800" />
                      <span className="text-[11px] text-gray-700 font-medium">Returns</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="mt-2 bg-white p-4">
             <h2 className="font-bold text-[15px] mb-4">More Services</h2>
             <div className="flex justify-start gap-8">
                <div className="flex flex-col items-center">
                   <div className="w-9 h-9 flex items-center justify-center text-gray-600 border border-gray-100 rounded-full mb-1">
                      <ShieldAlert size={18} strokeWidth={1.5} />
                   </div>
                   <span className="text-[10px] text-gray-500 font-medium">Support</span>
                </div>
                
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setScreen('ADMIN')}>
                   <div className="w-9 h-9 flex items-center justify-center text-[#188a42] border border-[#188a42] bg-[#f0f9f4] rounded-full mb-1">
                      <Settings size={18} strokeWidth={1.5} />
                   </div>
                   <span className="text-[10px] text-[#188a42] font-bold">Admin</span>
                </div>
             </div>
          </div>

          <div className="mt-2 bg-white p-4 pb-20">
             <button onClick={() => setScreen('AUTH')} className="w-full py-3 text-sm text-gray-500 font-medium border border-gray-200 rounded-sm">
                Sign Out
             </button>
          </div>
        </div>

        {/* Edit Settings Overlay */}
        {isEditing && (
          <div className="fixed inset-0 z-[100] bg-white flex flex-col">
            <div className="px-4 py-3 border-b flex items-center gap-4">
               <button onClick={() => setIsEditing(false)} className="p-1">
                  <ChevronRight size={24} className="rotate-180" />
               </button>
               <h2 className="font-bold text-lg">Settings</h2>
            </div>
            <div className="p-4 space-y-6">
               <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">User Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:bg-white focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:bg-white focus:border-black outline-none transition-all"
                    />
                  </div>
               </div>
               <button onClick={handleSave} className="w-full py-4 bg-black text-white font-bold rounded-sm shadow-lg active:scale-95 transition-all">
                  Save Changes
               </button>
            </div>
          </div>
        )}
      </MobileLayout>
    </div>
  );
};
