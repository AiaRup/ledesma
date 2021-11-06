export const listingSchema = {
  name: 'listings',
  properties: {
    _id: 'objectId',
    createdAt: 'date',
    createdBy: 'objectId',
    flowmeter: 'int',
    head: 'objectId',
    location: 'listing_location',
    operation: 'int',
    pressureField: 'int',
    pressurePump: 'int',
    updatedAt: 'date',
    _partition: 'string',
  },
  primaryKey: '_id',
};

export const listing_locationSchema = {
  name: 'listing_location',
  embedded: true,
  properties: {
    latitude: 'double',
    longitude: 'double',
  },
};
