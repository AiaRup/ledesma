import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  CategoryPickerItem,
  SubmitButton,
  Screen,
  FormImagePicker,
} from '../components';
import useLocation from '../hooks/useLocation';
import farmsApi from '../api/farms';
import headsApi from '../api/heads';
import { UploadScreen } from './UploadScreen';

const validationSchema = Yup.object().shape({
  farm: Yup.string().required(),
  head: Yup.string().required(),
  operation: Yup.number().required().min(1).max(6),
  flowmeter: Yup.number().required(),
  pressurePump: Yup.number().required(),
  pressureField: Yup.number().required(),
});

export const ListingEditScreen = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedHead, setSelectedHead] = useState(null);

  const getFarmsList = async () => {
    const farmsResult = await farmsApi.getFarms();
    setFarms(farmsResult?.data?.docs || []);
  }

  const getHeadsList = async () => {
    const headsResult = await headsApi.getHeads();
    setHeads(headsResult?.data?.docs || []);
  }

  useEffect(() => {
    getFarmsList();
  }, [])

  useEffect(() => {
    getHeadsList();
  }, [])

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    3;
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Could not save the listing.');
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          farm: selectedFarm,
          head: selectedHead,
          operation: '',
          pressurePump: null,
          pressureField: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormPicker
          items={farms}
          name='farm'
          placeholder='Quinta'
          value={selectedFarm}
        />
        <AppFormPicker
          items={heads}
          name='head'
          placeholder='Filtrado'
          value={selectedHead}
          icon='filter'
          dependedField='farm'
        />
        <AppFormPicker
          items={heads}
          name='operation'
          numberOfColumns={3}
          placeholder='Operacion'
          icon='format-list-numbered'
        />
        <AppFormField
          maxLength={255}
          multiline
          name='flowmeter'
          placeholder='Caudalimtro'
          icon='water-pump'
        />
        <AppFormField
          maxLength={255}
          multiline
          name='pressurePump'
          placeholder='Presion - Bomba'
        />
        <AppFormField
          maxLength={255}
          multiline
          name='pressureField'
          placeholder='Presion - Campo'
        />
        <SubmitButton title='Post' />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
