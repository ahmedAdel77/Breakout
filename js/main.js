/**************************** Images *************************/

//Backgound image
const img = new Image();
img.src = "images/bg.jpg";

//Score image
const scoreImg = new Image();
scoreImg.src = "images/score.png";

//Life image
const lifeImg = new Image();
lifeImg.src = "images/life.png";

//Level image
const levelImg = new Image();
levelImg.src = "images/level.png";

const bgImg = new Image();
bgImg.scr = "images/background6.gif";

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
   //Bricks
let bricks = [];
    // Others
let life = 5;
let spacePressed = false;


let Level = 1; //start level game 
let maxLevel = 2; // number of leve game 


let SCORE = 0; //start score 
const SCORE_UNIT = 5; //end score hy722o kol ma yksr brick :) :)

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

const brick = {
    row: 4,
    column: 7,
    width: 70,
    height: 20,
    offSetLeft: 25,
    offSetTop: 25,
    marginTop: 55,
    fillColor: "rgb(46, 53, 72)",
    strokeColor: "#ffcd05",
    color: "rgba(46, 53, 72, 0.5)",
    transparent: "transparent"
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

// When the ball collides with paddle
function ballPaddleCollision() {
    // if the ball collides with paddle but its height less than the paddle's height (still in the bounds of the canvas)
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width &&
        ball.y > paddle.y && ball.y < paddle.y + paddle.height) {

        // if the ball collides in the center .. the point is 0
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);
        collidePoint = collidePoint / (paddle.width / 2);

        // if the ball doesn't collides in the center ..  the point is calculated
        let angle = collidePoint * (Math.PI / 3);
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);

        /*
            -60 (if the ball collides right side of the paddle)
            0 (center)
            60 (if the ball collides right side of the paddle)
            otherwise it's calculated from Math method
        */
    }
}

//Create Bricks
function createBricks() {

    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                // the brick is not broken
                // status: true
                status: 1
            }
        }
    }
}
createBricks();

//Draw Bricks
function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            if (b.status == 1) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// function lmaa y7saal ball brick collision 
function ballBrickCollision() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            // fe 7al en el ball lesa m5bttsh fee el brick 
            let b2 = {...b};

            if (b.status == 1) { // soda
                if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width &&
                ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {

                    // BRICK_HIT.play();

                    ball.dy = -ball.dy;

                    b.status = 0.5;
                    
                    SCORE += SCORE_UNIT;
                }
            }

            else if (b.status == 0.5) { // zr2a
                ctx.fillStyle = brick.color;
                ctx.fillRect(b2.x, b2.y, brick.width, brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b2.x, b2.y, brick.width, brick.height);
                
                if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width &&
                    ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                        ctx.fillStyle = brick.transparent;
                        ctx.fillRect(b2.x, b2.y, brick.width, brick.height);
                        ctx.strokeStyle = brick.transparent;
                        ctx.strokeRect(b2.x, b2.y, brick.width, brick.height);
                        b.status = 0;
                        ball.dy = -ball.dy;
                        SCORE += SCORE_UNIT * 2;
                }
            } 
        }
    }
}

// byzhar pic w text by3bar 3n game stats (score -- life -- levels )
function showGameStats(text, textX, textY, img, imgX, imgY) {
    // draw text 
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    // draw image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}


function draw() {
    drawPaddle();
    drawBall();
    drawBricks();

    
    //Show Score
    showGameStats(SCORE, 35, 25, scoreImg, 5, 5);

    //Show Life
    showGameStats(life, canvas.width - 25, 25, lifeImg, canvas.width - 55, 5);

    //Show Level
    showGameStats(Level, canvas.width / 2, 25, levelImg, canvas.width / 2 - 30, 5);
}
function update() {
    if (spacePressed) {
        movePaddle();
        moveBall();
    }
    ballWallCollision();
    ballPaddleCollision();

    ballBrickCollision();
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
