import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  Screen,
  SubmitButton,
  AppForm,
  AppFormPicker,
  FormDatePicker,
} from '../components';
import { UploadScreen } from './UploadScreen';
import colors from '../config/colors';
import routes from '../navigation/routes';
import listingsApi from '../api/listings';
import farmsApi from '../api/farms';
import headsApi from '../api/heads';

const validationSchema = Yup.object().shape({
  farm: Yup.string().required('Campo Requerido.'),
  head: Yup.string().required('Campo Requerido.'),
  date: Yup.string().required('Campo Requerido.'),
});

export const SearchScreen = ({ navigation }) => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [, setSelectedHead] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const searchParams = `?head=${parameters.head._id}&updatedAt=${parameters.date}`;

    const result = await listingsApi.getListings(searchParams, (progress) =>
      setProgress(progress)
    );

    setProgress(0);
    setUploadVisible(false);
    if (!result.ok) {
      return alert('Error al buscar un registro.');
    }

    resetForm();
    resetState();
    navigation.navigate(routes.LISTING, result.data?.docs);
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.white,
  },
});
