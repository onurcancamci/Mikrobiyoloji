const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dburl = "mongodb://localhost:27017/tipdb2";
const md5 = require('js-md5');
const {Do, DoSync} = require('./do.js');
const {Dil,Genelleme,S2ENG} = require("./language.js");
const {asynct} = require('./asynct.js');


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

let ID = function (_id) {
  return {_id: ObjectId(_id)};
}
let Hash = function (obj) {
  return md5(JSON.stringify(obj));
}
let NDEF = function (O,field,def = {}) {
  if(typeof O[field] === "undefined") {
    O[field] = def;
  }
}


let DBH = {};
DBH.FastDB = {};
DBH.onConnected = [];

DBH.cores = {
  ekle: async function (core) {
    let id = await DBHP("cores","insertOne",core);
    DBH.cores.changed();
    return id;
  },
  cikar: async function (_id) {
    await DBHP("cores","deleteOne",ID(_id));
    DBH.cores.changed();
  },
  update: async function (_id, someArgs) {
    console.log("Not Implemented");
  },
  changed: async function (_id) {
    if(!_id) {
      
      return;
    }
    await DBHP("cores","updateOne", ID(_id), {$inc: {version: 1}});
    //cache
  },
}

DBH.objects = {
  ekle: async function (...objs) {
    for(let obj of objs) {
      let coreid = obj._core;
      if(!obj._ID) obj._ID = shortid.generate();
      
      
      await Do(obj, {
        level: "root",
        path: "root",
        layer: 0,
      },async (string, args) => {
        NDEF(obj,"_path",[]);
        obj._path.push(args.path+"/"+string);
      });
      
      
      
      let langs = {};
      DoSync(obj, {
        level: "root",
        path: "root",
        layer: 0,
      },(string, args) => {
        for(let lang in Dil) {
          if(lang[0] == "_")continue;
          NDEF(langs,lang,[]);
          langs[lang].push(S2ENG(Dil._Sozluk(string,false,lang).toLowerCase()));
        }
      });
      for(let lang in langs) {
        let txt = langs[lang].join();
        obj[`_dil/${lang}`] = txt;
      }  
      obj._hash = Hash(obj);
      let dogrulama = await DBH.objects.check(obj._ID, obj._hash, coreid); if(dogrulama) continue;
      let objid = (await DBHP("objects","insertOne", obj)).insertedId;
      await DBHP("cores","updateOne",ID(coreid), {$set: {[`objs.${obj._ID}`]: objid}}); 
      await DBH.cores.changed(coreid);    
    }
    
    
  },
  check: async function (_ID, _hash, coreid) {
    let result = await DBHP("cores", "aggregate", [
      {$match: ID(coreid)},
      {$project: {[`objs.${_ID}`] : 1}},
      {$lookup: {
        from: "objects",
        localField: `objs.${_ID}`,
        foreignField: `_id`,
        as: `objs.${_ID}`
      }},
      {$match: {[`objs.${_ID}._hash`]: _hash}},
    ]);
    let resArr = await result.next();
    if(resArr == null) return false;
    return true;
  },
  cikar: async function (_ID, coreid) {
    let _id = (await DBHP("cores","findOne",ID(coreid),{[`objs.${_ID}`]: 1})).objs[_ID];
    await DBHP("cores","updateOne",ID(coreid), {$unset: {[`objs.${_ID}`]: ""}});
    await DBHP("objects", "deleteOne", ID(_id));
    await DBH.cores.changed(coreid);   
  },
}

DBH.search = async function (text, cores, ...langs) {
  text = S2ENG(text.toLowerCase());
  let regexp = new RegExp(`.*${text}.`);
  let total = {};
  
  for(let lang of langs) {
    total[lang] = await (await DBHP("objects","find",
    {_core: {$in: cores}, [`_dil/${lang}`]: regexp},
    {_ID: 1})).toArray();
  }
  return total;
}
//{status: 0, path: "root/"}
DBH.filter = async function (rules, cores) {
  
  let que = new asynct();
  let addToArray = async function (array, rule) {
    let arr = (await (await DBHP("objects", "find", {_core: {$in: cores}, _path: rule.path}, {_ID: 1})).toArray()).map(e => e._ID);
    array.push(arr);
  }
  
  let whites = [];
  let blacks = [];
  
  for(let rule of rules) {
    if(rule.status == 0) {
      continue;
    } else if(rule.status == 1) {
      que.add(addToArray)(whites,rule);
    } else if(rule.status == 2) {
      que.add(addToArray)(blacks,rule);
    } else {
      
    }
  }
  
  await que.wait;
  console.log(whites);
  
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
  _type: "bakteri"
};

DBH.onConnected.push(async () => {
  
  cBurnetii._core = "596d19d4537b92101ec0dd8f";
  cBurnetii._ID = "asdfg";
  
  //await DBHP("cores","updateOne", ID("596d19d4537b92101ec0dd8f"), {$set: {index: {}, searchIndex: []}});
  
  //await DBH.objects.ekle(cBurnetii);
  //await DBH.search("ates", ["596d19d4537b92101ec0dd8f","asd"], "Turkce");
  await DBH.filter([{status:0, path:"root/CinsAdi/Coxiella"}], ["596d19d4537b92101ec0dd8f","asd"]);
  //await DBH.objects.cikar("asdfg","596d19d4537b92101ec0dd8f");
  //await DBH.objects.check("Coxiella-burnetii","d41d8cd98f00b204e9800998ecf8427e","596d19d4537b92101ec0dd8f");
  
});


process.on("unhandledRejection", (reason) => {
  console.log("hmmmm   ", reason.stack);
});
























/*Ekle: async function (coreName, BS) {
  BS = Arrayify(BS);
  let didChange = false;
  let type = await DBH.GetCoreType(coreName);
  for(let B of BS) {
    let onurid = this.GetOnurID(type, B);
    let hash = md5(B);
    let dogrulama = await DBH.CheckObject(onurid, hash, type, coreName); if(dogrulama) continue;
    didChange = true;
    B._ID = onurid;
    B._hash = hash;
    let objid = await this.SetObject(coreName, onurid, B);
    DoRouter(B, {
      level: "root",
      path: "root",
      layer: 0,
    },async (string, args) => {
      this.AddObjToIndex(coreName, args.path+"/"+string, objid);
    });
    
    let langs = {};
    DoRouterSync(B, {
      level: "root",
      path: "root",
      layer: 0,
    },(string, args) => {
      for(let lang in Dil) {
        if(lang[0] == "_")continue;
        NDEF(langs,lang,[]);
        langs[lang].push(S2ENG(Dil._Sozluk(string,false,lang).toLowerCase()));
      }
    });
    for(let lang in langs) {
      DBH.SetSearchTextObjid(langs[lang], objid, lang, coreName);
    }
    
    
  }
  if(didChange) this.DBChanged(coreName);
},*/









