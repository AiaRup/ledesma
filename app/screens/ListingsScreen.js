import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  ActivityIndicator,
  AppButton,
  AppText,
  Card,
  Screen,
} from '../components';
import colors from '../config/colors';
import routes from '../navigation/routes';
import listingsApi from '../api/listings';
import useApi from '../hooks/useApi';

export const ListingsScreen = ({ navigation }) => {
  // const { data: listings, error, loading, request: loadListings } = useApi(
  //   listingsApi.getListings
  // );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     loadListings();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // const listings = []
  // const loading = false
  // const error = false

  // return (
  //   <>
  //     <ActivityIndicator visible={loading} />
  //     <Screen style={styles.screen}>
  //       {error && (
  //         <>
  //           <AppText>Couldn't retrive the listings.</AppText>
  //           <AppButton title='Retry' onPress={loadListings} />
  //         </>
  //       )}
  //       <FlatList
  //         data={listings}
  //         keyExtractor={(listing) => listing._id.toString()}
  //         renderItem={({ item }) => (
  //           <Card
  //             title={item.title}
  //             subTitle={`$${item.price}`}
  //             imageUrl={item.images[0].url}
  //             onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
  //             thumbnailUrl={item.images[0].thumbnailUrl}
  //           />
  //         )}
  //       />
  //     </Screen>
  //   </>
  // )
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <Screen style={styles.screen}>
      <View>
        <View>
          <Button onPress={showDatepicker} title='Show date picker!' />
        </View>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='calendar'
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
