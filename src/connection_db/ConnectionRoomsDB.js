const ConnectionDB = require('./ConnectionDB');
const ConnectionUserDB = require('./ConnectionUserDB');
const ConnectionS3 = require('../connection_s3/ConnectionS3');
const ReadProperties = require('../utils/ReadProperties');
const ObjectId = require('mongodb').ObjectID;

class ConnectionRoomsDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
    this.connectionUser = new ConnectionUserDB();
    this.s3 = new ConnectionS3();
  }

  async getRoomsHome() {
    try {
      return await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).find().sort({amount: -1}).toArray();
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
      const roomsHost = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).find({idUser: id}).toArray();
      console.log(roomsHost);
      return roomsHost;
    } catch(err) {
      return err;
    }
  }
}

module.exports = ConnectionRoomsDB;