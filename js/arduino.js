#!/usr/local/bin/node
var sp = require('serialport');
var SerialPort = sp.SerialPort;
var spawn = require('child_process').spawn;
var TOUCH_THRESHOLD = 100;
var CALIBRATION_TIME = 10000;
var PROXIMITY_AVG_LENGTH = 15;
var NUM_SENSORS = 1;
var net = require('net');
var HOST = "localhost";
var PORT = 1234;
var client = new net.Socket();
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
  var touch = false;
  var serialPort = new Sensor('/dev/ttyUSB0',9,function(num){

    //console.log(num.join('\t'));
}, function(num,bool){
   console.log(bool);
     /*if (num == 1){
   mouse.click(-1,-1,"right");
  }else if (num==0){
  mouse.click(-1,-1,"left");
}*/
}, function(num,bool){console.log(bool)},
  function(proximities){
    var c = [{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:2,y:0},{x:2,y:1},{x:2,y:2}]; 
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
  for (var i=0;i<8;i++){
    avg.x += d[i]*c[i].x;
    avg.y += d[i]*c[i].y;
    length += d[i];
  }
  //console.log(avg.x/length*100,avg.y/length*100);
  mouse.move(avg.x/length*800,avg.y/length*600-300);
  //console.log(proximities.map(function(e){return Math.floor(e)}).join('\t'));
  });
  var mouse = {
    move:function(x,y){
      client.write("move "+x+" "+y);
    },
    click:function(x,y,type){
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
});
