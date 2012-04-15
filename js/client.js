var app = require('express').createServer();
var spawn = require('child_process').spawn;

app.get('/', function(req, res) {
  res.send("Hello World");
  mouse.move(100, 200);

});

var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',[x,y]);
  }
}

app.listen(3000);
