import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import dayjs from 'dayjs';

import { ListItem, AppText } from '../components';
import colors from '../config/colors';

export const ListingDetailsScreen = ({ route }) => {
  const listing = route.params;

  console.log('====================================');
  console.log('listing', listing);
  console.log('====================================');
  const {
    head = {},
    operation,
    flowmeter,
    pressurePump,
    pressureField,
    createdBy = {},
    createdAt,
  } = listing;

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <View style={styles.detailsContainer}>
        {createdAt && (
          <AppText style={styles.title}>
            {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
          </AppText>
        )}
        {createdBy && <AppText style={styles.title}>{createdBy}</AppText>}
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{flowmeter}</AppText>
        {pressurePump && <AppText style={styles.title}>{pressurePump}</AppText>}
        {pressureField && (
          <AppText style={styles.title}>{pressureField}</AppText>
        )}
        {operation && <AppText style={styles.subTitle}>{operation}</AppText>}
        <View style={styles.userContainer}>
          <ListItem
            image={createdBy.image}
            title={createdBy.name || 'Not provided'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
