/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
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

export default function App() {
  const [screen, setScreen] = useState('SPLASH');

  return (
    <AppProvider>
      {screen === 'SPLASH' && <SplashScreen onComplete={() => setScreen('HOME')} />}
      {screen === 'HOME' && <HomeScreen setScreen={setScreen} />}
      {screen === 'SEARCH' && <SearchScreen setScreen={setScreen} />}
      {screen === 'PLP' && <PLPScreen setScreen={setScreen} />}
      {screen === 'PDP' && <PDPScreen setScreen={setScreen} />}
      {screen === 'CART' && <CartScreen setScreen={setScreen} />}
      {screen === 'AUTH' && <AuthScreen setScreen={setScreen} />}
      {screen === 'CHECKOUT' && <CheckoutScreen setScreen={setScreen} />}
      {screen === 'PROFILE' && <ProfileScreen setScreen={setScreen} />}
      {screen === 'ORDERS' && <OrdersScreen setScreen={setScreen} />}
      {screen === 'TRACKING' && <TrackingScreen setScreen={setScreen} />}
      {screen === 'ADMIN' && <AdminScreen setScreen={setScreen} />}
    </AppProvider>
  );
}
