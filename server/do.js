
let ShallowCopy = function (obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}


let DoString = async function (string, args, job) {
  job(string, args);
}
let DoArray = async function (array, args, job, arrjob, objectjob) {
  if(arrjob) objectjob(array, args);
  
  for(let n of array) {
    await DoRouter(n, args, job, arrjob, objectjob);
  }
  
}
let DoObj = async function (object, args, job, arrjob, objectjob) {
  if(objectjob) objectjob(object, args);
  if(object.Name) job(object.Name, args);
  
  for(let field in object) {
    if(field == "Name" || field[0] == "_") continue;
    let nargs = ShallowCopy(args);
    nargs.level = field;
    nargs.path += `/${field}`;
    nargs.layer++;
    await DoRouter(object[field], nargs, job, arrjob, objectjob);
  }
  
  
}
let DoRouter = async function (object, args, job, arrjob, objectjob) {
  if(typeof object == "string") {
    await DoString(object, args, job);
    
  } else if(Array.isArray(object)) {
    await DoArray(object, args, job, arrjob, objectjob);
    
  } else if(typeof object == "object") {
    await DoObj(object, args, job, arrjob, objectjob);
  }
}

let DoStringSync = function (string, args, job) {
  job(string, args);
}
let DoArraySync = function (array, args, job, arrjob, objectjob) {
  if(arrjob) objectjob(array, args);
  
  for(let n of array) {
    DoRouterSync(n, args, job, arrjob, objectjob);
  }
  
}
let DoObjSync = function (object, args, job, arrjob, objectjob) {
  if(objectjob) objectjob(object, args);
  if(object.Name) job(object.Name, args);
  
  for(let field in object) {
    if(field == "Name" || field[0] == "_") continue;
    let nargs = ShallowCopy(args);
    nargs.level = field;
    nargs.path += `/${field}`;
    nargs.layer++;
    DoRouterSync(object[field], nargs, job, arrjob, objectjob);
  }
  
  
}
let DoRouterSync = function (object, args, job, arrjob, objectjob) {
  if(typeof object == "string") {
    DoStringSync(object, args, job);
    
  } else if(Array.isArray(object)) {
    DoArraySync(object, args, job, arrjob, objectjob);
    
  } else if(typeof object == "object") {
    DoObjSync(object, args, job, arrjob, objectjob);
  }
}


module.exports = {
  Do: DoRouter, DoSync: DoRouterSync
}


















