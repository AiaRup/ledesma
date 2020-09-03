import client from './client';

const getFarms = (userInfo) => client.get('/farms');

export default {
  getFarms,
};