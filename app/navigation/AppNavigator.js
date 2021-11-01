import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ListingEditScreen } from '../screens';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import { NewListingButton } from './NewListingButton';
import routes from './routes';
import useNotifications from '../hooks/useNotifications';

const Tab = createBottomTabNavigator();

export default AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      unmountOnBlur={false}
    >
      <Tab.Screen
        name={routes.SEARCH}
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.LISTINGS_EDIT}
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTINGS_EDIT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-settings-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
