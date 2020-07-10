const ConnectionDB = require('./ConnectionDB');
const ReadProperties = require('../utils/ReadProperties');
const debug = require('debug')('ConnectionRoomsDB');

class ConnectionRoomsDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
  }

  async getRooms() {
    debug('Ingreso a obtener las habitaciones');
    try {
      const coll = await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms);
      const data = await coll.find();
      return data;
    } catch(err) {
      return err;
    }
  }
}

module.exports = ConnectionRoomsDB;