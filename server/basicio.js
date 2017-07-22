const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const url = require('url');
const WebSocket = require('ws');
const server = http.createServer(app);
const shortid = require('shortid');
const {Helpers, DBH} = require('./helpers.js');



const Locks = {};
global.Lock = (id) => new Promise(res => {
  Locks[id] = res;
});
global.Unlock = (id,val) => {
  if(id in Locks && Locks[id]) {
    Locks[id](val);
    Locks[id] = null;
  }
}


app.use('/', express.static('./../public'));
server.listen(3000, function() { 
  console.log('listening'); 
});

const wss = new WebSocket.Server({ server });
const Sockets = {};
wss.on('connection', function connection(ws) {
  let id = shortid.generate();
  Sockets[id] = ws;
  ws._id = id;
  //message icinde promise: _id, data: {}, comm: "", isResponse: flase, token: ""
  ws.on('message', function incoming(message) {
    bio['recieveClient'](message, ws._id);
  });
});

let bio = {};

bio.commandRecieve = function (message) {
  console.log("hey, kimse dinlemio commandRecieve u", message);
}
bio.recieveClient = function (message, token) {
  if(message.isResponse) {
    Unlock(message._id, message);
  } else {
    bio.commandRecieve(message);
  }
}
bio.sendClient = function (message, token) {
  Sockets[token].send(message);
  return Lock(message._id);
}



module.exports = {
  bio,
};









