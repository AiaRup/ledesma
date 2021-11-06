export const farmSchema = {
  name: 'farms',
  properties: {
    _id: 'objectId',
    name: 'string',
    _partition: 'string',
  },
  primaryKey: '_id',
};
