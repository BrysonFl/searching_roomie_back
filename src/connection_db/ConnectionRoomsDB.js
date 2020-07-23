const ConnectionDB = require('./ConnectionDB');
const ConnectionUserDB = require('./ConnectionUserDB');
const ReadProperties = require('../utils/ReadProperties');
const ObjectId = require('mongodb').ObjectID;

class ConnectionRoomsDB {

  constructor() {
    this.properties = new ReadProperties();
    this.client = new ConnectionDB();
    this.connectionUser = new ConnectionUserDB();
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
      const {name, lastName, pleasures, photo, phoneNumber} = await this.connectionUser.getUserId(room.idUser);
      return {room: room, user: {name, lastName, pleasures, photo, phoneNumber}};
    } catch(err) {
      return err;
    }
  }

  async getAllRoomsHost(userEmail) {
    try {
      const userPhoto = await this.connectionUser.getPhotoUserByEmail(userEmail);
      const rooms = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).find({email: userEmail}).toArray();
      return {userPhoto, rooms};
    } catch(err) {
      return err;
    }
  }

  async getFilterRooms(price, country) {
    try {
      const roomsFilter = await (await this.client.getInstanceCollection(this.properties.getPropertiesDB().collection_rooms)).find({price: price, country: country}).toArray();
      return roomsFilter;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ConnectionRoomsDB;