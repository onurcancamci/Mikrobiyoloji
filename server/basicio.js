const vm = require("vm");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const url = require('url');
const WebSocket = require('ws');
const server = http.createServer(app);
const shortid = require('shortid');
const {DBH, DBHP, ID} = require('./helpers2.js');
const util = require('util');


const Locks = {};
global.Lock = (id) => new Promise(res => {
  Locks[id] = res;
});
global.Unlock = (id,val) => {
  if(id in Locks && Locks[id]) {
    Locks[id](val);
    Locks[id] = null;
  }
}


app.use('/', express.static('./../public'));
server.listen(3000, function() { 
  console.log('listening'); 
});

const wss = new WebSocket.Server({ server });
const Sockets = {};
wss.on('connection', function connection(ws) {
  let id = shortid.generate();
  Sockets[id] = ws;
  ws._id = id;
  //message icinde _id:, data: {}, comm: "", token: ""
  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    bio['recieve'](message, ws._id);
  });
  //onclose ekle
});

let bio = {};
bio.getUserid = async function (token) {
  if(!token) return -1;
  let user = await DBHP("users", "findOne", {tokens: token}, {_id: 1});
  if(!user) return -1;
  return (user)._id; 
}

bio.command = async function (message, wsid) {
  let userid = await bio.getUserid(message.token);
  Commands[message.comm](message, userid, wsid);
}
bio.recieve = function (message, wsid) {
  if(message.comm == "response") {
    Unlock(message._id, message);
  } else {
    bio.command(message, wsid);
  }
}
bio.send = function (message, wsid) {
  if(!message._id)
    message._id = shortid.generate();
  Sockets[wsid].send(JSON.stringify(message));
  return Lock(message._id);
}


