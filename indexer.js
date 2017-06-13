
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





let ObjectEkle = function (Val, Bakteri, Field, Parent = TheIndex) {
  StringEkle(Val.Name, Bakteri, Field, Parent);
  
  for(let subfields in Val) {
    if(subfields == "Aciklama" || subfields == "Name") {
      continue;
    }
    ObjRouter(Val[subfields],Bakteri, subfields, Parent[Field]._Sub);
  }
  
}
let StringEkle = function (Val, Bakteri, Field, Parent = TheIndex) {
  NullCheck(Field,Val,Parent);
  if(!Parent[Field][Val].find(x => x == Bakteri)) {
    Parent[Field][Val].push(Bakteri);
  }
  
}
let ArrayEkle = function (Val, Bakteri, Field, Parent = TheIndex) {
  for(let Vs of Val) {
    ObjRouter(Vs, Bakteri, Field, Parent);
  }
}
let ObjRouter = function (Val, Bakteri, Field, Parent = TheIndex) {
  if(Field == "Aciklama") return;
  
  
  if(typeof Val == "string") {
    StringEkle(Val, Bakteri, Field, Parent);
    
  } else if(Array.isArray(Val)) {
    ArrayEkle(Val, Bakteri, Field, Parent);
    
  } else if(typeof Val == "object") {
    ObjectEkle(Val, Bakteri, Field, Parent);
  }
}
let BakteriRouter = function (Bakteri) {
  for(let Field in Bakteri) {
    ObjRouter(Bakteri[Field], Bakteri, Field, TheIndex);
  }
}







let IndexResolver = function (obj, alanPrefix = "") {
  for(let alan in obj) {
    let alanSocket = AddCategory(alanPrefix + alan + ":");
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
    let html = document.querySelector(`#${B.HTML}`);
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
  AddBacteriaToDisplay(B);
}
IndexResolver(TheIndex);
/*
for(let B of Bakteriler) {
  let content = document.createElement("div");
  content.className = "bakteri-content";
  for(field in B) {
    if(field == "HTML" || field[0] == "_") {
      continue;
    }
    let fieldInfoCard = GetInfoCard();
    let socket = GetInfoField(field + ": ");
    UnWrapField(B[field], socket);
    fieldInfoCard.appendChild(socket);
    content.appendChild(fieldInfoCard);
  }
  document.querySelector("#invisiblePanel").appendChild(content);
  B._content = content;
}*/

console.log(TheIndex);














