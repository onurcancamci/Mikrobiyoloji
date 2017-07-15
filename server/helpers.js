const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const url = require('url');
const WebSocket = require('ws');
const server = http.createServer(app);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

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
const Sockets = [];
wss.on('connection', function connection(ws) {
  Sockets.push({
    userid : "",
    ws : ws,
  });
  ws.on('message', function incoming(message) {
    
  });
});



let Helpers = {};
Helpers.ShallowCopy = function (obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
Helpers.JSONCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}
Helpers.MergeArrays = function (arr1, arr2) {
  for(let e of arr2) {
    if(arr1.findIndex(x => x == e) == -1) arr1.push(e);
  }
  return arr1;
}












module.exports = {
  Helpers,
}

















