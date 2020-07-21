const ConnectionDB = require('./ConnectionDB');
const ReadProperties = require('../utils/ReadProperties');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const ConnectionS3 = require('../connection_s3/ConnectionS3');

class ConnectionUserDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
    this.s3 = new ConnectionS3();
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

  async getIdUserByEmail(email) {
    try {
      const {_id, role} = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).findOne({email: email});
      return {_id, role};
    } catch(err) {
      return err;
    }
  }

  async getEmail(email) {
    try {
      const emailExist = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).findOne({email: email});
      if(emailExist) {
        return true;
      }
    } catch(err) {
      return err;
    }
  }

  async createUser(request) {
    const emailExist = this.getEmail(request.email);

    if(emailExist) {
      return 'El email ingresado ya existe en nuestra base de datos';
    } else {
      try {
        request.password = await bcrypt.hash(request.password, 12);
        request.photo = await this.s3.createPhotoUser(request.photo);
        const responseDB = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_users)).insertOne(request);
        return responseDB;
      } catch(err) {
        return err;
      }
    }
  }
}

module.exports = ConnectionUserDB;