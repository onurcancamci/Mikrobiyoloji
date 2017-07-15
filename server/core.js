
const {Helpers} = require('./helpers.js');
const md5 = require('js-md5');
const {Dil,Genelleme} = require("./language.js");

//index
//filter
//search
//chat
//args da level, path, layer = 0 gerekli
//level = "Belirtiler" path = "Hastaliklar/Belirtiler"
let DoString = function (string, args, job) {
  job(string, args);
}
let DoArray = function (array, args, job, arrjob, objectjob) {
  if(arrjob) objectjob(array, args);
  
  for(let n of array) {
    DoRouter(n, args, job, arrjob, objectjob);
  }
  
}
let DoObj = function (object, args, job, arrjob, objectjob) {
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
let DoRouter = function (object, args, job, arrjob, objectjob) {
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

let WhiteMerge = function (list, arr) {
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
let BlackMerge = function (list, arr) {
  if(!arr) return list;
  for(let e of arr) {
    if(list.findIndex(x => x == e) == -1) list.push(e);
  }
  return list;
}
let WhiteBlackMerge = function (white, black) {
  for(let k = 0; k < white.length; k++) {
    let e = white[k];
    if(black.findIndex(x => x == e) != -1) {
      white.splice(k,1);
      k--;
    }
  }
}


let Core = function (Dil, Genelleme = {}, IdFields = ["CinsAdi", "TurAdi", "SubTur"], onlineOnly = false) {
  this.Objects = [];
  this.Index = {};
  this.SearchIndex = {};
  this.onlineOnly = onlineOnly; 
  
  this.Ekle = (O) => {
    O = Arrayify(O);
    for(let o of O) {
      this.Objects.push(o);
      DoRouter(O, {
        level: "root",
        path: "root",
        layer: 0,
        Index: this.Index,
        Object: O,
      },(string, args) => {
        NDEF(args.Index,args.path,{});
        NDEF(args.Index[args.path],string,[]);
        args.Index[args.path][string].push(args.Object);
      });
    }
    
    for(let o of O) {
      let id = this.GetId(o);
      o._id = id;
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
  
  }
  this.Remove = (Oid) => {
    let O = this.Objects.find(o => o._id == Oid);
    if(this.SearchIndex[Oid]) delete this.SearchIndex[Oid];
    for(let field in this.Index) {
      for(let names in this.Index[field]) {
        this.Index[field][names].remove(O);
      }
    }
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
  this.Filter = (rules, send, online, count, page) => {
    let white = [];
    let black = [];
    let orlist = {};
    
    for(let rule of rules) {
      if(rule.status == 0) continue;
      //white
      if(rule.status == 1) {
        WhiteMerge(white, this.Index[rule.path][rule.field]);
      } else if(rule.status == 2) {
        BlackMerge(black, this.Index[rule.path][rule.field]);
      } else {
        NDEF(orlist, rule.path, []);
        BlackMerge(orlist[rule.path], this.Index[rule.path][rule.field]);
      }
    }
    
    for(let p in orlist) {
      WhiteMerge(white,orlist[p]);
    }
    
    WhiteBlackMerge(white,black);
    
    if(online || this.onlineOnly) {
      offset = page * count;
      white = white.filter((e,i,arr) => {
        if(i < offset || i >= offset + count) return false;
        return true;
      });
    }
    send(white,online);
    
  }
  //online icin {id,hash} gonder, client istediklerini yollar, normal obje gider
  //bunu filter fonksiyonu kullanir sadece
  //olumlu bos ise hepsi,
  //send buraya object send fonksiyonu olarak gelir
  //fonksiyonun kendisi hash gonderip alir
  //list obje icerir
  
  
  
  
  
  if(!onlineOnly)
    this.MD5 = md5(JSON.stringify(this.Objects));
  
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

let core = new Core(Dil,Genelleme,["CinsAdi", "TurAdi", "SubTur"], false);
//console.log(core.GetId(cBurnetii));
core.Ekle(cBurnetii);
//core.Remove(core.GetId(cBurnetii));
//console.log(core.Index);

core.Filter([{path:"root/Gram",field: "Negative", status: 1},
              {path:"root/Gram",field: "Positive", status: 2},
              {path:"root/Solunum",field: "Fakultatif_Anaerob", status: 1},
              {path:"root/Solunum",field: "Aerob", status: 1}
              ],(x) => console.log(x), false);






























