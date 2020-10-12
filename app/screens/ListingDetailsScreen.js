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
        <AppText style={styles.title}>
          Filtrado: <AppText style={styles.subTitle}>{head?.name}</AppText>
        </AppText>
        <AppText style={styles.title}>
          Operación:{' '}
          <AppText style={styles.subTitle}>
            {operation || 'Sin Operación'}
          </AppText>
        </AppText>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>
            Caudalímetro:{' '}
            <AppText style={styles.subTitle}>{flowmeter} m</AppText>
          </AppText>
          <AppText style={styles.upperText}>3</AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>
            Presión - Bomba:{' '}
            <AppText style={styles.subTitle}>
              {pressurePump || 'Sin Presión'}
            </AppText>
            {pressurePump && <AppText style={styles.subTitle}>kg/cm</AppText>}
            {pressurePump && <AppText style={styles.upperText}>2</AppText>}
          </AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>
            Presión - Campo:{' '}
            <AppText style={styles.subTitle}>
              {pressureField || 'Sin Presión'}
            </AppText>
            {pressurePump && <AppText style={styles.subTitle}>kg/cm</AppText>}
            {pressurePump && <AppText style={styles.upperText}>2</AppText>}
          </AppText>
        </View>
        {createdBy && (
          <View style={styles.userContainer}>
            <ListItem
              image={createdBy.image}
              title={
                createdBy.name ? `Operdaor: ${createdBy.name}` : 'Not provided'
              }
            />
          </View>
        )}
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
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
  },
  subTitle: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right',
    color: colors.medium,
    marginBottom: 8,
  },
  userContainer: {
    marginVertical: 40,
  },
  upperText: {
    fontSize: 11,
    lineHeight: 18,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
