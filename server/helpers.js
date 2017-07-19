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
  
  ["bakteriler","indexPaths","cores","searchIndexes", "localCores"].map(c => {
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
  entry.version = 0;
  if(CommandQ.push({col:"cores", comm:"findOne", args:[{name:name}]})) {
    //CommandQ.push({col:"cores",comm:"updateOne",args:[{name:core.name},entry]});
  } else {
    await CommandQ.push({col:"cores",comm:"insertOne",args:[entry]});
  }
}
DBH.IncrementVersion = async function (coreName) {
  CommandQ.push({col: "cores", comm: "updateOne", args: [{name: coreName}, {$inc: {version: 1}}]});
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
    await CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$set: {[`objs.${objid}`]: insid}}]}); //await?
    return insid;
  } else {
    id = id.objs[objid];
    await CommandQ.push({col: type, comm: "updateOne", args: [{_id: ObjectID(id)}, obj] });//await?
    return id;
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
    DBH.RemoveSearchTextObjid(id, coreName, type);
  }
}
DBH.CheckObject = async function (onurid, newHash, type, coreName) {
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${onurid}`] : 1}]});
  if(typeof id.objs[onurid] === "undefined") {
    return false;
  } else {
    id = id.objs[onurid];
    let res = await CommandQ.push({col:type, comm:"findOne", args: [{_id: ObjectID(id)}, {_hash : 1}]});
    return res._hash == newHash;
  }
}

DBH.SearchText = async function (text, coreName, lang = "") {
  let langOp = lang !== "" ? "dil" : "dummy";
  let langVal = lang !== "" ? lang : 1;
  let regexp = new RegExp(`.*${text}.`);
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$match: {name: coreName}},
    {$project: {searchIndex: 1}},
    {$unwind: {
      path: "$searchIndex",
      preserveNullAndEmptyArrays: true
    }},
    {$lookup: {
      from: "searchIndexes",
      localField: "searchIndex",
      foreignField: "_id",
      as: "value"
    }},
    {$unwind: "$value"},
    {$match: {[`value.${langOp}`]: langVal}},
    {$match: {[`value.arr`]: regexp}},
    {$project: {[`value.obj`]: 1}},
    {$group: {
      _id: null,
      objects: {$push: "$value.obj"},
    }},
    
  ]]});
  let resArr = await result.next();
  if(resArr == null) return null;
  return resArr.objects;
}
DBH.SetSearchText = async function (arr, onurid, dil, coreName, type) {
  let objid = await DBH.GetObjectId(onurid, type, coreName);
  if(objid == null) return null;
  let dilobj = {dil: dil, arr: arr, obj: objid, dummy: 1};
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$match: {name: coreName}},
    {$project: {searchIndex: 1}},
    {$unwind: {
      path: "$searchIndex",
      preserveNullAndEmptyArrays: true
    }},
    {$lookup: {
      from: "searchIndexes",
      localField: "searchIndex",
      foreignField: "_id",
      as: "value"
    }},
    {$match: {[`value.obj`] : objid, [`value.dil`]: dil}},
    {$project: {[`value._id`]: 1}},
  ]]});
  let resArr = await result.next();
  if(resArr == null) {
    let insid = (await CommandQ.push({col:"searchIndexes", comm:"insertOne", args: [dilobj]})).insertedId;
    CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$push: {[`searchIndex`]: insid}}]});
  } else {
    let index = resArr.value[0]._id;
    CommandQ.push({col: "searchIndexes", comm: "updateOne", args: [{_id: ObjectID(index)}, dilobj] });
  }
}
DBH.SetSearchTextObjid = async function (arr, objid, dil, coreName, type) {
  let dilobj = {dil: dil, arr: arr, obj: objid, dummy: 1};
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$match: {name: coreName}},
    {$project: {searchIndex: 1}},
    {$unwind: {
      path: "$searchIndex",
      preserveNullAndEmptyArrays: true
    }},
    {$lookup: {
      from: "searchIndexes",
      localField: "searchIndex",
      foreignField: "_id",
      as: "value"
    }},
    {$match: {[`value.obj`] : objid, [`value.dil`]: dil}},
    {$project: {[`value._id`]: 1}},
  ]]});
  let resArr = await result.next();
  if(resArr == null) {
    let insid = (await CommandQ.push({col:"searchIndexes", comm:"insertOne", args: [dilobj]})).insertedId;
    CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$push: {[`searchIndex`]: insid}}]});
  } else {
    let index = resArr.value[0]._id;
    CommandQ.push({col: "searchIndexes", comm: "updateOne", args: [{_id: ObjectID(index)}, dilobj] });
  }
}
//bakteriyi siler search indexten
DBH.RemoveSearchText = async function (onurid, dil, coreName, type) {
  let objid = await DBH.GetObjectId(onurid, type, coreName);
  if(objid == null) return null;
  let id = await CommandQ.push({col: "searchIndexes", comm: "findOne", args: [{dil: dil, obj: objid}, {[`_id`]: 1}]});
  if(id != null) {
    id = id._id;
  } else {
    return null;
  }
  await CommandQ.push({col: "cores", comm: "updateOne", args:[{name: coreName},{$pull: {[`searchIndex`]: id}}]});
  CommandQ.push({col:"searchIndexes", comm:"deleteOne", args: [{_id: ObjectID(id)}]});
}
DBH.RemoveSearchTextObjid = async function (objid, coreName, type) {
  let rec = async function (objid, coreName, type) {
    let id = await CommandQ.push({col: "searchIndexes", comm: "findOne", args: [{obj: objid}, {[`_id`]: 1}]});
    if(id != null) {
      id = id._id;
    } else {
      return null;
    }
    await CommandQ.push({col: "cores", comm: "updateOne", args:[{name: coreName},{$pull: {[`searchIndex`]: id}}]});
    await CommandQ.push({col:"searchIndexes", comm:"deleteOne", args: [{_id: ObjectID(id)}]});
    return true;
  }
  
  let result = true;
  while(result) {
    await rec(objid, coreName, type);
  }
  
}

DBH.ObjidToOnurid = async function (objidArr, coreName, type) {
  let onurids = [];
  for(let objid of objidArr) {
    onurids.push((await CommandQ.push({col: type, comm: "findOne", args: [{_id: ObjectID(objid)}, {_ID: 1}]}))._ID);
  }
  return onurids;
}
DBH.BackUpCore = async function (coreName, type) {
  let regexp = new RegExp(`.*root.`);
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$match: {name: coreName}},
    {$lookup: {
      from: "searchIndexes",
      localField: "searchIndex",
      foreignField: "_id",
      as: "searchIndex"
    }},
    {$addFields: {index: {$objectToArray: "$index"}}}, 
    {$lookup: {
      from: "indexPaths",
      localField: "index.v",
      foreignField: "_id",
      as: "index"
    }},
    {$addFields: {objs: {$objectToArray: "$objs"}}}, 
    {$lookup: {
      from: type,
      localField: "objs.v",
      foreignField: "_id",
      as: "objs"
    }},
    {$project: {
      [`_id`]: 0,
      [`index.coreName`]: 0, 
      [`index._id`]: 0, 
      [`searchIndex._id`]: 0, 
      [`searchIndex.dummy`]: 0,
    }},
  ]]});
  let resArr = await result.next();
  if(resArr == null) {
    return null;
  }
  let nind = {};
  for(let k = 0; k < resArr.index.length; k++) {
    nind[resArr.index[k].path] = resArr.index[k].objs;
  }
  resArr.index = nind;
  
  let nobjs = {};
  for(let k = 0; k < resArr.objs.length; k++) {
    nobjs[resArr.objs[k]._id] = resArr.objs[k];
  }
  resArr.objs = nobjs;
  
  await CommandQ.push({col: "localCores", comm: "updateOne", args:[{name: coreName}, resArr, {upsert:true}]});
  
}
DBH.GetBackUp = async function (coreName) {
  return await CommandQ.push({col: "localCores", comm: "findOne", args: [{name: coreName}]});
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









module.exports = {
  Helpers, DBH
}

















