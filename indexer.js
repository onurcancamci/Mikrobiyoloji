
//                 // Hastaliklar : {Bubonik Veba : [B,B,B]
//                                    _Sub : {Belirtiler : {Ates : [B,B,B]}}  
//                                   }
//                                           {  x        : {y    : [B,B,B]}
let TheIndex = {}; // Family : {Yersinia : [B,B,B]}
//                     {x   :  {y : [B,B,B]}}

let NullCheck = function (Field, Val, Parent) {
  if(!Parent[Field]) {
    Parent[Field] = {};
    Parent[Field]["_Sub"] = {};
  }
  if(!Parent[Field][Val]) {
    Parent[Field][Val] = [];
  }
}





let ObjectEkle = function (Val, Bakteri, Field, Parent = TheIndex, Path) {
  StringEkle(Val.Name, Bakteri, Field, Parent, Path);
  
  for(let subfields in Val) {
    if(!IndexFieldFilter(subfields, Path + "-" + subfields)) {
      continue;
    }
    ObjRouter(Val[subfields],Bakteri, subfields, Parent[Field]._Sub, Path + "-" + subfields);
  }
  
}
let StringEkle = function (Val, Bakteri, Field, Parent = TheIndex, Path) {
  
  if(typeof Genelleme[Val] != "undefined" && !Array.isArray(Genelleme[Val]) && typeof Genelleme[Val].Genelleme === "undefined") {
    NullCheck(Field,Val,Parent);
    if(!Parent[Field][Val].find(x => x == Bakteri)) {
      Parent[Field][Val].push(Bakteri);
    }
  } else if(typeof Genelleme[Val] != "undefined") {
    let arr;
    if(!Array.isArray(Genelleme[Val])) {
      arr = Genelleme[Val].Genelleme;
    } else {
      arr = Genelleme[Val];
    }
    for(let v of arr) {
      NullCheck(Field,v,Parent);
      if(!Parent[Field][v].find(x => x == Bakteri)) {
        Parent[Field][v].push(Bakteri);
      }
    }
  } else {
    NullCheck(Field,Val,Parent);
    if(!Parent[Field][Val].find(x => x == Bakteri)) {
      Parent[Field][Val].push(Bakteri);
    }
  }
  
  
  
}
let ArrayEkle = function (Val, Bakteri, Field, Parent = TheIndex, Path) {
  for(let Vs of Val) {
    ObjRouter(Vs, Bakteri, Field, Parent, Path);
  }
}
let ObjRouter = function (Val, Bakteri, Field, Parent = TheIndex, Path) {
  //if(Field == "Aciklama") return;
  if(!IndexFieldFilter(Field,Path)) return;
  
  
  if(typeof Val == "string") {
    StringEkle(Val, Bakteri, Field, Parent, Path);
    
  } else if(Array.isArray(Val)) {
    ArrayEkle(Val, Bakteri, Field, Parent, Path);
    
  } else if(typeof Val == "object") {
    ObjectEkle(Val, Bakteri, Field, Parent, Path);
  }
}
let BakteriRouter = function (Bakteri) {
  for(let Field in Bakteri) {
    ObjRouter(Bakteri[Field], Bakteri, Field, TheIndex, Field);
  }
}






//filter menusundeki html i olusturur
let IndexResolver = function (obj, alanPrefix = "") {
  for(let alan in obj) {
    let alanSocket = AddCategory(alanPrefix + alan);
    for(let eleman in obj[alan]) {
      if(eleman == "_Sub") {
        if(obj[alan][eleman] && Object.keys(obj[alan][eleman]).length > 0) {
          IndexResolver(obj[alan][eleman], alanPrefix + alan + "-");
        }
        continue;
      }
      AddEleman(eleman,alanSocket, alanPrefix + alan);
    }
  }
}


