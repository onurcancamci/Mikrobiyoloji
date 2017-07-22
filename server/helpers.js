


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const dburl = "mongodb://localhost:27017/tipdb";


let DB;
let Collections = {};
let CommandQ = [];
let dbConnect = async function(err, db) {
  if (err) throw err;
  console.log("Connected");
  DB = db;
  
  ["bakteriler","indexPaths","cores","searchIndexes", "localCores", "users"].map(c => {
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
let DBCommandParser = async function (comm) {
  let ret = await Collections[comm.col][comm.comm](...comm.args);
  return ret;
}

MongoClient.connect(dburl, (err, db) => dbConnect(err,db));

let DBH = {};

DBH.FastDB = {};

DBH.onConnected = [];
DBH.CreateCore = async function (name, globalStatus, online, type, title = "", description = "", inverted = false) {
  
  let entry = {};
  entry.name = name;
  entry.index = {};
  entry.searchIndex = [];
  entry.objs = {};
  entry.global = globalStatus;
  entry.online = online;
  entry.type = type;
  entry.version = 0;
  entry.title = title;
  entry.description = description;
  entry.inverted = inverted;
  if(CommandQ.push({col:"cores", comm:"findOne", args:[{name:name}]})) {
    //CommandQ.push({col:"cores",comm:"updateOne",args:[{name:core.name},entry]});
  } else {
    await CommandQ.push({col:"cores",comm:"insertOne",args:[entry]});
  }
}
DBH.IncrementVersion = async function (coreName) {
  CommandQ.push({col: "cores", comm: "updateOne", args: [{name: coreName}, {$inc: {version: 1}}]});
}
DBH.GetCoreField = async function (coreName, field) {
  if(DBH.FastDB.hasOwnProperty(field)) {
    return DBH.FastDB[field][coreName];
  } else {
    return await DBH._GetCoreField(coreName, field);
  }
}
DBH._GetCoreField = async function (coreName, field) {
  return (await CommandQ.push({col: "cores", comm: "findOne", args: [{name: coreName}, {[`${field}`]: 1}]}))[field];
}
DBH.GetCoreType = async function (coreName) {
  return await DBH.GetCoreField(coreName, "type");
}
DBH.GetCoreFieldPairs = async function (field) {
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$project: {[`${field}`]: 1, name: 1}},
  ]]});
  let resArr = await result.toArray();
  if(resArr == null) return null;
  return resArr;
}
DBH.CacheField = async function (field) {
  let fp = await DBH.GetCoreFieldPairs(field);
  for(let p of fp) {
    NDEF(DBH.FastDB, field, {});
    DBH.FastDB[field][p.name] = p[field];
  }
}
DBH.GetCoreInfo = async function (coreName) {
  return await CommandQ.push({col: "cores", comm: "findOne", args: [{name: coreName}, {index: 0, searchIndex: 0, objs: 0}]});
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
RemoveFromIndex = async function (indexid, _idObj) {
  CommandQ.push({col: "indexPaths", comm: "updateOne", args: [{_id: ObjectID(indexid)}, {$pull: {[`objs`]: ObjectID(_idObj)}}] });
}
DBH.SetObject = async function (obj, onurid, coreName) {
  let type = await DBH.GetCoreType(coreName);
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${onurid}`] : 1}]});
  if(typeof id.objs[onurid] === "undefined") {
    let insid = (await CommandQ.push({col:type, comm:"insertOne", args: [obj]})).insertedId;
    await CommandQ.push({col:"cores", comm: "updateOne", args: [{name: coreName}, {$set: {[`objs.${onurid}`]: insid}}]}); //await?
    return insid;
  } else {
    id = id.objs[onurid];
    await CommandQ.push({col: type, comm: "updateOne", args: [{_id: ObjectID(id)}, obj] });//await?
    return id;
  }
}
DBH.GetObject = async function (onurid, coreName) {
  let type = await DBH.GetCoreType(coreName);
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${onurid}`] : 1}]});
  if(typeof id.objs[onurid] === "undefined") {
    return null;
  } else {
    id = id.objs[onurid];
    return await CommandQ.push({col:type, comm:"findOne", args: [{_id: ObjectID(id)}]});
  }
}
DBH.GetObjectId = async function (onurid, coreName) {
  let type = await DBH.GetCoreType(coreName);
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${onurid}`] : 1}]});
  if(typeof id.objs[onurid] === "undefined") {
    return null;
  } else {
    id = id.objs[onurid];
    return id;
  }
}
DBH.RemoveObject = async function (onurid, coreName) {
  let type = await DBH.GetCoreType(coreName);
  let id = await CommandQ.push({col:"cores", comm:"findOne", args:[{name: coreName},{[`objs.${onurid}`] : 1}]});
  if(typeof id.objs[onurid] !== "undefined") {
    id = id.objs[onurid];
    await CommandQ.push({col: "indexPaths", comm: "updateMany", args: [{coreName: coreName, objs: id}, {$pull: {objs: id}}] });
    await CommandQ.push({col: "cores", comm: "updateOne", args: [{name: coreName}, {$unset: {[`objs.${onurid}`]: ""}} ] });
    await CommandQ.push({col: type, comm: "deleteOne", args: [{_id: ObjectID(id)}] });
    DBH.RemoveSearchTextObjid(id, coreName, type);
  }
}
DBH.CheckObject = async function (onurid, newHash, coreName) {
  let type = await DBH.GetCoreType(coreName);
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
DBH.SetSearchText = async function (arr, onurid, dil, coreName) {
  let objid = await DBH.GetObjectId(onurid, coreName);
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
DBH.SetSearchTextObjid = async function (arr, objid, dil, coreName) {
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
DBH.RemoveSearchText = async function (onurid, dil, coreName) {
  let objid = await DBH.GetObjectId(onurid, coreName);
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
DBH.RemoveSearchTextObjid = async function (objid, coreName) {
  let rec = async function (objid, coreName) {
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
    await rec(objid, coreName);
  }
  
}

DBH.ObjidToOnurid = async function (objidArr, type) {
  let onurids = [];
  for(let objid of objidArr) {
    onurids.push((await CommandQ.push({col: type, comm: "findOne", args: [{_id: ObjectID(objid)}, {_ID: 1}]}))._ID);
  }
  return onurids;
}
DBH.BackUpCore = async function (coreName) {
  let type = await DBH.GetCoreType(coreName);
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

DBH.User = {
  get: async function (args) {
    args = Arrayify(args);
    return await CommandQ.push({col: "users", comm: "findOne", args: args});
  },
  set: async function (user) {
    CommandQ.push({col: "users", comm: "updateOne", args: [{username: user.username},user,{upsert: true}]});
  },
  new: async function (user) {
    //username ch limit
    
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


let NDEF = function (O,field,def = {}) {
  if(typeof O[field] === "undefined") {
    O[field] = def;
  }
}
let Arrayify = function (O) {
  if(!Array.isArray(O)) return [O];
  else return O;
}





module.exports = {
  Helpers, DBH
}

















