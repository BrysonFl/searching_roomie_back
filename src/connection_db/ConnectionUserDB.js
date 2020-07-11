const ConnectionDB = require('./ConnectionDB');
const ReadProperties = require('../utils/ReadProperties');
const { ObjectId } = require('mongodb');

class ConnectionUserDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
  }

  async loginUser(email) {
    // console.log('Ingreso a loginUser')
    const client = new MongoClient(this.URL);
    console.log(client)
    console.log(email)

    try {
      // console.log(email)
      if(email !== undefined && email !== null) {
        console.log('Ingreso a este if loginUser')
        await client.connect();
        const user = await client.db('searching_roomie').collection('users').findOne({email: email});
        // console.log(user);
        return user;
      }
    } catch (err) {
      return err;
    } finally {
      client.close();
    }
  }

  async getUserId(id) {
    try {
      return await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).findOne({_id: ObjectId(id)});
    } catch(err) {
      return err;
    }
  }

  async createUser(request) {
    const client = new MongoClient(this.URL);
    request.password = await bcrypt.hash(request.password, 12);

    try {
      await client.connect();
      const res = await client.db('searching_roomie').collection('users').insertOne(request);
      return res;
    } catch(err) {
      return err;
    } finally {
      client.close();
    }
  }
}

module.exports = ConnectionUserDB;