export const userSchema = {
  name: 'users',
  properties: {
    _id: 'objectId',
    adminPassword: 'string',
    email: 'string',
    employeeCode: 'string',
    name: 'string',
    password: 'string',
    updatedAt: 'date',
    _partition: 'string',
  },
  primaryKey: '_id',
};
