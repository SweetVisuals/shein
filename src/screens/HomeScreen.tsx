import React from 'react';
import { MobileHeroBanner } from '../components/home/MobileHeroBanner';
import { NewUserBanner } from '../components/home/NewUserBanner';
import { CategoryIcons } from '../components/home/CategoryIcons';
import { SuperDeals } from '../components/home/SuperDeals';
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
          <div onClick={() => setScreen('SEARCH')} className="cursor-pointer">
             <MobileHeader />
          </div>
          <div onClick={() => setScreen('PLP')} className="cursor-pointer">
             <MobileHeroBanner />
             <NewUserBanner />
             <CategoryIcons />
             <SuperDeals />
          </div>
          {!user && <SignInOverlay setScreen={setScreen} />}
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout>
           <DesktopBanners />
           <div className="mt-8 max-w-[800px] mx-auto">
             <CategoryIcons />
           </div>
           {!user && <SignInOverlay setScreen={setScreen} />}
        </DesktopLayout>
      </div>
    </>
  );
};
