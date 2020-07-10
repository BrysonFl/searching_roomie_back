const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserValidation = require('../utils/UserValidations');

app.use(bodyParser.json());

app.get('/login', (req, res) => {
  const validation = new UserValidation();

  // console.log('Ingreso')

  validation.validateUser(req.body)
    .then(response => res.send({response: response}))
    .catch(err => res.send(err));
})

app.post('/create-user', (req, res) => {

});

app.listen(3000, console.log('Port: 3000'));