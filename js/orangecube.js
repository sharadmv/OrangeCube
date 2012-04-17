#!/usr/local/bin/node
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var spawn = require('child_process').spawn;
var TOUCH_THRESHOLD = 65;
var CALIBRATION_TIME = 100;
var PROXIMITY_AVG_LENGTH = 15;
var NUM_SENSORS = 1;
var net = require('net');
var HOST = "localhost";
var PORT = 1234;
var client = new net.Socket();
var bridge = require('./bridge/bridge.js');
var Bridge = require('./bridge/bridge.js');
var bridge = new Bridge({apiKey:"abcdefgh"});
var achal = {};
var gerald = {};
var checking = false;
var queue = []
bridge.connect();
bridge.ready(function(){
  bridge.getService("achal",function(service){
    achal = service;
    console.log(achal);
  });
  bridge.getService("log",function(service){
    gerald = service;
  });
});
client.connect(PORT,HOST, function(){
  client.on('close',function(){console.log(arguments)});
  client.write("move 400 400");
  client.write("move 600 400");
  var Sensor = function(port,num,onData,onStartTouch, onEndTouch, onProximity){
    var touching = false;
    var started = false;
    var dataCount = 0;
    var calibration = true; var touch = new Array(num);
    var calibs = new Array(num);
    var proximity = new Array(num);
    var serialPort = new SerialPort(port,{
        parser:sp.parsers.readline('\n')
    });
    serialPort.on('data',function(data){
      if (!started) {
        setTimeout(function(){calibration = false;
          console.log("Ending sensor calibration");
          for (var i in calibs){
            calibs[i] = calibs[i]/dataCount;
          }
        },CALIBRATION_TIME);
        console.log("Started listening on serial port: "+port+", "+num+" sensors");
        console.log("Starting sensor calibration");
        started = true;
      }
      var temp = data.toString('ascii').trim().match(/[0-9]+/g);
      var calibrated = data.toString('ascii').trim().match(/[0-9]+/g);
      if (temp){
        dataCount++;
        touching = false;
        for (var i in temp) {
          if (calibration){
            if (calibs[i] === undefined){
              calibs[i] = parseInt(temp[i]);
            } else {
              calibs[i]+= parseInt(temp[i]);
            }
          } else {
            calibrated[i] = temp[i]-(calibs[i]);
          }
          if (temp[i] > TOUCH_THRESHOLD){
            touching = true;
            if (touch[i]===undefined){
              touch[i] = true;
            }
            if (touch[i] == false){
              touch[i] = true;
              onStartTouch(i,touching);
            }
          } else {
            touching = touching || false;
            if (touch[i]===undefined){
              touch[i] = false;
            }
            if (touch[i] == true){
              touch[i] = false;
              onEndTouch(i,false);
            }
          }
          if (proximity[i] === undefined){
            proximity[i] = [];
            proximity[i].push(parseInt(calibrated[i]));
          } else {
            if (proximity[i].length > PROXIMITY_AVG_LENGTH){
              proximity[i].shift(); 
            }
            proximity[i].push(parseInt(calibrated[i]));
          }
        }
        if (!calibration){
          onData(calibrated);
          onProximity(proximity.map(function(e){var x = average(e);if (x<=1){x = 1};return x}));
        }
      }
    });
  }
  var touch = new Array(6);
  var serialPort = new Sensor('/dev/ttyUSB1',6,function(num){

}, function(num,bool){
  touch[num] = true;
  console.log("START TOUCH:"+num);
  var changed = [num]
        if (num == 0){
          achal.ctrl_alt_tab();
          gerald.scrollRight();
        } else if (num ==5){
          achal.bootup();
          gerald.scrollUp();
        } else if (num == 4){
          achal.release_ctrl_alt_tab();
          gerald.scrollLeft();
        } else if (num == 1){
          //gerald.barrelRollLeft();
          achal.flip_desktop();
        } else if (num == 3){
          gerald.scrollDown();
          achal.play_music();
        } else if (num == 2){
          //gerald.barrelRollRight();
          achal.kill();
        }
}
, function(num,bool){
        if (!checking){
  (function(arr){
        checking = true;
        temp = new Array(6);
        for (var i in arr){
          temp[i] = arr[i];
        }
        setTimeout(function(){
        var changed = [];
        for (var i in temp){
          if (temp[i] != touch[i]){
            if (touch[i] == false){
              changed.push(parseInt(i));
            }
          }
        }
        console.log(changed);
        if (changed[0]!==undefined){
          queue.push(changed[0]);
        }
        if (queue.length>3){
          queue.shift();
        }
        var correct = true;
        var correct2 = true;
        console.log(queue);
        if (queue.length == 3){
          for (var i in queue){
            if (i==0){
              if (queue[i] == 4){
                correct = true && correct;
              } else{
                correct = false;
              }
              if (queue[i] == 0){
                correct2 = true && correct2;
              } else{
                correct2 = false;
              }
            }
            if (i==1){
              if (queue[i] == 5){
                correct = true && correct;
                correct2 = true && correct2;
              } else{
                correct = false;
                correct2 = false;
              }
            }
            if (i==2){
              if (queue[i] == 0){
                correct = true && correct;
              } else{
                correct = false;
              }
              if (queue[i] == 4){
                correct2 = true && correct2;
              } else{
                correct2 = false;
              }
            }
          }
        } else {
          correct = false;
          correct2 = false;
        }
        if (correct){
          gerald.barrelRollRight();
        }
        if (correct2){
          gerald.barrelRollLeft();
        }
        checking = false;
  }, 1)})(touch);
        }
        touch[num] = false;
      },
      function(proximities){
  });
  var mouse = {
    move:function(x,y){
      client.write("move "+x+" "+y);
    },
    click:function(x,y,type){
      var mouse = spawn('./mouse.py',[x,y,type+"click"]);
    }
  }
  var curX = 101,curY = 101
  var average = function(arr) {
    var av = 0;
    var cnt = 0;
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      var e = +arr[i];
      if(!e && arr[i] !== 0 && arr[i] !== '0') e--;
      if (arr[i] == e) {av += e; cnt++;}
    }
    return av/cnt;
  }
});
