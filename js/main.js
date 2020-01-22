/********************* Variables *********************/
    //Canvas
let canvas = $('#breakout')[0];
let ctx = canvas.getContext('2d');
    //Paddle
const paddle_Width = 100;
const paddle_Height = 20;
const paddle_margin_bottom = 50;
let leftArrow = false;
let rightArrow = false;
    // Ball
let ballRadius = 8;
    //Image
const img = new Image();
img.src = "images/bg.jpg";

    // Others
let life = 5;
let spacePressed = false;

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

// Move Paddle 
function movePaddle() {
    //preventing paddle to go out canvas
    if (rightArrow && paddle.x + paddle_Width < canvas.width) {
        paddle.x += paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// Move Ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// When the ball collides with wall
function ballWallCollision() {
    // if the ball collides right side .. x is decreased
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    // if the ball collides top side .. y is increased
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    // if the ball collides down side .. life is decreased and reset the ball
    if (ball.y + ball.radius > canvas.height) {
        life--;
        resetBall();
    }
}

// reset the ball to the default position
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1) // range between -3 and 3 .. because el ball moves in different positions
    ball.dy = -3;

    paddle.x = canvas.width / 2 - paddle_Width / 2;
    paddle.y = canvas.height - paddle_Height - paddle_margin_bottom;
}

function draw() {
    drawPaddle();
    drawBall();
}
function update() {
    if (spacePressed) {
        movePaddle();
        moveBall();
    }
    ballWallCollision();
}

function loop() {
    ctx.drawImage(img, 0, 0, 700, 600);
    draw();
    update();
    //keep calling loop function everytime browser is ready to render next frame
    requestAnimationFrame(loop);
};

/********************* Events *********************/

$(document).on("keydown", function (e) {
    if (e.keyCode == 37) {
        leftArrow = true;
    } else if (e.keyCode == 39) {
        rightArrow = true;
    }
})

// On releasing the keys
$(document).on("keyup", function (e) {
    if (e.keyCode == 37) {
        leftArrow = false;
    } else if (e.keyCode == 39) {
        rightArrow = false;
    }
});

$(document).on('keypress', function (e) {
    spacePressed = true;
});


// Starting point
loop();
