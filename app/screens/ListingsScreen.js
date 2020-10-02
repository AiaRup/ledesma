import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Card, Screen } from '../components';
import routes from '../navigation/routes';
import colors from '../config/colors';

export const ListingsScreen = ({ navigation, route }) => {
  const listings = route.params;

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

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
