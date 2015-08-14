var ctx;
var canvas;
var rects = [];
var container;
var tagline;
var scaling = 1;
var animationId;
var squareEdge = 25;
var borderWidth = 3;
var squareSize = squareEdge + borderWidth
var scaledSize = squareSize*scaling;

var limitX = Math.round(window.innerWidth/squareSize);
var limitY = Math.round(window.innerHeight/squareSize);

// Get real square locations
function getX(x){
  return Math.floor(x*squareSize);
}

function getY(y){
  return Math.round(y*squareSize);
}

// Output RGBA as string
function rgba(r, g, b, a){
  return "rgba("+ r +"," + g + "," + b + "," + a + ")";
}

// Round to the nearest square value.
function roundUp(n, k){
  return n + k - n%k;
}

function fadeout(x, y){
  var realX = getX(x);
  var realY = getY(y);
  setTimeout(function(){
    ctx.fillStyle = "rgba(255, 255, 255, .5)";
    ctx.fillRect(realX, realY, squareSize, squareSize);
    setTimeout(function(){
      ctx.fillRect(realX, realY, squareSize, squareSize);
      setTimeout(function(){
        ctx.clearRect(realX, realY, squareSize, squareSize);
      }, 50)
    }, 50)
  }, 50)
}

function fadein(x, y, r, g, b, count, a){
  if (typeof(count) == "undefined"){
    count = 1;
  }
  if (typeof(a) == "undefined"){
    a = .33;
  }
  if (count <= 0){
    return;
  }
  var realX = getX(x);
  var realY = getY(y);
  ctx.fillStyle = rgba(r, g, b, a);
  ctx.fillRect(realX, realY, squareEdge, squareEdge);
  setTimeout(function(){
    fadein(x, y, r, g, b, count-1, a);
  }, 25)
}


function draw(x, y , r, g, b, a){
    if(typeof(a) == "undefined"){
      a = 1;
    }
    ctx.fillStyle = rgba(r, g, b, a);
    ctx.fillRect(getX(x), getY(y), squareEdge, squareEdge);
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(getX(x), getY(y), squareSize, squareSize);
}

function updateRect(rectX, rectY){
  if(typeof(rectX) == "undefined" || typeof(rectY) == "undefined"){
     rectX = Math.round(Math.random()*limitX);
     rectY = Math.round(Math.random()*limitY);
 }
  if(rects[rectX][rectY]){
    if(Math.round(Math.random())){
      fadein(rectX, rectY, 255, 255, 255, 5, .1);
      rects[rectX][rectY] -=1;
      if(rects[rectX][rectY] === 0){
        fadeout(rectX, rectY);
      }
    } else{
      if(rects[rectX][rectY] < 6){
        fadein(rectX, rectY, 126, 201, 119, 1, .33);
        rects[rectX][rectY] +=1;
      }
    }
  }else{
    rects[rectX][rectY] = 3;
    fadein(rectX, rectY, 126, 201, 119, 3);
  }
}

function animate(){
  updateRect();
  animationId = requestAnimationFrame(animate);
}

function initialize(){
  for(var x = 0;x<=limitX;x++){
    rects.push([]);
    for(var y=0;y<=limitY; y++){
      updateRect(x, y);
    }
  }
}

function redraw(){
  for(var x = 0;x<=limitX;x++){
    for(var y = 0;y<=limitY; y++){
      draw(x, y, 126, 201, 119, rects[x][y]*.25);
    }
  }
}

function clearSquares(){
  window.cancelAnimationFrame(animationId);
  for(var x = 0;x<=limitX;x++){
    for(var y = 0;y<=limitY; y++){
      fadeout(x, y);
    }
  }
}

function resizeContainer(){
  container.style.top = getY(3)*scaling-2;
  if (window.innerWidth < 615){
    container.style.left = 0;
    container.style.width = "100%";
  } else{
    var thirds = Math.floor(limitX/3)*scaling
    container.style.left =  getX(thirds)-1;
    container.style.width = roundUp(getX(thirds), scaledSize);
  }
  container.style.height = roundUp(tagline.offsetHeight, scaledSize);    
}

window.onresize = function(e){
  limitX = Math.round(window.innerWidth/squareSize/scaling);
  while(limitX >= rects.length){
    rects.push([]);
  }
  limitY = Math.round(window.innerHeight/squareSize/scaling);
  if (canvas.height < window.innerHeight || canvas.width < window.innerWidth){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.scale(scaling, scaling);
    redraw();
  }
  resizeContainer();
}

window.onload = function(e){
  canvas = document.getElementById("squareCan");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  scaling = window.devicePixelRatio;
  scaledSize = scaling*squareSize;
  ctx = canvas.getContext("2d");
  ctx.scale(scaling, scaling);
  limitX = Math.round(limitX/scaling);
  limitY = Math.round(limitY/scaling);
  container = document.getElementById("nameContainer");
  tagline = document.getElementById("name");
  arrow = document.getElementById("arrow");
  resizeContainer();
  initialize();
  animate();
  // container.onclick = reveal;
}
