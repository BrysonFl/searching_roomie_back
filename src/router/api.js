const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection_db/ConnectionRoomsDB');
const ConnectionUserDB = require('../connection_db/ConnectionUserDB');

const api = express.Router();
api.use(cors());
api.use(bodyParser.json({limit: "50mb"}));

api.get('/', (req, res) => {
  const db = new ConnectionRoomsDB();

  db.getRoomsHome()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

api.get('/description/:id', (req, res) => {
  const db = new ConnectionRoomsDB();

  db.getRoomId(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

api.post('/login', async (req, res) => {
  const validation = new UserValidation();

  const token = jwt.sign({user: req.body.email}, 'Secret Password', {
    expiresIn: 60 * 60 * 24
  });

  const validate = await validation.validateUser(req.body);

  if(validate.pass === true) {
    res.status(200).send({status: 200, token: token, email: req.body.email, role: validate.user.role});
  } else {
    res.status(401).send({status: 401, response: validate});
  }
});

api.post('/create-room', async (req, res) => {
  const connectionRooms = new ConnectionRoomsDB();

  try {
    const tokenVerify = jwt.verify(req.headers.authorization, 'Secret Password');

    if(tokenVerify) {
      const response = await connectionRooms.createRoom(req.body);
      res.status(200).send({status: 200, message: 'La habitación se ha creado satisfactoriamente', responseDB: response});
    }
  } catch(err) {
    res.status(400).send({status: 400, message: err});
  }
});

api.post('/rooms-host', async (req, res) => {
  const connectionRooms = new ConnectionRoomsDB();

  if(req.headers.authorization && req.body.email) {
    const tokenVerify = jwt.verify(req.headers.authorization, 'Secret Password');

    if(tokenVerify) {
      const roomsHost = await connectionRooms.getAllRoomsHost(req.body.email);
      res.status(200).send({status: 200, dataUserRooms: roomsHost});
    } else {
      res.status(401).send({message: 'No autorizado'});
    }
  }
});

api.post('/create-user', (req, res) => {
  const userDB = new ConnectionUserDB();

  userDB.createUser(req.body)
    .then(response => res.status(200).json({status: 200, message: response}))
    .catch(err => res.status(500).json(err));
});

api.post('/search', (req, res) => {
  const roomsDB = new ConnectionRoomsDB();

  console.log(req.body)

  roomsDB.getFilterRooms(req.body.price, req.body.country)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(err => console.log(err));
});

module.exports = api;