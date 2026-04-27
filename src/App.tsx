/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { PLPScreen } from './screens/PLPScreen';
import { PDPScreen } from './screens/PDPScreen';
import { CartScreen } from './screens/CartScreen';
import { AuthScreen } from './screens/AuthScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { TrackingScreen } from './screens/TrackingScreen';
import { AdminScreen } from './screens/AdminScreen';

function AppContent() {
  const { screen, navigateTo, goBack } = useAppContext();
  const setScreen = navigateTo;

  return (
    <>
      {screen === 'SPLASH' && <SplashScreen onComplete={() => navigateTo('HOME')} />}
      {screen === 'HOME' && <HomeScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'SEARCH' && <SearchScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'PLP' && <PLPScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'PDP' && <PDPScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'CART' && <CartScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'AUTH' && <AuthScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'CHECKOUT' && <CheckoutScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'PROFILE' && <ProfileScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'ORDERS' && <OrdersScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'TRACKING' && <TrackingScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
      {screen === 'ADMIN' && <AdminScreen setScreen={setScreen} navigateTo={navigateTo} goBack={goBack} />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
