const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ConnectionDB = require('../connection/ConnectionDB');
const connection = new ConnectionDB();

app.use(bodyParser.json());

app.get('/hola', (req, res) => {
  res.send({response: 'Todo bien GET'});
})

app.post('/create-user-roomie', (req, res) => {
  const response = connection.createUserRoomie(req.body);
  res.send(response);
});

app.post('/create-user-host', () => {
  connection
})

app.listen(3000, console.log('Port: 3000'));