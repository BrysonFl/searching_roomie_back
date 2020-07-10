const express = require('express');
const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection/ConnectionRoomsDB');

const api = express.Router();

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