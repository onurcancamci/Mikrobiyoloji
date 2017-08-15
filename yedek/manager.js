
const Core = require('./core.js');
const bio = require('./basicio.js');
const {Helpers, DBH} = require('./helpers.js');

let CMD = {
  [`login`] : () => {}
}

let _tokens = {};
let TokenToUserid = async function (token) {
  if(_tokens[token]) return _tokens[token];
  let res = await DBH.users.get({tokens: token},{_id: 1});
  if(res == null) return null;
  else {
    _tokens[token] = res._id;
    return res._id;
  }
}


let VersionControl = {
  cores: async function (coreName, version) {
    let num = await DBH.GetBackUpVersion(coreName);
    if(num > version) {
      return await DBH.GetBackUp(coreName);
    } else return null;
  },
  objs: async function (type, objid, hash) {
    let hs = await DBH.GetObjectField(type, objid, "_hash");
    if(hash != hs) {
      return await DBH.GetObjectObjid(type, objid);
    } else return null;
  },
  user: async function (token, hash) {
    let id = TokenToUserid(token);
    if(id) {
      let hs = await DBH.user.getField(id, "_hash");
      if(hs != hash) {
        return await DBH.user.get({_id: id});
      } else return null;
    }
  },
}




let Manager = {}

Manager.getCommands = (message, wsid) => {
  
}
bio.commandRecieve = Manager.getCommands;













