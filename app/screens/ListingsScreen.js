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
import farmsApi from '../api/farms';
import headsApi from '../api/heads';
const validationSchema = Yup.object().shape({
  farm: Yup.string().required('Campo Requerido.'),
  head: Yup.string().required('Campo Requerido.'),
});

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
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getFarmsList = async () => {
    const farmsResult = await farmsApi.getFarms();
    setFarms(farmsResult?.data?.docs || []);
  };

  const getHeadsList = async () => {
    const headsResult = await headsApi.getHeads();
    setHeads(headsResult?.data?.docs || []);
  };

  async function getData() {
    setLoading(true);
    await getFarmsList();
    await getHeadsList();
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const resetState = () => {
    setLoading(false);
    setSelectedHead(null);
    setSelectedFarm(null);
    setFarms([]);
    setHeads([]);
  };

  const handleSubmit = async (parameters, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const searchParams = `?head=${parameters.head}&updatedAt=${parameters.date}`;
    const result = await listingsApi.getListings(searchParams, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Error al buscar un listing.');
    }

    resetForm();
    resetState();
    navigation.navigate(routes.LISTING_DETAILS, result.data);
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
      <AppForm
        initialValues={{
          farm: '',
          head: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormPicker
          items={farms}
          name='farm'
          placeholder='Quinta'
          icon='tractor'
          onChange={(value) => {
            setSelectedFarm(value);
            setSelectedHead(null);
            setOperation({});
          }}
          loading={loading}
        />
        <AppFormPicker
          items={heads}
          name='head'
          placeholder='Filtrado'
          icon='filter'
          dependedField='farm'
          onChange={(value) => setSelectedHead(value)}
          dependedFunc={(dependedValue) =>
            heads.filter((value) => value.farm._id === dependedValue)
          }
          disabled={!selectedFarm}
          loading={loading}
        />
        <SubmitButton title='Buscar' />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