let Rules = {};
let FilterRule = function(id, status) {
  Rules[id] = status;
  RefreshRules();
}
let ReachArray = function (path, eleman) {
  let obj = TheIndex;
  for(let k = 0; k < path.length; k++) {
    obj = obj[path[k]];
    if(k != path.length - 1) {
      obj = obj["_Sub"];
    }
  }
  return obj[eleman];
}
let RefreshRules = function () {
  for(let B of Bakteriler) {
    let html = document.querySelector(`#${B._HTML}`);
    let needTest = true;
    let failTest = false;
    for(let id in Rules) {
      if(Rules[id] == 0) {
        continue;
      } else if(Rules[id] == 1) {
        let path = StringRemoveLast(id);
        path = path.split("-");
        let eleman = id.split("-").last();
        let bs = ReachArray(path,eleman);
        if(bs.findIndex(e => e == B) == -1) {
          needTest = false;
        }
        
      } else {
        let path = StringRemoveLast(id);
        path = path.split("-");
        let eleman = id.split("-").last();
        let bs = ReachArray(path,eleman);
        if(bs.findIndex(e => e == B) != -1) {
          failTest = true;
        }
      }
    }
    let result = needTest && !failTest;
    //console.log(B.DiffName,result);
    //console.log(html);
    if(result) {
      html.className = `card-panel aile-bakteri blue-grey darken-1`;
    } else {
      html.className = `card-panel aile-bakteri blue-grey lighten-3`;
    }
  }
  
}






for(let B of Bakteriler) {
  BakteriRouter(B);
  AddBacteriaToDisplay(B);//sadece isimler ve aileler
}
IndexResolver(TheIndex);


let TextCardClickEkle = function (obj, text) {
  if(typeof Genelleme[text] != "undefined") {
    //console.log(text);
    obj.onclick = function () {
      let sp = document.querySelector("#smallPanel");
      if(sp.style.display == "block") {
        return;
      }
      document.querySelector("#leftPanel").style.filter = "brightness(20%)";
      let genelleme = Genelleme[text];
      let infoCard = GetInfoCard();
      if(Array.isArray(genelleme)) {
        let nsocket = GetInfoField(Sozluk("Genelleme") + ": ");
        infoCard.appendChild(nsocket);
        
        for(g of genelleme) {
          nsocket.appendChild(GetTextCard(Sozluk(g)));
        }
        
      } else {
        for(let f in genelleme) {
          let nsocket = GetInfoField(Sozluk(f) + ": ");
          infoCard.appendChild(nsocket);
          
          for(g of genelleme[f]) {
            nsocket.appendChild(GetTextCard(Sozluk(g)));
          }
        }
      }
      sp.appendChild(infoCard);
      sp.style.display = "block";
    }
  }
}
let CloseSmallPanel = function () {
  let sp = document.querySelector("#smallPanel");
  document.querySelector("#leftPanel").style.filter = "brightness(100%)";
  sp.style.display = "none";
  sp.innerHTML = "";
}
//infocard olusturup left panel display html i olustur
let UnWrapField = function (val, socket) {
  if(typeof val == "string") {
    let textcard = GetTextCard(Sozluk(val));
    socket.appendChild(textcard);
    TextCardClickEkle(textcard, val);
    
  } else if(Array.isArray(val)) {
    for(let v of val) {
      UnWrapField(v, socket);
    }
  } else if(typeof val == "object" && typeof val["Name"] !== "undefined") {
    let infoCard = GetInfoCard();
    socket.appendChild(infoCard);
    infoCard.appendChild(GetInfoField(Sozluk(val.Name)));
    
    for(let f in val) {
      if(f == "Name") continue;
      
      let nsocket = GetInfoField(Sozluk(f) + ": ");
      infoCard.appendChild(nsocket);
      UnWrapField(val[f], nsocket);
      
    }
    
  }
}
//premake left panel contents
for(let B of Bakteriler) {
  let content = document.createElement("div");
  content.className = "bakteri-content";
  for(field in B) {
    if(field[0] == "_") {
      continue;
    }
    let fieldInfoCard = GetInfoCard();
    let socket = GetInfoField(Sozluk(field) + ": ");
    UnWrapField(B[field], socket);
    fieldInfoCard.appendChild(socket);
    content.appendChild(fieldInfoCard);
  }
  document.querySelector("#invisiblePanel").appendChild(content);
  B._content = content;
}



