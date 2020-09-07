import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
  Screen,
} from '../components';
import useLocation from '../hooks/useLocation';
import farmsApi from '../api/farms';
import headsApi from '../api/heads';
import { UploadScreen } from './UploadScreen';

const validationSchema = Yup.object().shape({
  farm: Yup.string().required('Campo Requerido.'),
  head: Yup.string().required('Campo Requerido.'),
  flowmeter: Yup.number().typeError('Caudalímetro tiene que ser un numero.').required('Campo Requerido.'),
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
      return alert('Error al guardar los datos.');
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
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
            pressurePump: '',
            pressureField: '',
            flowmeter: ''
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
            onChange={(value) => setSelectedHead(value)}
            dependedFunc={(dependedValue) => heads.filter(value => value.farm._id === dependedValue)}
          />
          <AppFormPicker
            items={heads}
            name='operation'
            placeholder='Operación'
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
            placeholder='Caudalímetro'
            icon='water-pump'
          />
          <AppFormField
            maxLength={255}
            multiline
            name='pressurePump'
            placeholder='Presión - Bomba'
            validate={(value) => {
              if (value < operation.pump.min || value > operation.pump.max) {
                return `El valor debe estar entre ${operation.pump.min} y ${operation.pump.max}`
              }
            }}
            disabled={!!selectedHead}
          />
          <AppFormField
            maxLength={255}
            multiline
            name='pressureField'
            placeholder='Presión - Campo'
            validate={(value) => {
              if (value < operation.field.min || value > operation.field.max) {
                return `El valor debe estar entre ${operation.field.min} y ${operation.field.max}`
              }
            }}
            disabled={!!selectedHead}
          />
          <SubmitButton title='Enviar Datos' />
        </AppForm>
      </ScrollView>

    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
