var net = require('net');
var HOST = "localhost";
var PORT = 1234;
var client = new net.Socket();
client.connect(PORT,HOST, function(){
  console.log("Connected");
  client.write("100 100");
  console.log("WROTE");
  client.on('data',function(data){
    console.log(data.toString());
  });
});
