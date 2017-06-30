
//server tarafli


let Core = function (Objs = [], Genelleme = {}, Dil, IdFields = ["CinsAdi", "TurAdi", "SubTur"]) {
  this.Index = new Index(Objs, Genelleme);
  this.Ekle = function (B) {
    this.Index._Ekle(B);
    this.SearchIndex._Ekle(B);
  };
  this.GetIdFull = function (IdFields, B) {
    let id = "";
    
    for(let f of IdFields) {
      if(typeof B[f] !== "undefined") {
        id += B[f];
        id += "-";
      }
    }
    if(id[id.length -1] == "-") {
      id = StringRemoveLast(id);
    }
    
    
    return id;
  }
  this.GetId = this.GetIdFull.bind(null, IdFields);
  this.SearchIndex = new SearchIndex(Objs, Dil, this.GetId);
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
  this.Filter = new Filter(this.GetId, Objs, this.Index);
}

//bakteri yazsa da alakasiz
let Index = function (Bakteriler = [], Genelleme) {

  
  
  let ObjectEkle = function (Val, Bakteri, Field, Parent, Path) {
    StringEkle(Val.Name, Bakteri, Field, Parent, Path);
    
    for(let subfields in Val) {
      if(subfields == "Name") {
        continue;
      }
      ObjRouter(Val[subfields],Bakteri, subfields, Parent, Path + "-" + subfields);
    }
    
  }
  let StringEkle = function (Val, Bakteri, Field, Parent, Path) {
    
    let NullCheck = function () {
      if(!Parent[Path]) {
        Parent[Path] = {};
      }
      if(!Parent[Path][Val]) {
        Parent[Path][Val] = [];
      }
    }
    
    
    let Ekle = function () {
      NullCheck();
      if(!Parent[Path][Val].find(x => x == Bakteri)) {
        Parent[Path][Val].push(Bakteri);
      }
    }
    
    
    
    //Genelleme Yuzunden Karmasik
    if(typeof Genelleme[Val] != "undefined" && !Array.isArray(Genelleme[Val]) && typeof Genelleme[Val].Genelleme === "undefined") {
      Ekle();
    } else if(typeof Genelleme[Val] != "undefined") {
      let arr;
      if(!Array.isArray(Genelleme[Val])) {
        arr = Genelleme[Val].Genelleme;
      } else {
        arr = Genelleme[Val];
      }
      for(let v of arr) {
        Ekle();
      }
    } else {
      Ekle();
    }
  }
  let ArrayEkle = function (Val, Bakteri, Field, Parent, Path) {
    for(let Vs of Val) {
      ObjRouter(Vs, Bakteri, Field, Parent, Path);
    }
  }
  let ObjRouter = function (Val, Bakteri, Field, Parent, Path) {
    if(typeof Val == "string") {
      StringEkle(Val, Bakteri, Field, Parent, Path);
      
    } else if(Array.isArray(Val)) {
      ArrayEkle(Val, Bakteri, Field, Parent, Path);
      
    } else if(typeof Val == "object") {
      ObjectEkle(Val, Bakteri, Field, Parent, Path);
    }
  }
  let BakteriRouter = function (Bakteri, Parent) {
    for(let Field in Bakteri) {
      if(Field[0] != "_")
      ObjRouter(Bakteri[Field], Bakteri, Field, Parent, Field);
    }
  }
  
  
  if(Bakteriler.count != 0) {
    for(B of Bakteriler) {
      BakteriRouter(B, this);
    }
  }
  
  this._Ekle = (B) => {
    BakteriRouter(B, this);
  } 
  
  
}

