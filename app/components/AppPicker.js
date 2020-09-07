import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { PickerItem } from './PickerItem';
import { Screen } from './Screen';
import defaultStyles from '../config/styles';
import colors from '../config/colors';

export const AppPicker = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = '100%',
  disabled = false
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  console.log('disabled', disabled);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => !disabled && setModalVisible(!modalVisible)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={!disabled ? defaultStyles.colors.medium : defaultStyles.colors.inputLight}
              style={styles.icon}
            />
          )}
          <AppText
            style={selectedItem?.name ? styles.text : (!disabled ? styles.placeholder : styles.placeholderDisabled)}
          >
            {selectedItem?.name?.toString().toUpperCase() || placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={!disabled ? defaultStyles.colors.medium : defaultStyles.colors.inputLight}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Volver" onPress={() => setModalVisible(false)} style={styles.button} color={colors.secondary} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.name.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.name}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
                selected={item.name === selectedItem?.name}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
  },
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
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.medium,
  },
  placeholderDisabled: {
    flex: 1,
    color: defaultStyles.colors.inputLight,
  },
  text: {
    flex: 1,
  },
});
