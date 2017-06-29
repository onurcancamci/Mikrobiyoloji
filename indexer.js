
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
    if(!IndexFieldFilter(subfields, Path + "-" + subfields) || subfields == "Name") {
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
    if(Field[0] != "_")
    ObjRouter(Bakteri[Field], Bakteri, Field, TheIndex, Field);
  }
}
let ConstructIndex = function (bakteriler = Bakteriler) {
  TheIndex = {};
  for(let B of bakteriler) {
    BakteriRouter(B);
  }
}





















//onurcan.querySelector(`#${Bakteriler[0]._HTML}`).parentElement.style.display = "block";

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
  
  if(typeof SearchIndex[GetBakteriID(Bakteri)] == "undefined") {
    SearchIndex[GetBakteriID(Bakteri)] = [];
  }
  //baska diller de ekle
  SearchIndex[GetBakteriID(Bakteri)].push(StringIngAlfabe(Sozluk(Val)).toLowerCase());
  
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

let SozlukBuilderStart = function () {
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
  prompt("SBS", SBS);
}





