let Commands = {
  //{cores: , groups: , user: }
  test: async function (message, userid, wsid) {
    console.log(message, userid, wsid);
    bio.send({_id: message._id, data: message.data, comm:"response"}, wsid);
  },
  sync: async function (message, userid, wsid) {
    let Data = message.data;
    let groups = await DBH.groups.getIdsByUser(userid); groups = groups?groups:[];
    let cores = await DBH.cores.getByOwners([userid, ...groups]);
    let sonuc = {cores: {}, groups: {}};
    let change = false;
    change = await SyncComp("cores", Data, sonuc, cores) || change;
    change = await SyncComp("groups", Data, sonuc, groups) || change;
    
    sonuc.user = await DBH.users.getForSync(userid, Data.user);
    bio.send({_id: message._id, data: sonuc, comm:"response"}, wsid);

  },
  login: async function (message, userid, wsid) {
    let username = message.data.username;
    let password = message.data.password;
    let user = await DBHP("users", "findOne", {username, password}, {_id: 1});
    if(user != null) {
      let token = shortid.generate();
      await DBHP("users", "updateOne", ID(user._id), {$push: {tokens: token}});
      bio.send({_id: message._id, comm:"response", data: user._id, token}, wsid);
    } else {
      bio.send({_id: message._id, comm:"response", data: "password or username is wrong"}, wsid);
    }
  },
  logout: async function (message, userid, wsid) {
    await DBHP("users", "updateOne", ID(userid), {$pull: {tokens: message.token}});
    bio.send({_id: message._id, comm:"response", data: "logout success"}, wsid);
  },
  register: async function (message, userid, wsid) {
    let user = message.data;
    let existing = await DBHP("users", "findOne", {$or: [{username: user.username},{email: user.email}]}, {_id:1});
    if(existing) {
      bio.send({_id: message._id, comm:"response", data: "username or email exists"}, wsid);
    } else {
      userid = (await DBHP("users","insertOne", user)).insertedId;
      let token = shortid.generate();
      await DBHP("users", "updateOne", ID(userid), {$push: {tokens: token}});
      bio.send({_id: message._id, comm:"response", data: userid, token}, wsid);
    }
  },
  db: async function (message, userid, wsid) {
    if(userid == -1) return;
    let comm = message.data.comm;
    let data = message.data.data;
    let coreAuth = async function (coreid) {
      return await DBH.cores.auth(coreid, userid);
    }
    let groupAuth = async function (groupid) {
      return await DBH.groups.auth(groupid, userid);
    }

    if(comm == "cores.cikar" || comm == "cores.update") { //data: {coreid:"", args: []}
      if(!coreAuth(data.coreid)) return -1;
      data.args = data.args?data.args:[];
      await DBH["cores"][comm.split('.')[1]](data.coreid, ...data.args);

    } else if(comm == "object.cikar" || comm == "object.ekle") { //data: {_core, ...}
      if(!coreAuth(data._core)) return -1;
      await DBH["objects"][comm.split('.')[1]](data);


    } else if(comm == "groups.cikar" || comm == "groups.update") { //data: {groupid:"", args: []}
      if(!groupAuth(data.groupid)) return -1;
      data.args = data.args?data.args:[];
      await DBH["groups"][comm.split('.')[1]](data.groupid, ...data.args);


    } else if(comm == "cores.ekle") { //data: core
      if(!(data.belongsTo.toString() == userid.toString() || 
        (data.status == 1 && groupAuth(data.belongsTo)))) return -1;

      await DBH.cores.ekle(data);


    } else if(comm == "groups.ekle") { //data: group
      data.admins = [ObjectId(userid)]; //?
      await DBH.groups.ekle(data);
    } else {
      return -1;
    }
    bio.send({_id: message._id, comm:"response", data: "success"}, wsid);
  },
  filter: async function (message, userid, wsid) { //data: {rules: [], cores: []}
    let coreAuth = async function (coreid) {
      return await DBH.cores.auth(coreid, userid);
    }  
    let data = message.data;
    if(!(data.cores) || data.cores.length == 0) {
      let groups = await DBH.groups.getIdsByUser(userid); groups = groups?groups:[];
      let acores = await DBH.cores.getByOwners([userid, ...groups]);
      data.cores = acores;
    } else {
      for(let core of data.cores) {
        if(!coreAuth(core)) return -1;
      }
    }
    let sonuc = await DBH.filter(data.rules, data.cores);
    bio.send({_id: message._id, comm:"response", data: sonuc}, wsid);
  },
  search: async function (message, userid, wsid) { //data: {text: "", cores: [], langs: []}
    let coreAuth = async function (coreid) {
      return await DBH.cores.auth(coreid, userid);
    }  
    let data = message.data;
    if(!(data.cores) || data.cores.length == 0) {
      let groups = await DBH.groups.getIdsByUser(userid); groups = groups?groups:[];
      let acores = await DBH.cores.getByOwners([userid, ...groups]);
      data.cores = acores;
    } else {
      for(let core of data.cores) {
        if(!coreAuth(core)) return -1;
      }
    }
    
    let sonuc = await DBH.search(data.text, data.cores, ...data.langs);
    bio.send({_id: message._id, comm:"response", data: sonuc}, wsid);
  },

}

let SyncComp = async function (field, Data, sonuc, arr) {
  let change = false;
  for(let cr in Data[field]) {
      let ind = arr.findIndex(e => e.toString() == cr.toString());
      if(ind == -1) { //silindi
        sonuc[field][cr] = -1;
        change = true;
      } else {
        sonuc[field][cr] = await DBH[field].getForSync(cr, Data[field][cr]);
        arr.splice(ind,1);
      }
    }
    for(let cr of arr) {
      sonuc[field][cr] = await DBH[field].getForSync(cr, -1);
      change = true;
    }
    return change;
}

module.exports = {
  bio,
};




DBH.onConnected.push(async () => {
  /*Commands.sync({data: {cores: {
    //["596d19d4537b92101ec0dd8f"]: 99
  }, 
  groups: {

  },
  user: -1}}, "597f79ad687163d25f2b0410");
*/
});




