const ConnectionDB = require('./ConnectionDB');

class ConnectionRoomsDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
  }

  async getRooms() {
    try {
      const coll = await this.client
        .getInstanceCollection(this.properties.getPropertiesDB().collection_rooms);

      return this.client.properties;
    } catch(err) {
      return err;
    }
  }
}

module.exports = ConnectionRoomsDB;