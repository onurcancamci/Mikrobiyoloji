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
    if(!core.objs) core.objs = {};
    let id = await DBHP("cores","insertOne",core);
    await DBH.cores.changed(id);
    return id;
  },
  cikar: async function (_id) {
    await DBHP("cores","deleteOne",ID(_id));
    await DBH.cores.changed(_id);
  },
  update: async function (_id, newcore) {
    await DBHP("cores","updateOne",ID(_id), {
      $set: {
        "status" : newcore.status,
        "online" : newcore.online,
        "type" : newcore.type,
        "inverted" : newcore.inverted,
        "desc" : newcore.desc,
        "belongsTo" : ObjectId(newcore.belongsTo)
      }
    });
    await DBH.cores.changed(_id);
  },
  changed: async function (_id) {
    if(!_id) {
      
      return;
    }
    await DBHP("cores","updateOne", ID(_id), {$inc: {version: 1}});
    //cache
  },
  auth: async function (coreid, userid) {
    let core = await DBHP("cores", "findOne", ID(coreid), {status: 1, belongsTo: 1});
    if(!core) return false;
    if(core.belongsTo.toString() == userid.toString()) { //?
      return true;
    } else if(core.status == 1) {
      return await DBH.groups.auth(core.belongsTo, userid);
    }
    return false;
  },
  getByOwners: async function (_ids, project = {_id: 1}) {
    let __ids = _ids.map(e => ObjectId(e));
    return (await (await DBHP("cores", "find", {$or: [{belongsTo: {$in : __ids}}, {status:0}]}, project)).toArray()).map(e => e._id);
  },
  getForSync: async function (_id, version) {
    let core = await DBHP("cores", "findOne", ID(_id), {version:1, online: 1});
    if(core == null) return -1;
    else if(version < core.version) {
      if(core.online == 3) {
        return {core: await DBHP("cores", "findOne", ID(_id), {objs: 0})};
      } else {
        let res = {};
        res.core = await DBHP("cores", "findOne", ID(_id));
        res.objs = await (await DBHP("objects", "find", {_core: ID(_id)})).toArray(); //ID(?)
        return res;
      } 
    } else {
      return 0;
    }
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
    if(!coreid) {
      let obj = _ID;
      _ID = obj._ID;
      coreid = obj._core;
    }
    let _id = (await DBHP("cores","findOne",ID(coreid),{[`objs.${_ID}`]: 1})).objs[_ID];
    await DBHP("cores","updateOne",ID(coreid), {$unset: {[`objs.${_ID}`]: ""}});
    await DBHP("objects", "deleteOne", ID(_id));
    await DBH.cores.changed(coreid);   
  },
}

DBH.groups = {
  ekle: async function (group) {
    if(!group.users) group.users = [];
    if(!group.admins) group.admins = [];
    let id = await DBHP("groups","insertOne",group);
    await DBH.groups.changed(id);
    return id;
  },
  cikar: async function (_id) {
    await DBHP("groups","deleteOne",ID(_id));
    await DBH.groups.changed(_id);
  },
  update: async function (_id, newgroup) {
    await DBHP("groups","updateOne",ID(_id), {
      $set: {
        "password" : newgroup.password,
        "desc" : newgroup.desc,
      }
    });
    await DBH.groups.changed(_id);
  },
  changed: async function (_id) {
    if(!_id) {
      
      return;
    }
    await DBHP("groups","updateOne", ID(_id), {$inc: {version: 1}});
    //cache
  },
  auth: async function (groupid, userid) {
    let grouptest = await DBHP("groups", "findOne", {_id: ObjectId(groupid), admins: userid}, {_id: 1});
    if(grouptest) return true;
    else return false;
  },
  getIdsByUser: async function (_id) {
    _id = ObjectId(_id);
    return (await (await DBHP("groups", "find", {users: _id}, {_id: 1})).toArray()).map(e => e._id);
  },
  getForSync: async function(_id, version) {
    let group = await DBHP("groups", "findOne", ID(_id), {version:1});
    if(group == null) return -1;
    if(version < group.version) {
      return await DBHP("groups", "findOne", ID(_id));
    } else {
      return 0;
    }
  },
}

