#!/usr/local/bin/node
var SerialPort = require('serialport').SerialPort;
spawn = require('child_process').spawn;
var x =  1300; var y = 700;
var mouse = {
  move:function(x,y){
    spawn('./mouse.py',[x,y]);
  }
}
var curX = 101,curY = 101;
mouse.move(curX,curY);
var vX = 2, vY = 2;
setInterval(function(){
  if (curX == x){
    vX *=-1; 
  } else if (curX == 100){
    vX *= -1;
  }
  if (curY == y){
    vY *= -1; 
  } else if (curY == 100){
    vY *= -1;
  }
  curX += vX;
  curY += vY;
  mouse.move(curX,curY);
},100);
