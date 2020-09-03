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
import { useFormikContext } from 'formik';

import { AppText } from './AppText';
import { PickerItem } from './PickerItem';
import { Screen } from './Screen';
import defaultStyles from '../config/styles';

export const AppPicker = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = '100%',
  dependedField
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dependedValue, setDependedValue] = useState(null);

  if (dependedField) {
    const {
      values
    } = useFormikContext();
    setDependedValue(values[dependedField])
  }


  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <AppText
            style={selectedItem?.name ? styles.text : styles.placeholder}
          >
            {selectedItem?.name || placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Volver" onPress={() => setModalVisible(false)} style={styles.button} />
          <FlatList
            data={dependedField ? items.filter(value => value[dependedField] ===dependedValue[_id]): items}
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
    marginVertical: 20
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
  text: {
    flex: 1,
  },
});
