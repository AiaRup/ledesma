import client from './client';

const login = (userInfo) => client.post('/users/login', { ...userInfo });

export default {
  login,
};
