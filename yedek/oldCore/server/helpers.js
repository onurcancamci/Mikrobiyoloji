
const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let {Core} = require("./core.js");
let {Dil,Genelleme} = require("./language.js");

let System = {
    Dil : Dil,
    Genelleme : Genelleme,
}

//sadece load etmek icin
let Loader = {};
Loader.LoadFiles = (Names = "Bakteriler") => {
  Loader.RunJs(`./../${Names}.js`);
  let BakterilerPath = `./../${Names}/`;
  fs.readdirSync(BakterilerPath).map(e => Loader.RunJs(BakterilerPath + e));
  let objs = Bakteriler;
  return return objs;
}
Loader.RunJs = (Path) => {
  let data = fs.readFileSync(Path);
  vm.runInThisContext(data, Path);
}
Loader.Save = function (name, obj) {
  fs.writeFile(`./Data/${name}`,JSON.stringify(obj));
}
Loader.Load = function (name) {
  let txt = fs.readFileSync(`./Data/${name}`);
  return JSON.parse(txt);
}
Loader.LoadToNewCore = function (Name = "Bakteriler", idFields = ["CinsAdi", "TurAdi", "SubTur"]) {
  Loader.LoadFiles(Name);
  let objs = Bakteriler;
  let core = new Core(objs, Genelleme, Dil, idFields);
  return core;
}



//interface for core
//mongo db ye tasinirsa core
//gorevini bu ustlenir
//belki yeni bir core
let Manager = function (core) {
  
}

















let Bus = {};

Bus.Sockets = {};

Bus.Login = function (id, data) {
  
}
Bus.GetFromSv = function (id, data) {
  
}


Bus.Open = function (Port = 3000) {
  app.use('/', express.static('./../public'));
  http.listen(Port, function() { 
    console.log('listening'); 
  });
  
  io.on('connection', function(socket){
    Bus.Sockets[socket.id] = {
      socket: socket,
      username: "anonymous",
      password: "anonymous", //md5 gonder client trafindan
    }
    
    socket.on("login", function (data) {
      Bus.Login(socket.id,data);
    });
    
    socket.on("get-from-sv", function (data) {
      Bus.GetFromSv(socket.id, data);
    });
    
    
    console.log(socket.id);
  });
}







module.exports = {
  Loader,
  Bus
}

















