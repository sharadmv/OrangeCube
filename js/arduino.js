#!/usr/local/bin/node
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var spawn = require('child_process').spawn;
var TOUCH_THRESHOLD = 200;
var CALIBRATION_TIME = 5000;
var PROXIMITY_AVG_LENGTH = 30;
var NUM_SENSORS = 1;
var net = require('net');
var Sensor = function(port,num,onData,onStartTouch, onEndTouch, onProximity){
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
  var serialPort = new Sensor('/dev/ttyUSB0',2,function(num){
    
    //console.log(num.join('\t'));
}, function(num){
 // console.log("STARTED TOUCH "+num);
/*   if (num == 1){
   mouse.click(-1,-1,"right");
  }else if (num==0){
  mouse.click(-1,-1,"left");
}
  */
  }, function(num){/*console.log("ENDED TOUCH "+num)*/},
  function(proximities){
    var c = [{x:1,y:1},{x:2,y:2}]; 
    /*for (var i=0;i<=4;i++){
      if (c[i]===undefined){
        c[i] = [];
      }
      for (var j=0;j<=4;j++){
        c.push({x:j+1, y:j+1});
      }
      }*/
    var d = [];
    //console.log(proximities);
    for (var i in proximities){
      d[i] = proximities[i];
    }
    var avg = {x:0,y:0};
    var length = 0;
    for (var i=0;i<2;i++){
      avg.x += d[i]*c[i].x;
      avg.y += d[i]*c[i].y;
      length += d[i];
    }
    //console.log(avg.x/length*500,100);
    mouse.move(Math.floor(avg.x/length*500),100);
    //console.log(proximities.map(function(e){return Math.floor(e)}).join('\t'));
  });
  var mouse = {
    move:function(x,y){
      var mouse = spawn('java',['Mouse',x,y]);
    },
    click:function(x,y,type){
//      console.log(x,y,type+"click")
      var mouse = spawn('./mouse.py',[x,y,type+"click"]);
      //mouse.stdout.on('data',function(data){console.log(data.toString('ascii'))});
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

