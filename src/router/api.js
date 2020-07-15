const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const UserValidation = require('../utils/UserValidations');
const ConnectionRoomsDB = require('../connection_db/ConnectionRoomsDB');
const ConnectionUserDB = require('../connection_db/ConnectionUserDB');
const ConnectionS3 = require('../connection_s3/ConnectionS3');

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

  if(validate === true) {
    res.status(200).send({status: 200, token: token});
  } else {
    res.status(200).send({status: 401, response: validate})
  }
});

api.post('/rooms-host', async (req, res) => {
  const connectionUser = new ConnectionUserDB();
  const connectionRooms = new ConnectionRoomsDB();

  if(req.headers.authorization && req.body.email) {
    const tokenVerify = jwt.verify(req.headers.authorization, 'Secret Password');

    if(tokenVerify) {
      const user = await connectionUser.getIdUserEmail(req.body.email);

      if(user.role === 'Host') {
        const roomsHost = await connectionRooms.getAllRoomsHost(user._id);
        res.status(200).send({status: 200, rooms: roomsHost, role: user.role});
      } else {
        res.status(404).send({status: 404, message: `El usuario con el correo ${req.body.email} no es host`})
      }
    } else {
      res.status(401).send({message: 'No autorizado'});
    }
  }
});

api.post('/create-user', (req, res) => {
  const userDB = new ConnectionUserDB();

  userDB.createUser(req.body)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

api.get('/d', (req, res) => {
  const s3 = new ConnectionS3();
  s3.getPhotoUser('users/30.-DLX-800x533.jpg')
    .then(bytes => res.status(200).json(bytes))
    .catch(err => res.send(err));
});

module.exports = api;