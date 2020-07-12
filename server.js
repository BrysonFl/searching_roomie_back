const http = require('http');
const express = require('express');

const api = require('./src/router/api');
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

app.use('/', api);

server.listen(port, () => {
  console.log(`API-searching_roomie server listening on port' ${port}`);
})