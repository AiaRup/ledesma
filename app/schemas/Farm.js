import { ObjectId } from 'bson';

class Farm {
  /**
   *
   * @param {string} name The name of the farm
   * @param {ObjectId} id The ObjectId to create this farm with
   */
  constructor({ name, partition, id = new ObjectId() }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
  }

  static schema = {
    name: 'Farm',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

export { Farm };
