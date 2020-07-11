const express = require('express');
const cors = require('cors');
const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection_db/ConnectionRoomsDB');
const ConnectionS3 = require('../connection_s3/ConnectionS3');

const api = express.Router();
api.use(cors());

api.get('/', (req, res) => {
  const db = new ConnectionRoomsDB();

  db.getRoomsHome()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

api.get('/description/:id', (req, res) => {
  const db = new ConnectionRoomsDB();
  console.log(`Ingreso con el id: ${req.params.id}`)

  db.getRoomId(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

api.get('/login', (req, res) => {
  const validation = new UserValidation();

  debug(`Ingreso a la ruta /login con ${req.body}`)

  validation.validateUser(req.body)
    .then(response => res.send({response: response}))
    .catch(err => res.send(err));
});

api.get('/d', (req, res) => {
  const s3 = new ConnectionS3();
  s3.getPhotoUser('users/30.-DLX-800x533.jpg')
    .then(bytes => res.status(200).json(bytes))
    .catch(err => res.send(err));
})

module.exports = api;