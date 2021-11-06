export const headSchema = {
  name: 'heads',
  properties: {
    _id: 'objectId',
    active: 'bool',
    area: 'double',
    farm: 'objectId',
    name: 'string',
    operations: 'head_operations[]',
    operators: 'objectId[]',
    system: 'string',
    updatedAt: 'date',
    _partition: 'string',
  },
  primaryKey: '_id',
};

export const head_operationsSchema = {
  name: 'head_operations',
  embedded: true,
  properties: {
    active: 'bool',
    field: 'head_operations_field',
    flow: 'double',
    name: 'int',
    pump: 'head_operations_pump',
  },
};

export const head_operations_fieldSchema = {
  name: 'head_operations_field',
  embedded: true,
  properties: {
    max: 'int',
    min: 'int',
  },
};

export const head_operations_pumpSchema = {
  name: 'head_operations_pump',
  embedded: true,
  properties: {
    max: 'int',
    min: 'int',
  },
};
