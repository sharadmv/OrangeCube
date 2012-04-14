#!/usr/local/bin/node
var sys = require('sys');
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var spawn = require('child_process').spawn;
var Sensor = function(port,num,onData,onStartTouch, onEndTouch){
  var touch = new Array(num);
  var serialPort = new SerialPort(port,{
      parser:sp.parsers.readline('\n')
  });
  serialPort.on('data',function(data){
    var temp = data.toString('ascii').trim().match(/[0-9]+/g);
    if (temp){
      for (var i in temp) {
        if (temp[i] > 200){
          if (touch[i]===undefined){
            touch[i] = true;
          }
          if (touch[i] == false){
            touch[i] = true;
            onStartTouch(i);
          }
        } else {
          if (touch[i]===undefined){
            touch[i] = false;
          }
          if (touch[i] == true){
            touch[i] = false;
            onEndTouch(i);
          }
        }
      }
      onData(temp);
    }
  });
}
var serialPort = new Sensor('/dev/ttyUSB0',2,function(num){
}, function(num){
  console.log("STARTED TOUCH "+num);
}, function(num){console.log("ENDED TOUCH "+num)});
var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',[x,y]);
  }
}
var curX = 101,curY = 101;
