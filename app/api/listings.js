import client from './client';

const endpoint = '/listings';

const getListings = (search = '') => client.get(`${endpoint}${search}`);

const getLatestListing = (headId) => client.get(`${endpoint}?head=${headId}`);

const addListing = (
  { head, operation, pressurePump, pressureField, flowmeter, location },
  onUploadProgress
) => {
  const data = {
    head: head._id,
    operation: operation.name,
    flowmeter,
    pressurePump,
    pressureField,
    location: location,
  };

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getLatestListing,
  getListings,
};
