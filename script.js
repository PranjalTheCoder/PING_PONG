const canvas = document.getElementById('canvas');
// we need a 2d context
const ctx = canvas.getContext('2d');
// canvas.width = "500";
// canvas.height = "600";

// to take full height and full width of web pages
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const KeyPressed = [];
const KEY_UP = 38;
const KEY_DOWN = 40;

window.addEventListener('keydown', function(e) {
    // console.log(e.keyCode);
    KeyPressed[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) { 
    // console.log(e.keyCode);
    KeyPressed[e.keyCode] = false;
});
/*
// draw a rectangle with red color
ctx.fillStyle = "#ff0000";
ctx.fillRect(100, 100, 50, 50);

// draw a circle with purple color
ctx.fillStyle = "#ff00ff"; //color of inside circle 
ctx.strokeStyle = "#000000"; //color of boundary of circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI*2);
ctx.fill();
ctx.stroke();
*/

function vec2(x, y)
{
    return {x:x, y:y};
}

function Ball(pos, vel, radius)
{
    this.pos = pos;
    this.vel = vel; 
    this.radius = radius;

    this.update = function () {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    };

    this.draw = function () {
        ctx.fillStyle = "#33ff00";
        ctx.strokeStyle = "#33ff00";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    };
}

function Paddle(pos, vel, width, height)
{
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;

    this.update = function () {
        if(KeyPressed[KEY_UP])
        {
            this.pos.y -= this.vel.y;
        }
        if(KeyPressed[KEY_DOWN])
        {
            this.pos.y += this.vel.y;
        }
    };
    this.draw = function () {
        ctx.fillStyle = "33ff00";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    };
}

function paddlecollisionWithThEdges (paddle)
{
    if(paddle.pos.y <= 0)
    {
        paddle.pos.y = 0;
    }
    if(paddle.pos.y + paddle.height >= canvas.height)
    {
        paddle.pos.y = canvas.height - paddle.height;
    }
}

// Ball Collision with the Edges
function ballcollisionWitheTheEdges (ball) 
{
    if(ball.pos.y + ball.radius >= canvas.height)
    {
        ball.vel.y *= -1;
    }

    if(ball.pos.y - ball.radius <= 0)
    {
        ball.vel.y *= -1;
    }

    if(ball.pos.x + ball.radius >= canvas.width)
    {
        ball.vel.x *= -1;
    }

    if(ball.pos.x - ball.radius <= 0)
    {
        ball.vel.x *= -1;
    }

}

const ball = new Ball(vec2(200, 200), vec2(10, 10), 20);
const paddle1 = new Paddle(vec2(0, 50), vec2(5, 5), 20, 160);
const paddle2 = new Paddle(vec2(canvas.width -20, 30), vec2(5, 5), 20, 160);

function gameUpdate() 
{
   ball.update();
   paddle1.update();
//    paddle2.update();
    paddlecollisionWithThEdges(paddle1);
   ballcollisionWitheTheEdges(ball);
   
}

function gameDraw() 
{
    ball.draw();
    paddle1.draw();
    paddle2.draw();

}

function gameLoop()
{ 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}

gameLoop();
