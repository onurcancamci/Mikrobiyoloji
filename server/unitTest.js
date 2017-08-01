const {Helpers, DBH} = require('./helpers.js');

let groupUserTest = async function (expected) {
  let sonuc = "";
  await DBH.groups.user.add("ITF","asd");
  sonuc += await DBH.groups.user.status("ITF", "asd");
  await DBH.groups.user.op("ITF","asd");
  sonuc += await DBH.groups.user.status("ITF", "asd");
  await DBH.groups.user.deop("ITF","asd");
  sonuc += await DBH.groups.user.status("ITF", "asd");
  await DBH.groups.user.op("ITF","asd");
  sonuc += await DBH.groups.user.status("ITF", "asd");
  await DBH.groups.user.remove("ITF","asd");
  sonuc += await DBH.groups.user.status("ITF", "asd");
  if(expected == sonuc) {
    console.log("passed groupUserTest");
  } else {
    console.log("failed groupUserTest");
  }
}
let groupTest = async function () {
  DBH.groups.new("Test", "asdfg");
}


DBH.onConnected.push(async () => {
  
  let start = await DBH.GetDebugBackup();
  //await groupUserTest("12120");
  
  DBH.groups.user.add("ITF", await DBH.users.getId("onurcan"));
  
  
  
  let son = await DBH.GetDebugBackup();
  if(son == start) {
    console.log("passed DBIntegrity");
  } else {
    console.log("failed DBIntegrity");
  }
});

















