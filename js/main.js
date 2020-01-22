/********************* Variables *********************/
let canvas = $('#breakout')[0];
let ctx = canvas.getContext('2d');
    //Paddle
const paddle_Width = 100;
const paddle_Height = 20;
const paddle_margin_bottom = 50;
    // Ball
let ballRadius = 8;
let life = 5;
    

/********************* Objects *********************/

const paddle = {
    //x position of paddle
    x: canvas.width / 2 - paddle_Width / 2,
    //y position of paddle
    y: canvas.height - paddle_Height - paddle_margin_bottom,
    width: paddle_Width,
    height: paddle_Height,
    // delta x which is amount of pixels that paddle moves to the right or to left 
    dx: 5
}

const ball = {
    x: canvas.width / 2,
    y: paddle.y - ballRadius,
    radius: ballRadius,
    speed: 7,
    dx: 3,
    dy: -3
}

/********************* Functions *********************/

// Draw Paddle
function drawPaddle() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw Ball
function drawBall() {
    ctx.beginPath();

    /*
        ctx.arc() => To Draw the ball
        0 => start Angle
        Math.PI * 2 => 360
    */

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

    ctx.fillStyle = '#ff0'; // Background
    ctx.fill();

    ctx.strokeStyle = '#000'; // Border
    ctx.stroke();

    ctx.closePath();
}

// Move Ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

drawPaddle();
drawBall();
