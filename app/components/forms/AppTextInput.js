import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../config/styles';

export const AppTextInput = ({ icon, width = '100%', disabled, ...rest }) => {

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={disabled ? defaultStyles.colors.inputLight : defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={disabled ? defaultStyles.colors.inputLight : defaultStyles.colors.medium}
        style={defaultStyles.text}
        editable={disabled}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 3
  },
});
