import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppText } from './AppText';
import { Screen } from './Screen';
import defaultStyles from '../config/styles';
import colors from '../config/colors';

export const AppDatePicker = ({
  icon,
  date,
  onSelectItem,
  placeholder,
  width = '100%',
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateSelected, setDateSelected] = useState(date || new Date());

  const onChange = (event, selectedDate) => {
    setDateSelected(selectedDate);
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => !disabled && setModalVisible(!modalVisible)}
      >
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={
                !disabled
                  ? defaultStyles.colors.medium
                  : defaultStyles.colors.inputLight
              }
              style={styles.icon}
            />
          )}
          <AppText style={date ? styles.text : styles.placeholder}>
            {date || placeholder}
          </AppText>
          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={
              !disabled
                ? defaultStyles.colors.medium
                : defaultStyles.colors.inputLight
            }
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen>
          <Button
            title='Volver'
            onPress={() => setModalVisible(false)}
            style={styles.button}
            color={colors.secondary}
          />
          <DateTimePicker
            testID='dateTimePicker'
            value={dateSelected}
            is24Hour={true}
            display='calendar'
            onChange={onChange}
            maximumDate={new Date()}
          />
          <Button
            title='Selecionar Fecha'
            onPress={() => {
              setModalVisible(false);
              onSelectItem(dateSelected);
            }}
            style={styles.button}
            color={colors.secondary}
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
    marginTop: 3,
  },
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.medium,
  },
  text: {
    flex: 1,
  },
});
