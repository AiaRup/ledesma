import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { I18nManager } from 'react-native';

import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import { OfflineNotice } from './app/components';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { navigationRef } from './app/navigation/RootNavigation';
import logger from './app/utility/logger';

logger.start();

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      const user = await authStorage.getUser();
      if (user) setUser(user);
      setIsReady(true);
    };
    restoreUser();
  }, []);

  return (
    <>
      {!isReady ? (
        <AppLoading onError={() => logger.log('Error on app loading')} />
      ) : (
        <AuthContext.Provider value={{ user, setUser }}>
          <OfflineNotice />
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </>
  );
}
