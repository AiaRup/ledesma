import React from 'react';
import { FlatList } from 'react-native';

import { Card, Screen } from '../components';
import routes from '../navigation/routes';

export const ListingsScreen = ({ navigation, listings }) => {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Card
            head={item.head?._id}
            operation={item.operation?.name}
            flowmeter={item.flowmeter}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
};
