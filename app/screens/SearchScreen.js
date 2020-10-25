import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';

import {
  Screen,
  SubmitButton,
  AppForm,
  AppFormPicker,
  FormDatePicker,
} from '../components';
import colors from '../config/colors';
import routes from '../navigation/routes';
import listingsApi from '../api/listings';
import farmsApi from '../api/farms';
import headsApi from '../api/heads';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
  farm: Yup.string().required('Campo Requerido.'),
  head: Yup.string().required('Campo Requerido.'),
  date: Yup.string().required('Campo Requerido.'),
});

export const SearchScreen = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [, setSelectedHead] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [loading, setLoading] = useState(false);
  const farmApi = useApi(farmsApi.getFarms);


  const getFarmsList = async () => {
    const { data: farmsResult, status } = await farmApi.request();
    if (status === 400) {
      return logOut();
    }
    setFarms(farmsResult?.docs || []);
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
    setLoading(true);

    const searchParams = `?head=${parameters.head._id}&updatedAt=${parameters.date}`;

    const result = await listingsApi.getListings(searchParams);

    setLoading(false);
    if (!result.ok) {
      return alert('Error al buscar un registro.');
    }

    resetForm();
    resetState();
    navigation.navigate(routes.LISTING, result.data?.docs);
  };

  return (
    <Screen style={styles.screen}>
      <AppForm
        initialValues={{
          farm: '',
          head: '',
          date: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormPicker
          items={farms}
          name='farm'
          placeholder='Quinta'
          onChange={(value) => {
            setSelectedFarm(value);
            setSelectedHead(null);
          }}
          loading={loading}
        />
        <AppFormPicker
          items={heads}
          name='head'
          placeholder='Filtrado'
          dependedField='farm'
          onChange={(value) => setSelectedHead(value)}
          dependedFunc={(dependedValue) =>
            heads.filter((value) => value.farm._id === dependedValue)
          }
          disabled={!selectedFarm}
          loading={loading}
        />
        <FormDatePicker name='date' placeholder='Fecha' />
        <SubmitButton title='Buscar' />
      </AppForm>
      {loading && selectedFarm && (
        <View style={styles.animationWrapper}>
          <LottieView
            autoPlay
            loop
            source={require('../assets/animations/loading.json')}
            style={styles.animation}
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.white,
  },
  animation: {
    width: 120,
  },
  animationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});
