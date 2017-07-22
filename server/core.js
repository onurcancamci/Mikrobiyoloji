
const {Helpers, DBH} = require('./helpers.js');
const md5 = require('js-md5');
const {Dil,Genelleme} = require("./language.js");
const Locks = {};

const IdFields = {
  bakteriler: ["CinsAdi", "TurAdi", "SubTur"],
}

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

let DoStringSync = function (string, args, job) {
  job(string, args);
}
let DoArraySync = function (array, args, job, arrjob, objectjob) {
  if(arrjob) objectjob(array, args);
  
  for(let n of array) {
    DoRouterSync(n, args, job, arrjob, objectjob);
  }
  
}
let DoObjSync = function (object, args, job, arrjob, objectjob) {
  if(objectjob) objectjob(object, args);
  if(object.Name) job(object.Name, args);
  
  for(let field in object) {
    if(field == "Name" || field[0] == "_") continue;
    let nargs = Helpers.ShallowCopy(args);
    nargs.level = field;
    nargs.path += `/${field}`;
    nargs.layer++;
    DoRouterSync(object[field], nargs, job, arrjob, objectjob);
  }
  
  
}
let DoRouterSync = function (object, args, job, arrjob, objectjob) {
  if(typeof object == "string") {
    DoStringSync(object, args, job);
    
  } else if(Array.isArray(object)) {
    DoArraySync(object, args, job, arrjob, objectjob);
    
  } else if(typeof object == "object") {
    DoObjSync(object, args, job, arrjob, objectjob);
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

let ArrayMerge = function (arr1, arr2) {
  for(let e of arr2) {
    if(arr1.findIndex(x => x.toString() == e.toString()) == -1) {
      arr1.push(e);
    }
  }
}
let WhiteMerge = function (list, arr) {
  if(!arr || arr.length == 0) {
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
      let ind = arr.findIndex(x => x.toString() == e.toString());
      if(ind == -1) {
        list.splice(k,1);
        k--;
      }
    }
  }
  return list;
}
let BlackMerge = function (list, arr) {
  if(!arr || arr.length == 0) return list;
  for(let e of arr) {
    if(list.findIndex(x => x.toString() == e.toString()) == -1) list.push(e);
  }
  return list;
}
let WhiteBlackMerge = function (white, black) {
  for(let k = 0; k < white.length; k++) {
    let e = white[k];
    if(black.findIndex(x => x.toString() == e.toString()) != -1) {
      white.splice(k,1);
      k--;
    }
  }
}



let Core = {
  GetObjectId: async function (coreName, onurid) {
    return await DBH.GetObjectId(onurid, coreName);
  },
  GetObject: async function (coreName, objid) {
    return await DBH.GetObject(objid, coreName);
  },
  SetObject: async function (coreName, obj, onurid) {
    return await DBH.SetObject(obj, onurid, coreName);
  },
  GetIndex: async function (coreName, path) {
    let indpath = await DBH.GetIndexPath(path, coreName);
    if(!indpath) return null;
    return indpath.objs;
  },
  SetIndex: async function (coreName, arr, path) {
    DBH.SetIndexPath({path: path, objs: arr, coreName: coreName}, coreName);
  },
  AddObjToIndex: async function (coreName, path, objid) {
    DBH.AddObjToIndex(path, objid, coreName);
  },
  DBChanged: async function (coreName) {
    await DBH.IncrementVersion(coreName);
    let online = await DBH.GetCoreField(coreName, "online");
    if(online != 2) {
      await DBH.BackUpCore(coreName);
    }
  },
  GetOnurID: function (type, B) {
    let id = "";
    for(let f of IdFields[type]) {
      if(typeof B[f] !== "undefined") {
        id += B[f];
        id += "-";
      }
    }
    if(id[id.length -1] == "-") {
      id = id.slice(0, -1);
    }
    return id;
  },
  Ekle: async function (coreName, BS) {
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
  },
  Remove: async function (coreName, onurid) {
    DBH.RemoveObject(onurid, coreName);
    this.DBChanged();
  },
  Filter: async function (cores, rules, send, count = -1, page) {
    let whiteCores = [];
    let blackCores = [];
    
    for(let c of cores) {
      if(!(await DBH.GetCoreField(c, "inverted"))) whiteCores.push(c);
      else blackCores.push(c); 
    }
    
    let white = [];
    let black = [];
    let orlist = {};
    
    let nfunc = async (path) => {
      let wtmp = [];
      let btmp = [];
      for(let core of whiteCores) {
        ArrayMerge(wtmp, await this.GetIndex(core, path));
      }
      for(let core of blackCores) {
        ArrayMerge(btmp, await this.GetIndex(core, path));
      }
      WhiteBlackMerge(wtmp,btmp);
      
      return wtmp;
    }
    
    for(let k = 0; k < rules.length; k++) {
      if(rules[k].status == 0) {
        continue;
      }
      let path = rules[k].path+"/"+rules[k].field;
      if(rules[k].status == 1) {
        
        let wtemp = await nfunc(path);
        WhiteMerge(white, wtemp);
        
      } else if(rules[k].status == 2) {
        let btemp = await nfunc(path);
        BlackMerge(black, btemp);
        
      } else {
        NDEF(orlist, rules[k].path, []);
        let otemp = await nfunc(path);
        BlackMerge(orlist[rules[k].path], otemp);
        
      }
    }
    
    for(let p in orlist) {
      WhiteMerge(white,orlist[p]);
    }
    WhiteBlackMerge(white,black);
    
    if(count != -1) {
      offset = page * count;
      white = white.filter((e,i,arr) => {
        if(i < offset || i >= offset + count) return false;
        return true;
      });
    }
    white = await DBH.ObjidToOnurid(white, await DBH.GetCoreType(cores[0]));
    send(white, count, page);
  },
  Search: async function (cores, text, send, lang = "", count = -1, page) {
    let whiteCores = [];
    let blackCores = [];
    
    for(let c of cores) {
      if(!(await DBH.GetCoreField(c, "inverted"))) whiteCores.push(c);
      else blackCores.push(c);
    }
    //lang i bol sadece secili dillerde arama
    
    text = S2ENG(text.toLowerCase());
    
    let white = [];
    
    //blackCores ignored for now
    for(let core of whiteCores) {
      let tmpwhite = await DBH.SearchText(text, core, lang);
      if(tmpwhite == null) {
        continue;
      }
      ArrayMerge(white, tmpwhite);
    }
    if(white == null) {
      send(white, count, page);
      return null;
    }
    if(count != -1) {
      offset = page * count;
      white = white.filter((e,i,arr) => {
        if(i < offset || i >= offset + count) return false;
        return true;
      });
    }
    white = await DBH.ObjidToOnurid(white, await DBH.GetCoreField(cores[0],"type"));
    send(white, count, page);
  },
  GetLocalCopy: async function (coreName) {
    let online = await DBH.GetCoreField(coreName, "online");
    if(online != 2) {
      return await DBH.GetBackUp(coreName);
    }
    return null;
  },
  //getcounter?
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
  
  await DBH.CacheField("inverted");
  await DBH.CacheField("type");
  await DBH.CacheField("online");
  await DBH.CacheField("global");
  
  //console.log(await DBH.GetCoreInfo("Bakteriler#Global"));
  /*await Core.Filter(["Bakteriler#Global"],
                              [{path:"root/Gram",field: "Negative", status: 1},{path:"root/Gram",field: "Positive", status: 2}],
                              (x) => console.log(x));*/
                              
  
                              
  
  //await core.Ekle(cBurnetii);
  //await core.Search("Ateş", (x) => console.log(x));
  //core.Remove("Coxiella-burnetii");
});






1
























