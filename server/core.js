
const {Helpers, DBH} = require('./helpers.js');
const md5 = require('js-md5');
const {Dil,Genelleme} = require("./language.js");
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

//index
//filter
//search
//chat
//args da level, path, layer = 0 gerekli
//level = "Belirtiler" path = "Hastaliklar/Belirtiler"
let DoString = async function (string, args, job) {
  job(string, args);
}
let DoArray = async function (array, args, job, arrjob, objectjob) {
  if(arrjob) objectjob(array, args);
  
  for(let n of array) {
    DoRouter(n, args, job, arrjob, objectjob);
  }
  
}
let DoObj = async function (object, args, job, arrjob, objectjob) {
  if(objectjob) objectjob(object, args);
  if(object.Name) job(object.Name, args);
  
  for(let field in object) {
    if(field == "Name" || field[0] == "_") continue;
    let nargs = Helpers.ShallowCopy(args);
    nargs.level = field;
    nargs.path += `/${field}`;
    nargs.layer++;
    DoRouter(object[field], nargs, job, arrjob, objectjob);
  }
  
  
}
let DoRouter = async function (object, args, job, arrjob, objectjob) {
  if(typeof object == "string") {
    DoString(object, args, job);
    
  } else if(Array.isArray(object)) {
    DoArray(object, args, job, arrjob, objectjob);
    
  } else if(typeof object == "object") {
    DoObj(object, args, job, arrjob, objectjob);
  }
}

let Arrayify = function (O) {
  if(!Array.isArray(O)) return [O];
  else return O;
}
let NDEF = function (O,field,def = {}) {
  if(typeof O[field] === "undefined") {
    O[field] = def;
  }
}
let _S2ENG = function (text) {
  let ntext = "";
  for(let k = 0; k < text.length; k++) {
    if(text[k] == "ç") ntext += "c";
    else if(text[k] == "ö") ntext += "o";
    else if(text[k] == "ğ") ntext += "g";
    else if(text[k] == "ü") ntext += "u";
    else if(text[k] == "ş") ntext += "s";
    else if(text[k] == "ı") ntext += "i";
    else ntext += text[k];
  }
  return ntext;
}
let S2ENG = function (text) {

  if(Array.isArray(text)) {
  let arr = [];  
  for(let t of text) {
    arr.push(_S2ENG(t));
  }
  return arr;
    
  } else {
    return _S2ENG(text);
  }
  
  
}
Array.prototype.remove = function(el) {
  let ind = this.findIndex(e => e == el);
  
  if(ind != -1) {
    return this.splice(ind,1);
  } else {
    return this;
  }
};

let WhiteMerge = async function (list, arr, index) {
  if(typeof arr == "string") {
    arr = await index[arr];
  }
  if(!arr) {
    list.mark = true;
    for(let k = 0; k < list.length; k++) {
      list.splice(k,1);
      k--;
    }
  }
  if(list.length == 0 && typeof list.mark === "undefined") {
    arr.map(e => list.push(e));
    list.mark = true;
  } else {
    for(let k = 0; k < list.length; k++) {
      let e = list[k];
      let ind = arr.findIndex(x => x == e);
      if(ind == -1) {
        list.splice(k,1);
        k--;
      }
    }
  }
  return list;
}
let BlackMerge = async function (list, arr, index) {
  if(typeof arr == "string") {
    arr = await index[arr];
  }
  if(!arr) return list;
  for(let e of arr) {
    if(list.findIndex(x => x == e) == -1) list.push(e);
  }
  return list;
}
let WhiteBlackMerge = async function (white, black, index) {
  if(typeof arr == "string") {
    arr = await index[arr];
  }
  for(let k = 0; k < white.length; k++) {
    let e = white[k];
    if(black.findIndex(x => x == e) != -1) {
      white.splice(k,1);
      k--;
    }
  }
}


