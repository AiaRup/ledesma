import client from './client';

const getHeads = () => client.get('/heads');
const updateHeadStatus = (id, body) => client.put(`/heads/${id}`, body);

export default {
  getHeads,
  updateHeadStatus,
};
