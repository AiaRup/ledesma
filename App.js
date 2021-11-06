import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { I18nManager } from 'react-native';

import { OfflineNotice } from './app/components';
import { AppContext } from './app/contexts/AppContext';
// import authStorage from './app/auth/storage';
import logger from './app/utility/logger';
import { AuthProvider } from './app/providers/AuthProvider';
import RootNavigator from './app/navigation/RootNavigator';

logger.start();

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   const restoreUser = async () => {
  //     const user = await authStorage.getUser();
  //     if (user) {
  //       setUser(user);
  //     }
  //     setIsReady(true);
  //   };
  //   restoreUser();
  // }, []);

  return (
    <>
      {/* {!isReady ? (
        <AppLoading onError={() => logger.log('Error on app loading')} />
      ) : ( */}
      <AppContext.Provider value={{ user, setUser }}>
        <AuthProvider>
          <OfflineNotice />
          {/* <NavigationContainer ref={navigationRef} theme={navigationTheme}>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer> */}
          <RootNavigator />
        </AuthProvider>
      </AppContext.Provider>
      {/* )} */}
    </>
  );
}
