import React from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

import { ListItem, AppText, Screen } from '../components';
import colors from '../config/colors';

export const ListingDetailsScreen = ({ route }) => {
  const listing = route.params;

  const {
    head = {},
    operation,
    flowmeter,
    pressurePump,
    pressureField,
    createdBy,
    createdAt,
  } = listing;

  return (
    <Screen style={styles.detailsContainer}>
      <>
        {createdAt && (
          <AppText style={styles.title}>
            {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
          </AppText>
        )}
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{flowmeter}</AppText>
        {pressurePump && <AppText style={styles.title}>{pressurePump}</AppText>}
        {pressureField && (
          <AppText style={styles.title}>{pressureField}</AppText>
        )}
        {operation && <AppText style={styles.subTitle}>{operation}</AppText>}
      </>
      <View style={styles.userContainer}>
        {createdBy && (
          <ListItem
            image={createdBy.image}
            title={createdBy.name || 'Not provided'}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});
