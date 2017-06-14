



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
    //console.log(B.DiffName,result);
    //console.log(html);
    if(result) {
      html.className = `card-panel aile-bakteri blue-grey darken-1`;
    } else {
      html.className = `card-panel aile-bakteri blue-grey lighten-3`;
    }
  }
  
}























