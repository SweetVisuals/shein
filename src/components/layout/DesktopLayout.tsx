import React, { useState } from 'react';
import { DesktopHeader } from '../desktop/DesktopHeader';
import { Footer } from '../desktop/Footer';

export const DesktopLayout = ({ children, setScreen }: { children: React.ReactNode, setScreen?: (s: string) => void }) => {
  return (
    <div className="hidden lg:flex flex-col min-h-screen bg-white">
      <DesktopHeader />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};
