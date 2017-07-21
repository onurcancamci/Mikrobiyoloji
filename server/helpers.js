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
const dburl = "mongodb://localhost:27017/tipdb";
const Locks = {};
const ObjectID = mongodb.ObjectID;

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

let DB;
let Collections = {};
//sadece push
let CommandQ = [];
let dbConnect = async function(err, db) {
  if (err) throw err;
  console.log("Connected");
  DB = db;
  
  ["bakteriler","indexPaths","cores","searchIndexes"].map(c => {
    db.createCollection(c);
    Collections[c] = db.collection(c);
  });
  
  
  for(c of CommandQ) {
    await DBCommandParser(c);
  }
  
  CommandQ = new Proxy({}, {
    get: function (target, prop, reciever) {
      if(prop == "push") {
        return (val) => DBCommandParser(val);
      } else {
        console.log("Error Error, CommandQ ya sadece push yapilir", prop);
      }
    }
  });
  
  DBH.onConnected.map(x => x());
  
}
//comm = {comm : "insertOne",col: "", args: [a,b,c]}
let DBCommandParser = async function (comm) {
  //console.log(Collections);
  //console.log(comm);
  let ret = await Collections[comm.col][comm.comm](...comm.args);
  return ret;
}

MongoClient.connect(dburl, (err, db) => dbConnect(err,db));

let DBH = {};
DBH.onConnected = [];
DBH.CreateCore = async function (name, globalStatus, online, type) {
  
  let entry = {};
  entry.name = name;
  entry.index = {};
  entry.searchIndex = [];
  entry.objs = {};
  entry.global = globalStatus;
  entry.online = online;
  entry.type = type;
  if(CommandQ.push({col:"cores", comm:"findOne", args:[{name:name}]})) {
    //CommandQ.push({col:"cores",comm:"updateOne",args:[{name:core.name},entry]});
  } else {
    await CommandQ.push({col:"cores",comm:"insertOne",args:[entry]});
  }
}

DBH.GetIndexPath = async function (pathfield, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`index.${pathfield}`] : 1}]});
  if(typeof id.index[pathfield] === "undefined") {
    let ptf = {path: pathfield, objs: [], coreName: coreName};
    DBH.SetIndexPath(ptf, coreName); //await?
    return ptf;
  } else {
    id = id.index[pathfield];
    return await CommandQ.push({col:"indexPaths", comm:"findOne", args: [{_id: ObjectID(id)}]});
  }
}
DBH.SetIndexPath = async function (indexpath, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`index.${indexpath.path}`] : 1}]});
  if(typeof id.index[indexpath.path] === "undefined") {
    let insid = (await CommandQ.push({col:"indexPaths", comm:"insertOne", args: [indexpath]})).insertedId;
    CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$set: {[`index.${indexpath.path}`]: insid}}]}); //await?
  } else {
    id = id.index[indexpath.path];
    CommandQ.push({col: "indexPaths", comm: "updateOne", args: [{_id: ObjectID(id)}, indexpath] });//await?
  }
}
DBH.AddObjToIndex = async function (path, objid, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`index.${path}`] : 1}]});
  if(typeof id.index[path] === "undefined") {
    let ptf = {path: path, objs: [objid], coreName: coreName};
    DBH.SetIndexPath(ptf, coreName); //await?
    return ptf;
  } else {
    id = id.index[path];
    CommandQ.push({col:"indexPaths", comm:"updateOne", args: [{_id: ObjectID(id), objs: {$ne: objid}}, {$push: {[`objs`] : objid}}]});
  }
}
DBH.RemoveIndexPath = async function (path, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`index.${path}`] : 1}]});
  if(typeof id.index[path] !== "undefined") {
    id = id.index[path];
    CommandQ.push({col:"indexPaths", comm:"deleteOne", args: [{_id: ObjectID(id)}]});
    CommandQ.push({col: "cores", comm: "updateOne", args: [{name: coreName}, {$unset: {[`index.${path}`]: ""}} ] });
  }
}
//returns NOTHING
RemoveFromIndex = async function (indexid, _idObj) {
  CommandQ.push({col: "indexPaths", comm: "updateOne", args: [{_id: ObjectID(indexid)}, {$pull: {[`objs`]: ObjectID(_idObj)}}] });
}
DBH.SetObject = async function (obj, objid, type, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${objid}`] : 1}]});
  if(typeof id.objs[objid] === "undefined") {
    let insid = (await CommandQ.push({col:type, comm:"insertOne", args: [obj]})).insertedId;
    CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$set: {[`objs.${objid}`]: insid}}]}); //await?
  } else {
    id = id.objs[objid];
    CommandQ.push({col: type, comm: "updateOne", args: [{_id: ObjectID(id)}, obj] });//await?
  }
}
DBH.GetObject = async function (objid, type, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${objid}`] : 1}]});
  if(typeof id.objs[objid] === "undefined") {
    return null;
  } else {
    id = id.objs[objid];
    return await CommandQ.push({col:type, comm:"findOne", args: [{_id: ObjectID(id)}]});
  }
}
DBH.GetObjectId = async function (objid, type, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${objid}`] : 1}]});
  if(typeof id.objs[objid] === "undefined") {
    return null;
  } else {
    id = id.objs[objid];
    return id;
  }
}
DBH.RemoveObject = async function (objid, type, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${objid}`] : 1}]});
  if(typeof id.objs[objid] !== "undefined") {
    id = id.objs[objid];
    await CommandQ.push({col: "indexPaths", comm: "updateMany", args: [{coreName: coreName, objs: id}, {$pull: {objs: id}}] });
    await CommandQ.push({col: "cores", comm: "updateOne", args: [{name: coreName}, {$unset: {[`objs.${objid}`]: ""}} ] });
    await CommandQ.push({col: type, comm: "deleteOne", args: [{_id: ObjectID(id)}] });
    
  }
}

DBH.Close = async function () {
  await DB.close();
}



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



//CommandQ.push({name:"adf"});

//setTimeout(() => CommandQ.push({name:"adf2"}), 2000);





module.exports = {
  Helpers, DBH
}

















