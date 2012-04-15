console.log($);

$("body").append("<div style='width: 100%;height: 100%; position: absolute; top: 0; left: 0;'id='orange-frame'></div>");
for(var x = 0; x < 9; x++) {
  var color = "rgba(" + Math.floor(Math.random() * 255 )+ ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", .4)";
  $("#orange-frame").append("<div style='background-color: "+color+"; width: 33.3333333333333%; height: 33.33333333333%; float: left;' class='frame-ninth' id='frame"+x+"'></div>");
}

// returns the center x y coordinate
var clickFrame = function(frameNum) {
  var frame = $("#frame" + frameNum);

  var left = frame.offset().left;
  var top = frame.offset().top;
  var width = frame.width();
  var height = frame.height();

  shiftFrame(frame.offset().left, frame.offset().top, frame.width(), frame.height());
  return {x: left + Math.floor(width/2), y: top + Math.floor(height/2)};
};

//setInterval(function() {clickFrame(Math.floor(Math.random() * 9))}, 2000);

var shiftFrame = function(left, top, width, height) {
  $("#orange-frame").offset({left: left, top: top}).width(width).height(height);
}

var scrollDown = function() {
  $("body").animate({scrollTop: '+=50'});
}
var scrollUp = function() {
  $("body").animate({scrollTop: '-=50'});
}
var scrollLeft = function() {
  $("body").animate({scrollLeft: '-=50'});
}
var scrollRight = function() {
  $("body").animate({scrollLeft: '+=50'});
}




//barrelRollRight();

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
  setTimeout("$('body').removeClass('barrel_roll')", 4000);
}

function barrelRollRight() {
  $('body').addClass('barrel_roll_right');
  setTimeout("$('body').removeClass('barrel_roll')", 4000);
}

var remoteFuncs = {
  // pass 0 to 8 corresponding to the 9 frames left to right, top to bottom
  clickFrame: clickFrame,
  scrollDown: scrollDown,
  scrollUp: scrollUp,
  scrollLeft: srollLeft,
  scrollRight: scrollRight,
  barrelRollLeft: barrelRollLeft,
  barreRollRight: barreRollRight
}
