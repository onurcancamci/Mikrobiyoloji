

let Core = function (Objs = [], Genelleme = {}) {
  this.Index = new Index(Objs, Genelleme);
  this.Ekle = this.Index._Ekle;
  
  
  
  
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

let SearchIndex = function () {
  
}



let core = new Core(Bakteriler, Genelleme);


console.log(core);



















