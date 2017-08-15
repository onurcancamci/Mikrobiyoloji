



var fs    = require('fs');
var sloc  = require('sloc');
 
fs.readFile("helpers2.js", "utf8", function(err, code){
 
  if(err){ console.error(err); }
  else{
    var stats = sloc(code,"coffee");
    for(i in sloc.keys){
      var k = sloc.keys[i];
      console.log(k + " : " + stats[k]);
    }
  }
});








