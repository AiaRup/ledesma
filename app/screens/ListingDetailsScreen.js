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
    updatedAt,
  } = listing;

  return (
    <Screen style={styles.detailsContainer}>
      <View style={styles.listing}>
        {updatedAt && (
          <AppText style={styles.date}>
            {dayjs(updatedAt).format('DD/MM/YYYY HH:mm')}
          </AppText>
        )}
        <AppText style={styles.title}>Filtrado: {head?.name}</AppText>
        {operation && (
          <AppText style={styles.subTitle}>Operación: {operation}</AppText>
        )}
        <AppText style={styles.title}>Caudalímetro: {flowmeter}</AppText>
        {pressurePump && (
          <AppText style={styles.title}>
            Presión - Bomba: {pressurePump}
          </AppText>
        )}
        {pressureField && (
          <AppText style={styles.title}>
            Presión - Campo: {pressureField}
          </AppText>
        )}
        <View style={styles.userContainer}>
          {createdBy && (
            <ListItem
              image={createdBy.image}
              title={
                createdBy.name ? `Operdaor: ${createdBy.name}` : 'Not provided'
              }
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.light,
  },
  listing: {
    backgroundColor: colors.white,
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
  date: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'right',
  },
  userContainer: {
    marginVertical: 40,
  },
});
