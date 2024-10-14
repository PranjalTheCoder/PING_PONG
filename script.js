const canvas = document.getElementById('canvas');
// we need a 2d context
const ctx = canvas.getContext('2d');
// canvas.width = "500";
// canvas.clientHeight = "600";

// to take full height and full width of web pages
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*
// draw a rectangle with red color
ctx.fillstyle = "#ff0000";
ctx.fillRect(100, 100, 50, 50);

// draw a circle with purple color
ctx.fillstyle = "#ff00ff"; //color of inside circle 
ctx.strokestyle = "#000000"; //color of boundary of circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI*2);
ctx.fill();
ctx.stroke();
*/

let ballX = 200;
let ballY = 200;
let ballR = 50;
let ballVx = 2;
let ballVy = 2;

function gameUpdate() 
{
    ballX = ballX + ballVx;
    ballY = ballY + ballVy;
}

function gameDraw() 
{
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI*2);
    ctx.stroke();

}

function gameLoop()
{ 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}

gameLoop();
