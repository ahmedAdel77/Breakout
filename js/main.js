/********************* Variables *********************/
//Canvas
let canvas = $('#breakout')[0];
let ctx = canvas.getContext('2d');

//Image
const img = new Image();
img.src = "images/bg.jpg";

//Paddle
const paddle_Width = 100;
const paddle_Height = 20;
const paddle_margin_bottom = 50;
let leftArrow = false;
let rightArrow = false;


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

/********************* Functions *********************/

// Draw Paddle
function drawPaddle() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
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

function loop() {
    ctx.drawImage(img, 0, 0, 700, 600);
    drawPaddle();
    movePaddle();
    //keep calling loop function everytime browser is ready to render next frame
    requestAnimationFrame(loop);

}
loop();