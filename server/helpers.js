
const vm = require("vm");
const fs = require("fs");

let Loader = {};

Loader.LoadBakteriler = () => {
  Loader.RunJs("./../bakteriler.js");
  let BakterilerPath = "./../Bakteriler/";
  
  fs.readdirSync(BakterilerPath).map(e => Loader.RunJs(BakterilerPath + e));
  
  
}

Loader.RunJs = (Path) => {
  let data = fs.readFileSync(Path);
  vm.runInThisContext(data, Path);
}


module.exports = {
  Loader
}

















