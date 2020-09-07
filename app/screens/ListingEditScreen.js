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
  operation: Yup.number().min(1).max(6),
  flowmeter: Yup.number().required(),
  pressurePump: Yup.number(),
  pressureField: Yup.number()
});

export const ListingEditScreen = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [operation, setOperation] = useState({});

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
          farm: '',
          head: '',
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
          icon='tractor'
        />
        <AppFormPicker
          items={heads}
          name='head'
          placeholder='Filtrado'
          icon='filter'
          dependedField='farm'
          dependedFunc={(dependedValue) => heads.filter(value => value.farm._id === dependedValue)}
        />
        <AppFormPicker
          items={heads}
          name='operation'
          placeholder='Operacion'
          icon='format-list-numbered'
          dependedField='head'
          onChange={(value) => setOperation(value)}
          dependedFunc={(dependedValue) => {
            const head = heads.filter(value => value._id === dependedValue);
            return head.length ? head[0].operations : [];
          }}
        />
        <AppFormField
          maxLength={255}
          multiline
          name='flowmeter'
          placeholder='Caudalimetro'
          icon='water-pump'
        />
        <AppFormField
          maxLength={255}
          multiline
          name='pressurePump'
          placeholder='Presion - Bomba'
          validate={(value) => {
            if (value < operation.pump.min || value > operation.pump.max) {
              return `Value should be between ${operation.pump.min} and ${operation.pump.max}`
            }
          }}
        />
        <AppFormField
          maxLength={255}
          multiline
          name='pressureField'
          placeholder='Presion - Campo'
          validate={(value) => {
            if (value < operation.field.min || value > operation.field.max) {
              return `Value should be between ${operation.field.min} and ${operation.field.max}`
            }
          }}
        />
        <SubmitButton title='Enviar' />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
