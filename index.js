'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

let sockets = [];
wss.on('connection', function (socket) {

  sockets.push(socket);

  socket.on('message', function (msg) {
    sockets.forEach(s => s.send(msg));
  });

  socket.on('close', function () {
    sockets = sockets.filter(s => s !== socket);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});