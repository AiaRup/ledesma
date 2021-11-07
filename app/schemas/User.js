import { ObjectId } from 'bson';

class User {
  /**
   *
   * @param {string} name The name of the user
   * @param {string} memberOf List of project the user is a member of
   * @param {ObjectId} id The ObjectId to create this user with
   */
  constructor({ name, partition, memberOf, id = new ObjectId() }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.memberOf = memberOf;
  }

  static schema = {
    name: 'User',
    properties: {
      _id: 'objectId',
      name: 'string',
      memberOf: [{ name: 'string', partition: 'string' }],
    },
    primaryKey: '_id',
  };
}

export { User };
