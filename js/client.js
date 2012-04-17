var app = require('express').createServer();
var spawn = require('child_process').spawn;

var offsetHeight = 97;

app.get('/mouse.move', function(req, res) {
  mouse.move(req.query.x, req.query.y+offsetHeight);
  res.send("Success");
});

app.get('/mouse.leftclick', function(req, res) {
  mouse.leftclick(req.query.x, req.query.y+offsetHeight);
  res.send("Success");
});

app.get('/mouse.rightclick', function(req, res) {
  mouse.rightclick(req.query.x, req.query.y+offsetHeight);
  res.send("Success");
});

var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',['move',x,y]);
  },
  leftclick:function(x,y){
    var mouse = spawn('./mouse.py',['leftclick', x,y]);
  },
  rightclick:function(x,y){
    var mouse = spawn('./mouse.py',['rightclick', x,y]);
  }
}

app.listen(80);
