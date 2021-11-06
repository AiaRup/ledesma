import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import { navigationRef } from './RootNavigation';
import AuthNavigator from './AuthNavigator';
import navigationTheme from './navigationTheme';
import AppNavigator from './AppNavigator';
import { useAuth } from '../providers/AuthProvider';
import authStorage from '../auth/storage';

export default RootNavigator = () => {
  const { user, setUser } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      const user = await authStorage.getStoredUser();
      if (user) {
        setUser(user);
      }
      setIsReady(true);
    };
    restoreUser();
  }, []);

  return (
    <>
      {!isReady ? (
        <AppLoading onError={() => logger.log('Error on app loading')} />
      ) : (
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};