//document.querySelector(`#${Bakteriler[0]._HTML}`).parentElement.style.display = "block";

let StringIngAlfabe = function (text) {
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


let SearchIndex = {};

let ObjectEkleSearch = function (Val, Bakteri, Field) {
  StringEkleSearch(Val.Name, Bakteri, Field);
  
  for(let subfields in Val) {
    ObjRouterSearch(Val[subfields],Bakteri, subfields);
  }
  
}
let StringEkleSearch = function (Val, Bakteri, Field) {
  
  if(typeof SearchIndex[Bakteri.FamilyName + "-" + Bakteri.DiffName] == "undefined") {
    SearchIndex[Bakteri.FamilyName + "-" + Bakteri.DiffName] = [];
  }
  //baska diller de ekle
  SearchIndex[Bakteri.FamilyName + "-" + Bakteri.DiffName].push(StringIngAlfabe(Sozluk(Val)).toLowerCase());
  
}
let ArrayEkleSearch = function (Val, Bakteri, Field) {
  for(let Vs of Val) {
    ObjRouterSearch(Vs, Bakteri, Field);
  }
}
let ObjRouterSearch = function (Val, Bakteri, Field) {
  if(Field[0] == "_") return;
  //if(!IndexFieldFilter(Field,Path)) return;
  
  
  if(typeof Val == "string") {
    StringEkleSearch(Val, Bakteri, Field);
    
  } else if(Array.isArray(Val)) {
    ArrayEkleSearch(Val, Bakteri, Field);
    
  } else if(typeof Val == "object") {
    ObjectEkleSearch(Val, Bakteri, Field);
  }
}
let BakteriRouterSearch = function (Bakteri) {
  for(let Field in Bakteri) {
    ObjRouterSearch(Bakteri[Field], Bakteri, Field);
  }
}

for(let B of Bakteriler) {
  BakteriRouterSearch(B);
}

/*
let ObjectEkleSozluk = function (Val, Bakteri, Field) {
  StringEkleSozluk(Val.Name, Bakteri, Field);
  
  for(let subfields in Val) {
    ObjRouterSozluk(Val[subfields],Bakteri, subfields);
  }
  
}
let StringEkleSozluk = function (Val, Bakteri, Field) {
  SozlukBuild(Field);
  SozlukBuild(Val);
  
}
let ArrayEkleSozluk = function (Val, Bakteri, Field) {
  for(let Vs of Val) {
    ObjRouterSozluk(Vs, Bakteri, Field);
  }
}
let ObjRouterSozluk = function (Val, Bakteri, Field) {
  if(Field[0] == "_") return;
  //if(!IndexFieldFilter(Field,Path)) return;
  
  
  if(typeof Val == "string") {
    StringEkleSozluk(Val, Bakteri, Field);
    
  } else if(Array.isArray(Val)) {
    ArrayEkleSozluk(Val, Bakteri, Field);
    
  } else if(typeof Val == "object") {
    ObjectEkleSozluk(Val, Bakteri, Field);
  }
}
let BakteriRouterSozluk = function (Bakteri) {
  for(let Field in Bakteri) {
    ObjRouterSozluk(Bakteri[Field], Bakteri, Field);
  }
}

for(let B of Bakteriler) {
  BakteriRouterSozluk(B);
}
for(g in Genelleme) {
  if(Array.isArray(Genelleme[g])) {
    for(m of Genelleme[g]) {
      SozlukBuild(m);
    }
  } else {
    for(m in Genelleme[g]) {
      for(mm of Genelleme[g][m]) {
        SozlukBuild(mm);
      }
    }
  }
}
SBS += "}";
console.log(SBS);
let TSBS = SBS;
while (TSBS == SBS) {
  TSBS = prompt("SBS", SBS);
}


*/



//console.log(TheIndex);














