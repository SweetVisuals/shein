import React from 'react';
import { MobileBottomNav } from '../mobile/MobileBottomNav';

export const MobileLayout = ({ children, hideNav = false, setScreen }: { children: React.ReactNode, hideNav?: boolean, setScreen?: (s: string) => void }) => {
  return (
    <div className="flex lg:hidden flex-col min-h-screen bg-[#F8F8F8]">
      <main className={`flex-1 overflow-y-auto no-scrollbar ${hideNav ? '' : 'pb-[60px]'}`}>
        {children}
      </main>
      {!hideNav && <MobileBottomNav setScreen={setScreen} />}
    </div>
  );
};
