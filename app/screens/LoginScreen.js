import React, { useState, useEffect } from 'react';
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
// import authApi from '../api/auth';
// import useAuth from '../auth/useAuth';
// import useApi from '../hooks/useApi';
import { useAuth } from '../providers/AuthProvider';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(5).label('Password'),
  employee: Yup.string().matches(/^\d+$/).required().label('Employee'),
});

export const LoginScreen = ({ navigation }) => {
  // const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const loginApi = useApi(authApi.login);
  const { user, signIn } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      navigation.navigate(routes.SEARCH);
    }
  }, [user]);

  const handleSubmit = async ({ password, employee }) => {
    setLoading(true);
    // const { data: result, error } = await loginApi.request({
    //   password,
    //   employeeCode: employee,
    // });
    try {
      await signIn(employee, password);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoginFailed(true);
      setError(error.message);
    }
    setLoading(false);
    // auth.logIn(result);
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
