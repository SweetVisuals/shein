import React from 'react';
import { MobileBottomNav } from '../mobile/MobileBottomNav';
import { Bell, X } from 'lucide-react';

export const MobileLayout = ({ children, hideNav = false, setScreen }: { children: React.ReactNode, hideNav?: boolean, setScreen?: (s: string) => void }) => {
  return (
    <div className="flex lg:hidden flex-col min-h-screen bg-[#F8F8F8] relative">
      <main className={`flex-1 overflow-y-auto no-scrollbar ${hideNav ? '' : 'pb-[60px]'}`}>
        {children}
      </main>

      {/* Floating Reminder Bell with close button */}
      <div className="fixed bottom-24 right-4 z-40">
        <div className="relative">
          <button className="absolute -top-1 -left-1 bg-black/60 text-white rounded-full p-0.5 z-10">
            <X size={10} strokeWidth={3} />
          </button>
          <button className="bg-[#e4ff7a] p-3 rounded-full shadow-lg flex items-center justify-center relative group active:scale-95 transition-transform">
            <Bell size={26} className="text-black" fill="currentColor" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      {!hideNav && <MobileBottomNav setScreen={setScreen} />}
    </div>
  );
};
