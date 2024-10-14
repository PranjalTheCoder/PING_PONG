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
    this.score = 0;

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
        ctx.fillStyle = "#33ff00";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    };
    this.getHalfWidth = function () {
        return this.width/2;
    }
    this.getHalfHeight = function () {
        return this.height/2;
    }
    this.getCenter = function () {
        return vec2(
            this.pos.x + this.getHalfWidth(), 
            this.pos.y + this.getHalfHeight()
        );
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

    // if(ball.pos.x + ball.radius >= canvas.width)
    // {
    //     ball.vel.x *= -1;
    // }

    // if(ball.pos.x - ball.radius <= 0)
    // {
    //     ball.vel.x *= -1;
    // }

}

function ballPaddleCollision(ball, paddle)
{
    /*
    let dx = Math.abs(ball.pos.x - paddle.getCenter().x);
    let dy = Math.abs(ball.pos.y - paddle.getCenter().y);

    if(dx <= (ball.radius + paddle.getHalfWidth()) && dy <= (paddle.getHalfHeight() + ball.radius)) // Fixed condition
    {
        ball.vel.x *= -1;
    }
    */
    let ballRight = ball.pos.x + ball.radius;
    let ballLeft = ball.pos.x - ball.radius;
    let ballTop = ball.pos.y - ball.radius;
    let ballBottom = ball.pos.y + ball.radius;

    let paddleRight = paddle.pos.x + paddle.width;
    let paddleLeft = paddle.pos.x;
    let paddleTop = paddle.pos.y;
    let paddleBottom = paddle.pos.y + paddle.height;

    if (ballRight >= paddleLeft && ballLeft <= paddleRight && ballBottom >= paddleTop && ballTop <= paddleBottom) {
        ball.vel.x *= -1;
    }
}


// Player2 AI
function player2AI (ball, paddle) 
{
    if(ball.vel.x > 0)
    {
        if(ball.pos.y > paddle.pos.y)
        {
            paddle.pos.y += paddle.vel.y;
            if(paddle.pos.y + paddle.height >= canvas.height)
            {
                paddle.pos.y = canvas.height - paddle.height;
            }
        }
        
        if(ball.pos.y < paddle.pos.y)
        {
            paddle.pos.y -= paddle.vel.y;
            if(paddle.pos.y <= 0)
            {
                paddle.pos.y = 0;
            }
        }
    }
}

function respawnBall (ball)
{
    if(ball.vel.x > 0)
    {
        ball.pos.x = canvas.width - 150;
        ball.pos.y = (Math.random() * (canvas.height - 200)) + 100;

    }
    if(ball.vel.x < 0)
    {
        ball.pos.x = 150;
        ball.pos.y = (Math.random() * (canvas.height - 200)) + 100;
    }
    ball.vel.x *=-1;
    ball.vel.y *=-1;
}

function increaseScore (ball, paddle1, paddle2) {
    if(ball.pos.x <= -ball.radius)
    {
        paddle2.score += 1;
        document.getElementById("player2score").innerHTML = paddle2.score;
        respawnBall(ball);
    }
    if(ball.pos.x >= canvas.width + ball.radius)
    {
        paddle1.score += 1;
        document.getElementById("player1score").innerHTML = paddle1.score;
        respawnBall(ball);
    }
}


function drawGameScene() 
{
    ctx.strokeStyle = "#ffff00";

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke(); 

    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2);
    ctx.stroke();
}

const ball = new Ball(vec2(200, 200), vec2(15, 15), 20);
const paddle1 = new Paddle(vec2(0, 50), vec2(20, 20), 20, 160);
const paddle2 = new Paddle(vec2(canvas.width -20, 30), vec2(20, 20), 20, 160);

function gameUpdate() 
{
   ball.update();
   paddle1.update();
   paddle2.update();
    paddlecollisionWithThEdges(paddle1);
   ballcollisionWitheTheEdges(ball);

   player2AI(ball, paddle2);

   ballPaddleCollision(ball, paddle1);
   ballPaddleCollision(ball, paddle2);

   increaseScore(ball, paddle1, paddle2);
   
}

function gameDraw() 
{
    ball.draw();
    paddle1.draw();
    paddle2.draw();
    drawGameScene();

}

function gameLoop()
{ 
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}

gameLoop();
