import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ListingsScreen, ListingDetailsScreen, SearchScreen } from '../screens';
import routes from './routes';

const Stack = createStackNavigator();

export default FeedNavigator = () => (
  <Stack.Navigator mode='modal'>
    <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
    <Stack.Screen name={routes.LISTING} component={ListingsScreen} />
    <Stack.Screen
      name={routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
    />
  </Stack.Navigator>
);
