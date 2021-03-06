var bridge = new Bridge( {host: "cloud2.flotype.com", port: 8091, apiKey: "abcdefgh"});
bridge.connect();

$("body").append("<div style='width: 100%;height: 100%; position: fixed; z-index:100!important; top: 0; left: 0;'id='orange-frame'></div>");
for(var x = 0; x < 4; x++) {
  var color = "rgba(" + Math.floor(Math.random() * 255 )+ ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", .0)";
  $("#orange-frame").append("<div style='z-index:100!important; position:relative; background-color: "+color+"; width: 50%; height: 50%; float: left;' class='frame-ninth' id='frame"+x+"'></div>");
}

var left = 0;
var top1 = 0;
console.log(top1);

var width = $(window).width();
var height = $(window).height();

// returns the center x y coordinate
var clickFrame = function(frameNum) {
  var frame = $("#frame" + frameNum);

  left = frame.offset().left;
  top1 = frame.offset().top;
  width = frame.width();
  height = frame.height();

  shiftFrame(frame.offset().left, frame.offset().top, frame.width(), frame.height());
  return {x: left + Math.floor(width/2), y: top1 + Math.floor(height/2)};
};

//setInterval(function() {clickFrame(Math.floor(Math.random() * 9))}, 2000);

var shiftFrame = function(left, top, width, height) {
  $("#orange-frame").offset({left: left, top: top}).width(width).height(height);
  //$("#orange-frame").animate({left: left, top: top, width: width, height: height});
}

var updateFrame = function() {
  console.log(top1);
  
  shiftFrame(left, top1, width, height);
}

var scrollDown = function() {
  $("body").animate({scrollTop: '+=100'});
}
var scrollUp = function() {
  $("body").animate({scrollTop: '-=100'});
}
var scrollLeft = function() {
  $("body").animate({scrollLeft: '-=100'});
}
var scrollRight = function() {
  $("body").animate({scrollLeft: '+=100'});
}




var barrelRollStyle = $('<style>.barrel_roll_left {-webkit-transition: -webkit-transform 3s ease;-webkit-transform: rotate(-360deg);'+
  '-moz-transition: -moz-transform 3s ease; -moz-transform: rotate(360deg); -o-transition: -o-transform 4s ease;'+
  '-o-transform: rotate(360deg);transition: transform 3s ease;transform: rotate(360deg);} </style>');
$('html > head').append(barrelRollStyle);

var barrelRollStyle = $('<style>.barrel_roll_right {-webkit-transition: -webkit-transform 3s ease;-webkit-transform: rotate(360deg);'+
  '-moz-transition: -moz-transform 3s ease; -moz-transform: rotate(360deg); -o-transition: -o-transform 4s ease;'+
  '-o-transform: rotate(360deg);transition: transform 3s ease;transform: rotate(360deg);} </style>');

$('html > head').append(barrelRollStyle);

function barrelRollLeft() {
  $('body').addClass('barrel_roll_left');
  setTimeout(function() {
    $('body').removeClass('barrel_roll_left')
  }, 4000);
  setTimeout(function() {
    updateFrame();
  }, 3600);
}

function barrelRollRight() {
  $('body').addClass('barrel_roll_right');
  setTimeout(function() {
    $('body').removeClass('barrel_roll_right')
  }, 4000);
  setTimeout(function() {
    updateFrame();
  }, 3600);
}

var remoteFuncs = {
  // pass 0 to 3 corresponding to the 4 frames left to right, top to bottom
  clickFrame: clickFrame,
  scrollDown: scrollDown,
  scrollUp: scrollUp,
  scrollLeft: scrollLeft,
  scrollRight: scrollRight,
  barrelRollLeft: barrelRollLeft,
  barrelRollRight: barrelRollRight
}



bridge.ready(function() {
  bridge.publishService("log", remoteFuncs);
});
