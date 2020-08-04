import React, { useState } from 'react';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';

import {
  Screen,
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  ActivityIndicator,
} from '../components';
import userApi from '../api/users';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import logger from '../utility/logger';

const validationSchema = Yup.object().shape({
  adminPassword: Yup.string().required().min(5).label('AdminPassword'),
  password: Yup.string().required().min(5).label('Password'),
  employee: Yup.string().matches(/^\d+$/).required().label('Employee'),
});

export const RegisterScreen = () => {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request({
      ...userInfo,
      employeeCode: userInfo.employee,
    });

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occurred.');
        logger.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request({
      password: userInfo.password,
      employeeCode: userInfo.employee,
    });
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ adminPassword: '', employee: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='account-circle'
            keyboardType='number-pad'
            name='employee'
            placeholder='Employee'
            textContentType='none'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock-question'
            secureTextEntry
            name='adminPassword'
            placeholder='Admin Password'
            textContentType='password'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />
          <SubmitButton title='Register' />
        </AppForm>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
