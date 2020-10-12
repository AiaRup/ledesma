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
            Filtrado: {head}
          </AppText>
          <AppText style={styles.title} numberOfLines={1}>
            Operación: {operation || 'Sin Operación'}
          </AppText>
          <View style={styles.textContainer}>
            <AppText style={styles.title}>
              Caudalímetro:{' '}
              <AppText style={styles.subTitle}>{flowmeter} m</AppText>
            </AppText>
            <AppText style={styles.upperText}>3</AppText>
          </View>
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
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 7,
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
