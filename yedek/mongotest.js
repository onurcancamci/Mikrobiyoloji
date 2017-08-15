
const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require('ws');
const server = http.createServer(app);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

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


let cBurnetii = {
  AileAdi: "Coxiellaceae",
  CinsAdi: "Coxiella",
  TurAdi: "burnetii",
  Gram: "Negative",
  Shape:  {Name: "Kokobasil", Aciklama: ["Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: {
    Name: "Q Atesi",
    Belirtiler: ["Ates","Bas Agrisi","Eklem Agrisi","Oksuruk","Dokuntu","Menenjit Bulgulari"],
    Aciklama: ["Tum Dunyada Yaygin","Insanda Akut Veya Kronik(5%)","Genelde Ciftlik Hayvanlarindan Kaynaklanir",
                "Cok Bulasici","Lab: Trombositopeni, KC Enzimlerinde Yukselme, Eritrosit Sedimentasyonda Yukselme"],
                
  },
  Bulasma: ["Hava","Damlacik","Oral","Kene"],
  VirualanFaktorler: "Endospor",
  Aciklama : ["Zorunlu Hucre Ici","Fagolizozomlarda Yasar","Cevre Sartlarina Cok Direnclidir"],
};

let url = "mongodb://localhost:27017/tipdb";
let DB;
let Collections = {};

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
  let text = "9";
  let lang = "";
  let langOp = lang !== "" ? "dil" : "dummy";
  let langVal = lang !== "" ? lang : 1;
  let regexp = new RegExp(`.*${text}.`);
  let result = await CommandQ.push({col: "cores", comm: "aggregate", args: [[
    {$match: {name: "Bakteriler#Global"}},
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
  console.log(resArr.objects);
}
let DBCommandParser = async function (comm) {
  //console.log(Collections);
  //console.log(comm);
  let ret = await Collections[comm.col][comm.comm](...comm.args);
  return ret;
}
MongoClient.connect(url, (err, db) => dbConnect(err,db) );



















