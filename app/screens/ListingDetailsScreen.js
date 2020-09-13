import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';

import { ListItem, AppText } from '../components';
import colors from '../config/colors';

export const ListingDetailsScreen = ({ route }) => {
  const listing = route.params;

  console.log('====================================');
  console.log('listing', listing);
  console.log('====================================');
  const { head, operation, flowmeter, pressurePump, pressureField, createdBy, createdAt}

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <View style={styles.detailsContainer}>
        {createdAt && <AppText style={styles.title}>{createdAt}</AppText>}
        {createdBy && <AppText style={styles.title}>{createdBy}</AppText>}
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{head.name}</AppText>
        <AppText style={styles.title}>{flowmeter}</AppText>
        {pressurePump && <AppText style={styles.title}>{pressurePump}</AppText>}
        {pressureField && <AppText style={styles.title}>{pressureField}</AppText>}
        {operation && <AppText style={styles.price}>{operation}</AppText>}
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/mosh.jpg')}
            title='Mosh Hamedani'
            subTitle='5 Listings'
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
  price: {
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
