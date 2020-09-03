import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from './AppText';
import colors from '../config/colors';

export const PickerItem = ({ item, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={selected ? [styles.container, { backgroundColor: colors.light }] : styles.container}>
        <AppText style={styles.text}>{item.name}</AppText>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  },
  text: {
    padding: 20,
    width: '100%',
    textAlign: 'center',

  }
});
