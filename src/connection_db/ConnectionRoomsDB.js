const ConnectionDB = require('./ConnectionDB');
const ConnectionUserDB = require('./ConnectionUserDB');
const ConnectionS3 = require('../connection_s3/ConnectionS3');
const ReadProperties = require('../utils/ReadProperties');
const { response } = require('express');
const ObjectId = require('mongodb').ObjectID;

class ConnectionRoomsDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
    this.connectionUser = new ConnectionUserDB();
    this.s3 = new ConnectionS3();
  }

  async createRoom(request) {
    try {
      return await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).insertOne(request);
    } catch(err) {
      return err;
    }
  }

  async getRoomsHome() {
    try {
      return await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).find().sort({price: -1}).toArray();
    } catch(err) {
      return err;
    }
  }

  async getRoomId(id) {
    try {
      const room = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).findOne({_id: ObjectId(id)});
      const {name, lastName, pleasures, photo} = await this.connectionUser.getUserId(room.idUser);
      return {room: room, user: {name, lastName, pleasures, photo}};
    } catch(err) {
      return err;
    }
  }

  async getAllRoomsHost(id) {
    try {
      this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms).then(response => {
        console.log(id);
        return response.find({idUser: id})
      }).then(response => response.toArray()).then(response => console.log(response));
    } catch(err) {
      return err;
    }
  }
}

module.exports = ConnectionRoomsDB;