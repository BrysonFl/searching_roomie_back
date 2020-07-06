const MongoClient = require('mongodb').MongoClient;

class ConnectionDB {
  
  URL = "mongodb+srv://administrador:2yBFyozglk27U5Lo@cluster0.aeklz.mongodb.net/searching_roomie?retryWrites=true&w=majority";

  createUserRoomie(res) {
    MongoClient.connect(this.URL, (err, client) => {
      if (err) return err;
      client.db('searching_roomie').collection('users').insert(res);
    });
  }

  createUserHost(res) {
    MongoClient.connect(this.URL, (err, client) => {
      if (err) return err;
      client.db('searching_roomie').collection('users_host').insert(res);
    });
  }
}

module.exports = ConnectionDB;