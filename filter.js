



let Rules = {};
let AilePriority = {};//Yersinia : false, Citrobacter: true
let AileCount = {};
let FilterRule = function(id, status) {
  Rules[id] = status;
  RefreshRules();
  PriortyAssign();
  SortCinsler();
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
    let html = onurcan.querySelector(`#${B._HTML}`);
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
    //console.log(B.TurAdi,result);
    //console.log(html);
    if(result) {
      if(html.className != `card-panel aile-bakteri blue-grey darken-1`) {
        html.className = `card-panel aile-bakteri blue-grey darken-1`;
        AileCount[B.CinsAdi]++;
      }
      
    } else {
      if(html.className != `card-panel aile-bakteri blue-grey lighten-3`) {
        html.className = `card-panel aile-bakteri blue-grey lighten-3`;
        AileCount[B.CinsAdi]--;
      }
    }
  }
}


let IndexFamilies = function () {
  for(f of Families) {
    AilePriority[f.Name] = true;
    AileCount[f.Name] = f.VisibleCount;
  }
}
let PriortyAssign = function () {
  for(aile in AileCount) {
    if(AileCount[aile] == 0) {
      AilePriority[aile] = false;
    } else {
      AilePriority[aile] = true;
    }
  }
}



let localCompare = function (a, b) {
  let an = a.id.split("-")[0];
  let bn = b.id.split("-")[0];
  if(typeof AilePriority[an] === "undefined") {
    AilePriority[an] = true;
  }
  if(typeof AilePriority[bn] === "undefined") {
    AilePriority[bn] = true;
  }
  
  if(AilePriority[an] && !AilePriority[bn]) {
    return -1;
  } else if(!AilePriority[an] && AilePriority[bn]) {
    return 1;
  } else {
    if(an > bn) {
      return 1;
    } else if (an < bn) {
      return -1;
    } else {
      return 0;
    }
  }
}

let SortCinsler = function () {
  let ailelernl = document.querySelectorAll("#bakteriPaneli > .aile-panel");
  var aileler = [];
  for(var i = 0, n; n = ailelernl[i]; ++i) aileler.push(n);
  aileler.sort(localCompare);
  for(let k = 0; k < aileler.length; k++) {
    aileler[k].parentNode.appendChild(aileler[k]);
  }
}















