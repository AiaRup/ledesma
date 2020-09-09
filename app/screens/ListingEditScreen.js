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
import listingsApi from '../api/listings';
import { UploadScreen } from './UploadScreen';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  farm: Yup.string().required('Campo Requerido.'),
  head: Yup.string().required('Campo Requerido.'),
  flowmeter: Yup.number()
    .typeError('Caudalímetro tiene que ser un numero.')
    .required('Campo Requerido.'),
  pressurePump: Yup.number(),
  pressureField: Yup.number(),
});

export const ListingEditScreen = ({ navigation }) => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [farms, setFarms] = useState([]);
  const [heads, setHeads] = useState([]);
  const [operation, setOperation] = useState({});
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestFlowmeter, setLatestFlowmeter] = useState(null);

  const getFarmsList = async () => {
    const farmsResult = await farmsApi.getFarms();
    setFarms(farmsResult?.data?.docs || []);
  };

  const getHeadsList = async () => {
    const headsResult = await headsApi.getHeads();
    setHeads(headsResult?.data?.docs || []);
  };

  const getLatestListing = async () => {
    const listing =
      (await listingsApi.getLatestListing(selectedHead._id)) || {};
    listing &&
      listing.data &&
      listing.data.docs.length &&
      setLatestFlowmeter(listing.data.docs[0].flowmeter);
    console.log('====================================');
    console.log(listing);
    console.log('====================================');
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getFarmsList();
      await getHeadsList();
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getLatestListing();
      setLoading(false);
    }
    getData();
  }, [selectedHead]);

  const resetState = () => {
    setLoading(false);
    setSelectedHead(null);
    setSelectedFarm(null);
    setFarms([]);
    setHeads([]);
    setOperation({});
  };

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Error al guardar los datos.');
    }

    const active = !!listing.operation;
    await headsApi.updateHeadStatus(selectedHead._id, { active });
    resetForm();
    resetState();
    navigation.navigate(routes.LISTING_DETAILS, result.data);
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
            flowmeter: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormPicker
            items={farms}
            name='farm'
            placeholder='Quinta'
            icon='tractor'
            onChange={(value) => setSelectedFarm(value)}
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
          <AppFormPicker
            items={heads}
            name='operation'
            placeholder='Operación'
            icon='format-list-numbered'
            dependedField='head'
            onChange={(value) => setOperation(value)}
            dependedFunc={(dependedValue) => {
              const head = heads.filter((value) => value._id === dependedValue);
              return head.length ? head[0].operations : [];
            }}
            disabled={!selectedHead}
          />
          <AppFormField
            maxLength={255}
            multiline
            name='flowmeter'
            placeholder='Caudalímetro'
            icon='water-pump'
            disabled={!!selectedHead}
          />
          <AppFormField
            maxLength={255}
            multiline
            name='pressurePump'
            placeholder='Presión - Bomba'
            validate={(value) => {
              if (value < operation.pump.min || value > operation.pump.max) {
                return `El valor debe estar entre ${operation.pump.min} y ${operation.pump.max}`;
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
                return `El valor debe estar entre ${operation.field.min} y ${operation.field.max}`;
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
