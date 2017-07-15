
const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
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




let url = "mongodb://localhost:27017/mydb";

let dbConnect = async function(err, db) {
  if (err) throw err;
  db.createCollection("customers");
  let col = db.collection("customers");
  let myobj = { name: "asd", address: "fgh" };
  
  await col.insertOne(myobj);
  let results = await col.findOne({name:"asd"});
  
  console.log(results);
  
  
}


MongoClient.connect(url, (err, db) => dbConnect(err,db) );



















