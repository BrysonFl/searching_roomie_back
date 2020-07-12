const MongoClient = require('mongodb').MongoClient;
const ReadProperties = require('../utils/ReadProperties');

class ConnectionDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new MongoClient(this.properties.getPropertiesDB().url,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getInstanceCollection(collection) {
    await this.client.connect();
    const collect = this.client.db(this.properties.getPropertiesDB().db).collection(collection);
    return collect;
  }

}

module.exports = ConnectionDB;