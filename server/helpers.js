
const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

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
Loader.Save = function (name, obj) {
  fs.writeFile(`./Data/${name}`,JSON.stringify(obj));
}
Loader.Load = function (name) {
  let txt = fs.readFileSync(`./Data/${name}`);
  return JSON.parse(txt);
}





let Bus = {};

Bus.Sockets = {};

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
    console.log(socket.id);
  });
}







module.exports = {
  Loader,
  Bus
}

















