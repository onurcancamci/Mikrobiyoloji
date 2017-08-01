const {asynct} = require('./asynct');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dburl = "mongodb://localhost:27017/tipdb2";

let DB;
let Collections = {};
let dbConnect = async function(err, db) {
  if (err) throw err;
  console.log("Connected");
  DB = db;
  ["objects", "cores", "users", "groups"].map(c => {
    db.createCollection(c);
    Collections[c] = db.collection(c);
  });
  DBH.onConnected.map(x => x());
}
let DBHP = async function (col, comm, ...args) {
  if(!Collections[col]) return null;
  let ret = await Collections[col][comm](...args);
  return ret;
}

MongoClient.connect(dburl, (err, db) => dbConnect(err,db));

let DBH = {};
DBH.FastDB = {};
DBH.onConnected = [];


DBH.onConnected.push(async () => {
  
  
  
  let batch = new asynct();
  
  let fonksiyon = async (x) => {
    await DBHP("cores","findOne",{});
    console.log(x);
  }
  
  for(let k = 0; k < 10; k++) {
    batch.add(fonksiyon)(k);
  }
  

  await batch.wait;

  console.log("asd");
  
});