let SearchIndex = function (Bakteriler = [], Dil ,GetBakteriID) {
  
  let Sozluk = Dil._Sozluk;
  let _StringIngAlfabe = function (text) {
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
  let StringIngAlfabe = function (text) {

    if(Array.isArray(text)) {
    let arr = [];  
    for(let t of text) {
      arr.push(_StringIngAlfabe(t));
    }
    return arr;
      
    } else {
      return _StringIngAlfabe(text);
    }
    
    
  }
  
  let ObjectEkleSearch = function (Val, Bakteri, Field, index) {
    StringEkleSearch(Val.Name, Bakteri, Field, index);
    
    for(let subfields in Val) {
      ObjRouterSearch(Val[subfields],Bakteri, subfields, index);
    }
    
  }
  let StringEkleSearch = function (Val, Bakteri, Field, index) {
    
    if(typeof index[GetBakteriID(Bakteri)] == "undefined") {
      index[GetBakteriID(Bakteri)] = [];
    }
    let kelimeler = StringIngAlfabe(Sozluk(Val,true));
    for(let k of kelimeler) {
      index[GetBakteriID(Bakteri)].push(k.toLowerCase());
    }
    
    
  }
  let ArrayEkleSearch = function (Val, Bakteri, Field, index) {
    for(let Vs of Val) {
      ObjRouterSearch(Vs, Bakteri, Field, index);
    }
  }
  let ObjRouterSearch = function (Val, Bakteri, Field, index) {
    if(Field[0] == "_") return;
    
    if(typeof Val == "string") {
      StringEkleSearch(Val, Bakteri, Field, index);
      
    } else if(Array.isArray(Val)) {
      ArrayEkleSearch(Val, Bakteri, Field, index);
      
    } else if(typeof Val == "object") {
      ObjectEkleSearch(Val, Bakteri, Field, index);
    }
  }
  let BakteriRouterSearch = function (Bakteri, index) {
    for(let Field in Bakteri) {
      if(Field[0] != "_")
      ObjRouterSearch(Bakteri[Field], Bakteri, Field, index);
    }
  }
  
  if(Bakteriler.count != 0) {
    for(B of Bakteriler) {
      BakteriRouterSearch(B, this);
    }
  }
  
  this._Ekle = (B) => {
    BakteriRouterSearch(B, this);
  } 
  
  this._GetBakterilerIdFromText = (text) => {
    text = StringIngAlfabe(text).toLowerCase();
    let bakteriler = [];
    for(let b in this) {
      if(b[0] == "_") continue;
      if(this[b].findIndex((e,i,arr) => {
        return e.includes(text);
      }) != -1) {
        bakteriler.push(b);
      }
    }
    return bakteriler;
  }
  
  this._BakteriIceriyorMu = (B, text) => {
    text = StringIngAlfabe(text).toLowerCase();
    if(this[GetBakteriID(B)].findIndex((e,i,arr) => {
      return e.includes(text);
    }) != -1) {
      return true;
    }
    return false;
  }
  
}

let Filter = function (GetBakteriID, Bakteriler, Index) {
  this.Que = [];//{path = "Hastaliklar-Belirtiler", Val = "ates", status = 1} // 0 = normal, 1 = whitelist, 2 = blacklist, 3 = or whitelist
  
  
  
  this.AddQue = (Path, Val, Status) => {
    let Q = this.Que.find(e => e.Path == Path && e.Val == Val);
    if(Q) {
      Q.Status = Status;
    } else {
      this.Que.push({Path, Val, Status});
    }
  }
  
  
  
  this.Execute = () => {
    let Q = [];
    this.Que.map((e,i,arr) => {
      if(e.Status != 0) {
        Q.push(e);
      }
    });
    this.Que = Q;
    let Yey = [];
    let Nay = [];
    for(let B of Bakteriler) {
      let orList = {};
      let whitelist = true;
      let blacklist = true;
      for(let rule of this.Que) {
        if(whitelist == false || blacklist == false) continue;
        if(Index[rule.Path][rule.Val].findIndex(e => e == B) == -1) {//bulamadi
          if(rule.Status == 1) {//whitelist idi
            whitelist = false;
          }
        } else {//buldu
          if(rule.Status == 2) {//blacklist idi
            blacklist = false;
          } else if(rule.Status == 3) {
            if(typeof orList[Path] === "undefined") orList[Path] = true;
          }
        }
      }
      let orSonuc = true;
      for(let o in orList) {
        if(typeof orList[o] === "undefined") orSonuc = false;
      }
      
      let sonuc = whitelist && blacklist && orList;
      if(sonuc) Yey.push(B);
      else Nay.push(B);
    }
    return {Yey,Nay};
  }
  
  
  
  
}




let core = new Core(Bakteriler, Genelleme, Dil, ["CinsAdi", "TurAdi", "SubTur"]);


console.log(core);



















