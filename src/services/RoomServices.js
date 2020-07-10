const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const ConnectionRoomsDB = require('../connection/ConnectionRoomsDB');

app.use(cors());
app.use(bodyParser.json());
app.listen(4000, console.log('Port: 4000'));

app.get('/h', (req, res) => {
  const roomsDB = new ConnectionRoomsDB();
  roomsDB.getRooms()
    .then(response => res.json(response))
    .catch(err => res.json(err));
});