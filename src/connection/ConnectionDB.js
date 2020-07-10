const MongoClient = require('mongodb').MongoClient;
const ReadProperties = require('../utils/ReadProperties');

class ConnectionDB {

  async getInstanceCollection(collection) {
    const properties = new ReadProperties();
    const client = new MongoClient(properties.getPropertiesDB().url);
    await client.connect();
    return client.db(properties.getPropertiesDB().db).collection(collection);
  }

}

module.exports = ConnectionDB;