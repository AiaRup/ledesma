import React, { useState, useEffect } from 'react';
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
// import userApi from '../api/users';
// import useAuth from '../auth/useAuth';
// import authApi from '../api/auth';
// import useApi from '../hooks/useApi';
// import logger from '../utility/logger';
import { useAuth } from '../providers/AuthProvider';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  adminPassword: Yup.string().required().min(5).label('AdminPassword'),
  password: Yup.string().required().min(5).label('Password'),
  employee: Yup.string().matches(/^\d+$/).required().label('Employee'),
});

export const RegisterScreen = ({ navigation }) => {
  // const registerApi = useApi(userApi.register);
  // const loginApi = useApi(authApi.login);
  // const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      navigation.navigate(routes.SEARCH);
    }
  }, [user]);

  const handleSubmit = async ({ password, employee }) => {
    // const result = await registerApi.request({
    //   ...userInfo,
    //   employeeCode: userInfo.employee,
    // });
    // if (!result.ok) {
    //   if (result.data) setError(result.data.error);
    //   else {
    //     setError('An unexpected error occurred.');
    //     logger.log(result);
    //   }
    //   return;
    // }
    // const { data: authToken } = await loginApi.request({
    //   password: userInfo.password,
    //   employeeCode: userInfo.employee,
    // });
    // auth.logIn(authToken);
    setLoading(true);
    try {
      await signUp(employee, password);
      signIn(employee, password);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
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
            placeholder='Legajo'
            textContentType='none'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock-question'
            secureTextEntry
            name='adminPassword'
            placeholder='Admin Seña'
            textContentType='password'
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
