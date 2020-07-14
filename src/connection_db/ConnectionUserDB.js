const ConnectionDB = require('./ConnectionDB');
const ReadProperties = require('../utils/ReadProperties');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

class ConnectionUserDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
  }

  async loginUser(email) {
    try {
      if(email !== undefined && email !== null) {
        const user = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).findOne({email: email});
        // console.log(user)
        return user;
      }
    } catch (err) {
      return err;
    }
  }

  async getUserId(id) {
    try {
      const responseDB = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).findOne({_id: ObjectId(id)});
      return responseDB;
    } catch(err) {
      return err;
    }
  }

  async createUser(request) {
    try {
      console.log('Inicio de asd')
      request.password = await bcrypt.hash(request.password, 12);
      console.log('Ingreso a esto')
      const responseDB = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).insert(request);
      console.log(responseDB);
      return responseDB;
    } catch(err) {
      return err;
    }
  }
}

module.exports = ConnectionUserDB;