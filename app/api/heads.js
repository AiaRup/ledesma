import client from './client';

const getHeads = (userInfo) => client.get('/heads');

export default {
  getHeads,
};