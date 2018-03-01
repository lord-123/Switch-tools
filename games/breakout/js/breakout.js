var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var paused = true;

var score = 0;

//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//ball
var x = canvas.width / 2;
var y = canvas.height * 0.6;
var dx = Math.floor((Math.random() * 4) + 3);
var dy = Math.floor((Math.random() * 4) + 3);
var ballRadius = 10;

//bricks
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickRowCount = 10;
var brickColumnCount = (canvas.width - 60) / (brickWidth + brickPadding);
var brickOffsetLeft = ((canvas.width - 60) % (brickWidth + brickPadding) - brickPadding) / 2;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload;
                        restart(); //only used if reload doesn't work
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.textAlign = "start";
    ctx.font = "16px Raleway";
    ctx.fillstyle = "0095DD";
    ctx.fillText("Score: " + score, brickOffsetLeft, 20);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function togglePause() {
    if (paused) {
        paused = false;
    }
    else {
        paused = true;
    }
}

function restart() {
    leftPressed = false;
    rightPressed = false;
    score = 0;
    x = canvas.width / 2;
    paddleX = (canvas.width - paddleWidth) / 2;

    bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
            };
        }
    }
}

function draw() {
    if (paused) {
        ctx.textAlign = "center";
        ctx.font = "200px Raleway";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("Paused", canvas.width / 2, canvas.height / 2)
        ctx.fillStyle = "white"
        ctx.fillText("Paused", (canvas.width / 2), canvas.height / 2)
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawPaddle();
        drawBall();
        drawBricks();
        collisionDetection();
        drawScore();

        x += dx;
        y += dy;

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        if (x > paddleX && x < paddleX + paddleWidth && y > canvas.height - paddleHeight - ballRadius) {
            dy = -dy;
        }

        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height + ballRadius) {
            y = canvas.height * 0.6;
            alert("Game over with a score of: " + score)
            document.location.reload;
            restart(); //only used if reload doesn't work
        }
    }  
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
        leftPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = true;
        rightPressed = false;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 32 || 13) {
        if (paused) {
            interval = setInterval(draw, 10);
            paused = false;
        } else {
            clearInterval(interval)
            paused = true;
            pause();
        }
    }
}

var interval = setInterval(draw, 10);