const http = require('http');
const express = require('express');
const chalk = require('chalk');

const api = require('./src/router/api');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use('/', api);

server.listen(port, () => {
  console.log(`${chalk.bgBlackBright('API-searching_roomie server listening on port')} ${port}`);
})