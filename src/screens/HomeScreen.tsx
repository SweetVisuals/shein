import React from 'react';
import { MobileHeroBanner } from '../components/home/MobileHeroBanner';
import { NewUserBanner } from '../components/home/NewUserBanner';
import { CategoryIcons } from '../components/home/CategoryIcons';
import { HomeGridSections } from '../components/home/HomeGridSections';
import { ProductGrid } from '../components/home/ProductGrid';
import { DesktopBanners } from '../components/home/DesktopBanners';
import { SignInOverlay } from '../components/home/SignInOverlay';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { MobileLayout } from '../components/layout/MobileLayout';
import { MobileHeader } from '../components/mobile/MobileHeader';
import { useAppContext } from '../context/AppContext';

export const HomeScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const { user } = useAppContext();

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout setScreen={setScreen}>
          <MobileHeader setScreen={setScreen} />
          <div onClick={() => setScreen('PLP')} className="cursor-pointer">
              <MobileHeroBanner />
              <NewUserBanner />
              <CategoryIcons />
              <HomeGridSections />
              <ProductGrid />
              {!user && <SignInOverlay setScreen={setScreen} />}
           </div>
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout>
           <DesktopBanners />
           <div className="mt-8 max-w-[800px] mx-auto">
             <CategoryIcons />
           </div>
        </DesktopLayout>
      </div>
    </>
  );
};
