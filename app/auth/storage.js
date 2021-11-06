import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

import logger from '../utility/logger';

const key = 'authToken';
const userKey = 'user';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    logger.log('Error storing the auth token', error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    logger.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const getStoredUser = async () => {
  try {
    return await SecureStore.getItemAsync(userKey);
  } catch (error) {
    logger.log('Error getting user from storage', error);
  }
};

const setUserInStorage = async (user) => {
  try {
    await SecureStore.setItemAsync(userKey, user);
  } catch (error) {
    logger.log('Error storing user', error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(userKey);
  } catch (error) {
    logger.log('Error removing user from storage', error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logger.log('Error removing auth token', error);
  }
};

export default {
  getUser,
  storeToken,
  removeToken,
  getToken,
  setUserInStorage,
  getStoredUser,
  removeUser,
};
