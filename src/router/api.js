const express = require('express');
const cors = require('cors');
const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection_db/ConnectionRoomsDB');

const api = express.Router();
api.use(cors());

api.get('/', (req, res) => {
  const db = new ConnectionRoomsDB();
  db.getRooms().then(response => {
    res.status(200).json({
      response
    })
  }).catch(err => {
    res.status(500).json({
      err
    })
    console.log(err)
  })
});



api.get('/login', (req, res) => {
  const validation = new UserValidation();

  debug(`Ingreso a la ruta /login con ${req.body}`)

  validation.validateUser(req.body)
    .then(response => res.send({response: response}))
    .catch(err => res.send(err));
})

module.exports = api;