let Core = function (Name, Dil, Genelleme = {}, IdFields = ["CinsAdi", "TurAdi", "SubTur"], online = 0, globalCore = true, type = "bakteriler") {
  this.name = Name;
  this.global = globalCore;
  this.Objects = new Proxy({}, {
    get: async function (target, prop, reciever) {
      return await DBH.GetObjectId(prop, type, Name);
    },
    set: async function (target, prop, val, reciever) {
      DBH.SetObject(val, prop, type, Name);
    }
  });
  this.GetFullObject = async function (objid) {
    return await DBH.GetObject(objid, type, Name)
  }
  this.Index = new Proxy({}, {
    get: async function (target, prop, reciever) {
      let indpath = await DBH.GetIndexPath(prop, Name);
      if(!indpath) return null;
      return indpath.objs;
    },
    set: async function (target, prop, val, reciever) {
      DBH.SetIndexPath({path: prop, objs: val, coreName: Name}, Name);
      return true;
    }
  });
  this.IndexAdd = async (path, objid) => {
    DBH.AddObjToIndex(path, objid, Name);
  }
  this.SearchIndex = {};
  this.online = online;
  this.type = type;
  
  
  this.Ekle = async (O) => {
    O = Arrayify(O);
    for(let o of O) {
      let id = this.GetId(o);
      o._ID = id;
      o._MD5 = md5(o);
      this.Objects[id] = o;
      DoRouter(o, {
        level: "root",
        path: "root",
        layer: 0,
        Object: await this.Objects[id],// id olcak
      },async (string, args) => {
        this.IndexAdd(args.path+"/"+string, args.Object);
      });
    }
    /*
    for(let o of O) {
      let id = o._ID;
      DoRouter(O, {
        level: "root",
        path: "root",
        layer: 0,
        Index: this.SearchIndex,
        id: id,
        Dil: Dil,
      },(string, args) => {
        NDEF(args.Index,args.id,{});
        for(let lang in args.Dil) {
          if(lang[0] == "_")continue;
          NDEF(args.Index[args.id],lang,[]);
          args.Index[args.id][lang].push(S2ENG(args.Dil._Sozluk(string,false,lang).toLowerCase()));
        }
      });
    }
    */
  }
  this.Remove = (Oid) => {
    DBH.RemoveObject(Oid, type, Name);
    //if(this.SearchIndex[Oid]) delete this.SearchIndex[Oid];
  }
  
  
  
  
  this.GetIdFull = function (IdFields, B) {
    let id = "";
    
    for(let f of IdFields) {
      if(typeof B[f] !== "undefined") {
        id += B[f];
        id += "-";
      }
    }
    if(id[id.length -1] == "-") {
      id = id.slice(0, -1);
    }
    
    
    return id;
  }
  this.GetId = this.GetIdFull.bind(null, IdFields);
  this.GetCounter = (fields = ["CinsAdi"]) => {
    if(typeof fields === "string") fields = [fields];
    let ctind = {};
    
    for(let o of Objs) {
      let id = this.GetIdFull(fields, o);
      if(typeof ctind[id] === "undefined") ctind[id] = 0;
      
      ctind[id]++;
      
    }
    
    return ctind;
  }
  //0 = normal, 1 = whitelist, 2 = blacklist, 3 = orlist
  //{path: "root/Hastaliklar/Belirtiler", field: "Ates", status: 1}
  //count -1 = all
  this.Filter = async (rules, send, count = -1, page) => {
    let white = [];
    let black = [];
    let orlist = {};
    
    for(let k = 0; k < rules.length; k++) {
      if(rules[k].status == 0) {
        continue;
      }
      if(rules[k].status == 1) {
        await WhiteMerge(white, rules[k].path+"/"+rules[k].field, this.Index);
      } else if(rules[k].status == 2) {
        await BlackMerge(black, rules[k].path+"/"+rules[k].field, this.Index);
      } else {
        NDEF(orlist, rules[k].path, []);
        await BlackMerge(orlist[rules[k].path], rules[k].path+"/"+rules[k].field, this.Index);
      }
    }
    for(let p in orlist) {
      await WhiteMerge(white,orlist[p]);
    }
    await WhiteBlackMerge(white,black);
    
    if(count != -1) {
      offset = page * count;
      white = white.filter((e,i,arr) => {
        if(i < offset || i >= offset + count) return false;
        return true;
      });
    }
    send(white, count, page);
  }
  //online icin {id,hash} gonder, client istediklerini yollar, normal obje gider
  //bunu filter fonksiyonu kullanir sadece
  //olumlu bos ise hepsi,
  //send buraya object send fonksiyonu olarak gelir
  //fonksiyonun kendisi hash gonderip alir
  //list obje icerir
  
  
  
  
  
  
  
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

DBH.onConnected.push(async () => {
  let core = new Core("Bakteriler#Global", Dil,Genelleme,["CinsAdi", "TurAdi", "SubTur"], 0);
  await core.Filter([{path:"root/Gram",field: "Negative", status: 1},
                {path:"root/Gram",field: "Positive", status: 2},
              ],(x) => console.log(), false);
  await core.Ekle(cBurnetii);
  //await DBH.RemoveObject("Coxiella-burnetii", core.type, core.name);
  /*await new Promise(res => setTimeout(x => {
    
    setTimeout(x => console.log("bitti"),1000);
  },1000));*/
  //DBH.RemoveFromIndex("596ccca4984ace5d480a1e22", "596bde0bf951ce3b3e95a935");
  //DBH.RemoveIndexPath("root/AileAdi/Coxiellaceae", core.name);
});


//console.log(core.GetId(cBurnetii));

//core.Remove(core.GetId(cBurnetii));
//console.log(core.Index);

/*
*/





























