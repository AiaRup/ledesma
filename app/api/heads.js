import client from './client';

const getHeads = () => client.get('/heads');

export default {
  getHeads,
};