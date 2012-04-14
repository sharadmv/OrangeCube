#!/usr/local/bin/node
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var spawn = require('child_process').spawn;
var TOUCH_THRESHOLD = 200;
var Sensor = function(port,num,onData,onStartTouch, onEndTouch){
  var started = false;
  var touch = new Array(num);
  var serialPort = new SerialPort(port,{
      parser:sp.parsers.readline('\n')
  });
  serialPort.on('data',function(data){
    if (!started) {
      console.log("Started listening on serial port: "+port+", "+num+" sensors");
      started = true;
    }
    var temp = data.toString('ascii').trim().match(/[0-9]+/g);
    if (temp){
      for (var i in temp) {
        if (temp[i] > TOUCH_THRESHOLD){
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
  if (num == 1){
    mouse.click(-1,-1,"right");
  }else if (num==0){
    mouse.click(-1,-1,"left");
  }
}, function(num){console.log("ENDED TOUCH "+num)});
var mouse = {
  move:function(x,y){
    var mouse = spawn('./mouse.py',[x,y]);
  },
  click:function(x,y,type){
    console.log(x,y,type+"click")
    var mouse = spawn('./mouse.py',[x,y,type+"click"]);
    //mouse.stdout.on('data',function(data){console.log(data.toString('ascii'))});
  }
}
var curX = 101,curY = 101;
