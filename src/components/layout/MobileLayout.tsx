import React from 'react';
import { MobileBottomNav } from '../mobile/MobileBottomNav';
import { Bell } from 'lucide-react';

export const MobileLayout = ({ children, hideNav = false, setScreen }: { children: React.ReactNode, hideNav?: boolean, setScreen?: (s: string) => void }) => {
  return (
    <div className="flex lg:hidden flex-col min-h-screen bg-[#F8F8F8] relative">
      <main className={`flex-1 overflow-y-auto no-scrollbar ${hideNav ? '' : 'pb-[60px]'}`}>
        {children}
      </main>

      {/* Floating Reminder Bell */}
      <div className="fixed bottom-24 right-4 z-40">
        <button className="bg-[#e4ff7a] p-3 rounded-full shadow-lg border border-black/5 flex items-center justify-center relative group active:scale-95 transition-transform">
          <Bell size={26} className="text-black" fill="currentColor" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#e4ff7a]"></div>
        </button>
      </div>

      {!hideNav && <MobileBottomNav setScreen={setScreen} />}
    </div>
  );
};
