/*
//0 = normal, 1 = whitelist, 2 = blacklist, 3 = orlist
//{path: "root/Hastaliklar/Belirtiler", field: "Ates", status: 1}
//count -1 = all
let Core = function (Name, Dil, Genelleme = {}, IdFields = ["CinsAdi", "TurAdi", "SubTur"], online = 0, globalCore = true, type = "bakteriler") {
  this.name = Name;
  this.global = globalCore;
  this.online = online;
  this.type = type;
  
  this.Objects = new Proxy({}, {
    get: async function (target, prop, reciever) {
      return await DBH.GetObjectId(prop, type, Name);
    },
    set: async function (target, prop, val, reciever) {
      DBH.SetObject(val, prop, type, Name);
    }
  });
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
  this._AddObject = async function (onurid, obj) {
    return await DBH.SetObject(obj, onurid, type, Name);
  }
  
  this._DBChanged = async () => {
    await DBH.IncrementVersion(Name);
    if(online != 2) {
      await DBH.BackUpCore(Name, type);
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
  
  this.Ekle = async (O) => {
    O = Arrayify(O);
    let didChange = false;
    for(let o of O) {
      let id = this.GetId(o);
      let hash = md5(o);
      let dogrulama = await DBH.CheckObject(id, hash, type, Name); if(dogrulama) continue;
      didChange = true;
      o._ID = id;
      o._hash = hash;
      let objid = await this._AddObject(id, o);
      DoRouter(o, {
        level: "root",
        path: "root",
        layer: 0,
        Object: objid,// id olcak
      },async (string, args) => {
        this.IndexAdd(args.path+"/"+string, args.Object);
      });
      
      let langs = {};
      DoRouterSync(O, {
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
        DBH.SetSearchTextObjid(langs[lang], objid, lang, Name, type);
      }
      
      
    }
    if(didChange) this._DBChanged();
    
  }
  this.Remove = async (Oid) => {
    DBH.RemoveObject(Oid, type, Name);
    this._DBChanged();
  }
  
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
    white = await DBH.ObjidToOnurid(white, Name, type);
    send(white, count, page);
  }
  this.Search = async (text, send, lang = "", count = -1, page) => {
    //lang i bol sadece secili dillerde arama
    
    text = S2ENG(text.toLowerCase());
    
    let white = await DBH.SearchText(text, Name, lang);
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
    white = await DBH.ObjidToOnurid(white, Name, type);
    send(white, count, page);
  }
  this.GetLocalCopy = async function () {
    if(online != 2) {
      return await DBH.GetBackUp(Name);
    }
    return null;
  }
  this.GetFullObject = async function (objid) {
    return await DBH.GetObject(objid, type, Name)
  }
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
  
}*/






let num = 0;

for(let k = 0; k < 10000; k++) {
  setTimeout(() => {
    setInterval(() => {
      Core.Filter(["Bakteriler#Global"],
                                  [{path:"root/Gram",field: "Negative", status: 1},{path:"root/Gram",field: "Positive", status: 2}],
                                  (x) => {});
      num++;
    }, 100);
  }, k+10);
}

setInterval(() => console.log(num), 100);




