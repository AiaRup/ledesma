import { ObjectId } from 'bson';

class Head {
  /**
   *
   * @param {string} name The name of the head
   * @param {string} farm The farm of the head
   * @param {string} area The area of the head
   * @param {string} system The system of the head
   * @param {string} active If the head is active or not
   * @param {string} operators The operators for this head
   * @param {string} operations The operations for this head
   * @param {ObjectId} id The ObjectId to create this head with
   */
  constructor({
    name,
    partition,
    farm,
    area,
    system,
    active,
    id = new ObjectId(),
    updatedAt = new Date(),
    operators,
    operations,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.farm = farm;
    this.area = area;
    this.system = system;
    this.active = active;
    this.updatedAt = updatedAt;
    this.operators = operators;
    this.operations = operations;
  }

  static schema = {
    name: 'Head',
    properties: {
      _id: 'objectId',
      name: 'string',
      farm: 'objectId',
      area: 'number',
      system: 'string',
      active: 'boolean',
      updatedAt: 'date',
      operators: ['objectId'],
      operations: {
        active: 'boolean',
        name: 'number',
        flow: 'number',
        field: {
          min: 'number',
          max: 'number',
        },
        pump: {
          min: 'number',
          max: 'number',
        },
      },
    },
    primaryKey: '_id',
  };
}

export { Head };
