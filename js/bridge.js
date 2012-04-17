var Bridge = require('./bridge/bridge.js');
var bridge = new Bridge({apiKey:"abcdefgh"});
bridge.connect();
bridge.ready(function(){
  bridge.getService("log",function(service){
    console.log(service.scrollDown());
  });
});
