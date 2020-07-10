const debug = require('debug')('searching_roomie_back');
const express = require('express');
const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection/ConnectionRoomsDB');

const api = express.Router();

api.get('/', async (req, res) => {
  const db = new ConnectionRoomsDB();
  debug(`Ingreso a la petición con el request ${req.body}}`);
  const data = await db.getRooms();
  debug(`Trajó la data: ${data.address}`)
  res.json({response: data});
});

api.get('/login', (req, res) => {
  const validation = new UserValidation();

  debug(`Ingreso a la ruta /login con ${req.body}`)

  validation.validateUser(req.body)
    .then(response => res.send({response: response}))
    .catch(err => res.send(err));
})

module.exports = api;