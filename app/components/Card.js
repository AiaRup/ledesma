import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { AppText } from '../components/AppText';
import colors from '../config/colors';

export const Card = ({ head, operation, flowmeter, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {head}
          </AppText>
          <AppText style={styles.title} numberOfLines={1}>
            {operation}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {flowmeter}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 7,
  },
});
