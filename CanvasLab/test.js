canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");
ctx.strokeStyle = "#EAEDD5";
const up = 38,
      down = 40,
      left = 37,
      right = 39,
      directions = {38: "N", 40: "S", 39: "E", 37: "W"};
var direction = "E";
function square(height, width, x, y, speed){
    this.height = height;
    this.width = width;
    this.x = x;
    if(!y){
        this.y = Math.round(Math.random()*canvas.height)
    }else{
        this.y = y;
    }
    if(!speed){
        this.speed = Math.round(Math.random()*60+1)
    }else{
        this.speed = speed;
    }
    this.movedict = {
        "N": function(shape){
            shape.y -= shape.speed;
        },
        "E": function(shape){
            shape.x += shape.speed;
        },
        "S": function(shape){
            shape.y+= shape.speed;
        },
        "W": function(shape){
            shape.x -= shape.speed;
        }
    };
    this.move = function(direction){
        this.movedict[direction](this);
    };
}

function Game(){
    console.log("Game made!");
    this.squares = [];
    this.addSquare = function(h, w, x, y, s){
        this.squares.push(new square(h, w, x, y, s));
    };
    this.update = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < this.squares.length; i++){
            curr = this.squares[i];
            ctx.strokeRect(curr.x, curr.y, curr.height, curr.width);
        }
    };
    this.move = function(direction){
        for(var j = 0; j < this.squares.length; j++){
            this.squares[j].move(direction);
            if(this.squares[j].x > canvas.width){
                this.squares.splice(this.squares.indexOf(this.squares[j]), 1);
                continue;
            }
        }
    }
}
var game, updateInterval, squares;
document.onkeydown = function(e){
    key = e.keyCode;
    if(key == 13 && !game){
    }
    else if(String.fromCharCode(key) == " "){
        if(game){
            s = Math.round(Math.random()*50+1);
            game.addSquare(60*s/50, 50*s/50, -60,undefined, s);

        }
    }
    else if(directions[key]){
        game.move(directions[key]);
    }
}
game = new Game();
updateInterval = setInterval(function(){game.move("E");game.update()}, 30);
squares = setInterval(function(){
    s = Math.round(Math.random()*50+1);
    game.addSquare(60*s/50, 60*s/50, -60,undefined, s);
}, 50);
window.onresize = function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    if(game){
        ctx.strokeStyle = "#EAEDD5";
        game.update();
    }
}