DBH.users = {
  getForSync: async function (_id, version) {
    let user = await DBHP("users", "findOne", ID(_id), {version: 1});
    if(user == null) return -1;
    if(version < user.version) {
      return await DBHP("users", "findOne", ID(_id), {password: 0, tokens: 0});
    } else {
      return 0;
    }
  },
  update: async function (_id, newuser) {
    await DBHP("users","updateOne",ID(_id), {
      $set: {
        "password" : newuser.password,
        "email": newuser.email,
        "desc" : newuser.desc,
      }
    });
    await DBH.users.changed(_id);
  },
  changed: async function (_id) {
    if(!_id) {
      
      return;
    }
    await DBHP("users","updateOne", ID(_id), {$inc: {version: 1}});
    //cache
  },
}

DBH.search = async function (text, cores, ...langs) {
  text = S2ENG(text.toLowerCase());
  let regexp = new RegExp(`.*${text}.`);
  let total = {};
  cores = cores.map(e => e.toString());

  for(let lang of langs) {
    total[lang] = await (await DBHP("objects","find",
    {_core: {$in: cores}, [`_dil/${lang}`]: regexp},
    {_ID: 1})).toArray();
  }
  return total;
}
//{status: 0, path: "root/"}
DBH.filter = async function (rules, cores) {
  cores = cores.map(e => e.toString());
  let que = new asynct();
  let addToArray = async function (array, rule) {
    let arr = (await (await DBHP("objects", "find", {_core: {$in: cores}, _path: rule.path}, {_ID: 1})).toArray()).map(e => e._ID);
    array.push(arr);
  }
  let addToOrs = async function (array, rule) {
    let arr = (await (await DBHP("objects", "find", {_core: {$in: cores}, _path: rule.path}, {_ID: 1})).toArray()).map(e => e._ID);
    array.push({path: rule.path, arr});
  }
  
  
  let whites = [];
  let blacks = [];
  let ors = [];
  
  for(let rule of rules) {
    if(rule.status == 0) {
      continue;
    } else if(rule.status == 1) {
      que.add(addToArray)(whites,rule);
    } else if(rule.status == 2) {
      que.add(addToArray)(blacks,rule);
    } else {
      //que.add(addToOrs)(ors,rule);
      //not implemented
    }
  }
  await que.wait;
  //console.log(whites,blacks, ors);
  let whitelist = {
    index: {},
    maxVal: 0,
    push: function (obj) {
      if(this.maxVal == 0) {
        this.index[obj] = 1;
      } else if(this.index.hasOwnProperty(obj)) {
        this.index[obj]++;
      }
    },
    newRule: function () {
      this.maxVal++;
      for(let obj in this.index) {
        if(this.index[obj] == this.maxVal-1) {
          this.index[obj] = undefined;
        }
      }
    },
    toArray: function () {
      let arr = [];
      for(let el in this.index) {
        arr.push(el);
      }
      return arr;
    }
  }
  for(let white of whites) {
    for(let we of white) {
      whitelist.push(we);
    }
    whitelist.newRule();
  }
  //console.log(whitelist.index);
  whitelist = whitelist.toArray();

  let blacklist = new Set();
  for(let black of blacks) {
    for(let be of black) {
      blacklist.add(be);
    }
  }
  blacklist = [...blacklist];
  //console.log(blacklist);
  
  let sonarr = [];
  whitelist.map(e => {
    if(blacklist.findIndex(x => x.toString() == e.toString()) == -1) {
      sonarr.push(e);
    }
  });
  //console.log(sonarr);
  return sonarr;
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
  
  //cBurnetii._core = "596d19d4537b92101ec0dd8f";
  //cBurnetii._ID = "asdfg";

  //console.log(await DBH.cores.getByOwners(["597f79ad687163d25f2b0410"]));
  //await DBHP("cores","updateOne", ID("596d19d4537b92101ec0dd8f"), {$set: {index: {}, searchIndex: []}});
  
  //await DBH.objects.ekle(cBurnetii);
  //await DBH.search("ates", ["596d19d4537b92101ec0dd8f","asd"], "Turkce");
  //await DBH.filter([{status:1, path:"root/CinsAdi/Coxiella"},{status:2, path:"root/Gram/Negative"}], ["596d19d4537b92101ec0dd8f","asd"]);
  //await DBH.objects.cikar("asdfg","596d19d4537b92101ec0dd8f");
  //await DBH.objects.check("Coxiella-burnetii","d41d8cd98f00b204e9800998ecf8427e","596d19d4537b92101ec0dd8f");
  
});


process.on("unhandledRejection", (reason) => {
  console.log("hmmmm   ", reason.stack);
});



module.exports = {
  DBH,
  DBHP,
  ID
}





















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









