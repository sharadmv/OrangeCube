#!/usr/local/bin/node
var sys = require('sys');
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0",{
    parser:sp.parsers.readline('\n')
});
serialPort.on('data',function(data){
  var temp = data.toString('ascii').trim().match(/[0-9]+/g);
  if (temp != null){
    console.log(temp[0]);
  }
});
spawn = require('child_process').spawn;
var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',[x,y]);
  }
}
var curX = 101,curY = 101;
