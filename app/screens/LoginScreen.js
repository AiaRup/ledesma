import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';

import {
  ErrorMessage,
  Screen,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(5).label('Password'),
  employee: Yup.string().matches(/^\d+$/).required().label('Employee'),
});

export const LoginScreen = () => {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ password, employee }) => {
    setLoading(true);
    const result = await authApi.login({
      password,
      employeeCode: employee,
    });
    setLoading(false);
    if (!result.ok) {
      setLoginFailed(true);
      return setError(result.problem);
    }
    setLoginFailed(false);
    setError(null);
    auth.logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-blue.png')} />
      <AppForm
        initialValues={{ employee: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error={error || 'Invalid employee and/or password'}
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='account-circle'
          keyboardType='number-pad'
          name='employee'
          placeholder='Legajo'
          textContentType='none'
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Contraseña'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton title='Login' />
      </AppForm>
      {loading && (
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
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
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
