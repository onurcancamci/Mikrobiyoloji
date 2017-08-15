

const socket = new WebSocket('ws://localhost:3000');
const Locks = {};
Lock = (id) => new Promise(res => {
  Locks[id] = res;
});
Unlock = (id,val) => {
  if(id in Locks && Locks[id]) {
    Locks[id](val);
    Locks[id] = null;
  }
}

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ID_LENGTH = 8;
var idgen = function() {
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}
let bio = {};
bio.command = async function (message) {
  //Commands[message.comm](message, userid, wsid);
}
bio.recieve = function (message) {
  if(message.comm == "response") {
    Unlock(message._id, message);
  } else {
    bio.command(message);
  }
}
bio.send = function (message, socket) {
  if(!message._id)
    message._id = shortid.generate();
  socket.send(JSON.stringify(message));
  return Lock(message._id);
}

let func = {
    send: async function(socket, message) {
        return bio.send(message, socket);  
    },
    login: async function(socket, username = "onurcan", password = "asd") {
        let res = await (func.send({_id: idgen(), comm: "login", data: {username, password}}));
        return res.token;
    },
    logout: async function (socket, token) {
        let res = await (func.send({_id: idgen(), comm: "logout", token}));
        return res;
    },
    register: async function (socket, username, password) {
        let res = await (func.send({_id: idgen(), comm: "register", data: {
            username,
            password,
            email: "asd@asd.com",
            desc: {adi: "onurcan"}
        }}));
        return res;
    },
    sync: async function (socket, cores = {}, groups = {}, token) {
        let res = await (func.send({_id: idgen(), comm: "sync", token, data: {
            cores,
            groups,
            user: -1
        }}));
        return res;
    },
    search: async function (socket, text, cores) {
        let res = await (func.send({_id: idgen(), comm: "search", data: {
            text,
            cores,
            langs: ["Turkce"]
        }}));
        return res;
    },
    filter: async function (socket, rules, cores) {
        let res = await (func.send({_id: idgen(), comm: "filter", data: {
            rules,
            cores
        }}));
        return res;
    },
}




socket.addEventListener('open',async function () {
    
    for(let f in func) {
        func[f] = func[f].bind(null, socket);
    }

    let token = await func.login();
    console.log(token);
    
    let synced = await func.sync({},{}, token);
    console.log(synced);
    console.log(await func.filter([{path: "root/Gram/Negative", status: 1}]));
    console.log();

    
    //send({_id: 123, comm: "sync", data: {cores: {}, groups: {}, user: -1},token: "Skln1Dd5P-"});
  
});
socket.addEventListener('message', function incoming(event) {
    let message = JSON.parse(event.data);
    //console.log(message);
    bio.recieve(message);
});






