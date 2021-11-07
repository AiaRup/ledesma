import { ObjectId } from 'bson';

class Listing {
  /**
   *
   * @param {string} name The name of the listing
   * @param {string} head The head of the listing
   * @param {string} operation The operation of the listing
   * @param {string} flowmeter The flowmeter of the listing
   * @param {string} pressurePump The pressurePump of the listing
   * @param {string} pressureField The pressureField of the listing
   * @param {string} createdAt The date of creating this listing
   * @param {string} updatedAt The date of updating this listing
   * @param {string} createdBy The operator who created this listing
   * @param {string} location The location where this listing was created/updated
   * @param {ObjectId} id The ObjectId to create this listing with
   */
  constructor({
    name,
    partition,
    head,
    operation,
    flowmeter,
    pressurePump,
    pressureField,
    id = new ObjectId(),
    updatedAt = new Date(),
    createdAt,
    createdBy,
    location,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.head = head;
    this.operation = operation;
    this.flowmeter = flowmeter;
    this.pressurePump = pressurePump;
    this.pressureField = pressureField;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.location = location;
  }

  static schema = {
    name: 'Listing',
    properties: {
      _id: 'objectId',
      name: 'string',
      head: 'objectId',
      operation: 'number',
      flowmeter: 'number',
      pressurePump: 'number',
      pressureField: 'number',
      updatedAt: 'date',
      createdAt: 'date',
      createdBy: 'objectId',
      location: {
        latitude: 'number',
        longitude: 'number',
      },
    },
    primaryKey: '_id',
  };
}

export { Listing };
