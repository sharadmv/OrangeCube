#!/usr/local/bin/node
var SerialPort = require('serialport').SerialPort;
spawn = require('child_process').spawn;
var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',[x,y]);
  }
}
var curX = 101,curY = 101;
