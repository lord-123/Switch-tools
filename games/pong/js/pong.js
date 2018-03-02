var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var upPressed = false;
var downPressed = false;

var playerScore = 0;
var computerScore = 0;

//paddle params
var paddleHeight = 100;
var paddleWidth = 20;
var playerPaddleY = canvas.height/2-paddleHeight/2;
var computerPaddleY = canvas.height/2-paddleHeight/2;

//ball
var x = canvas.width / 2;
var y = canvas.height / 2;
var dx = Math.floor((Math.random() * 4) + 3);
var dy = Math.floor((Math.random() * 4) + 3);
var ballRadius = 20;

function drawPlayerPaddle() {
    ctx.beginPath();
    ctx.rect(30, playerPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawComputerPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width - 30 - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    //player
    ctx.textAlign = "center";
    ctx.font = "60px pongfont";
    ctx.fillstyle = "white";
    ctx.fillText(playerScore, canvas.width/4, 120);

    //computer
    ctx.fillText(computerScore, canvas.width*0.75, 120)
}

function drawLines() {
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function reset(scorer) {
    x = canvas.width / 2;
    y = canvas.height / 2;

    if (scorer == "player") {
        dx = Math.floor((Math.random() * -4) - 3);
    } else if (scorer == "computer") {
        dx = Math.floor((Math.random() * 4) + 3);
    }
    dy = Math.floor((Math.random() * 4) + 3);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (paused) {
        //paused text
        ctx.textAlign = "center";
        ctx.font = "200px Raleway";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white"
        ctx.lineWidth = 4;
        ctx.strokeText("Paused", canvas.width / 2, canvas.height / 2)        
        ctx.fillText("Paused", (canvas.width / 2), canvas.height / 2)

        //settings
        ctx.font = "25px Raleway";
        ctx.lineWidth = 3;
        ctx.strokeText("Press \u2192 to toggle fullscreen and \u2190 to toggle audio", canvas.width / 2, canvas.height*0.6)
        ctx.fillText("Press \u2192 to toggle fullscreen and \u2190 to toggle audio", canvas.width / 2, canvas.height*0.6)
    } else {
        drawPlayerPaddle();
        drawComputerPaddle();
        drawBall();
        drawScore();
        drawLines();

        x += dx;
        y += dy;

        //controls
        if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
            playerPaddleY += 7;
        } else if (upPressed && playerPaddleY > 0) {
            playerPaddleY -= 7;
        }

        //computer
        if (y > computerPaddleY + paddleHeight / 2 && computerPaddleY + paddleHeight < canvas.height) {
            computerPaddleY += Math.floor((Math.random() * 10) + 0);
        } else if (y < computerPaddleY - paddleHeight /2 && computerPaddleY > 0) {
            computerPaddleY -= Math.floor((Math.random() * 10) + 0);
        }

        //ball
        if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) { //collision with top and bottom
            dy = -dy;
        }

        if (x > canvas.width) {
            playerScore++;
            reset("player");
        }

        if (x < 0) {
            computerScore++;
            reset("computer");
        }

        if (x + ballRadius > canvas.width - 30 - paddleWidth) { //collision with computer
            if (y > computerPaddleY && computerPaddleY + paddleHeight > y) {
                dx = -dx;
                beep.play();
            }
        }
        if (x - ballRadius < 30 + paddleWidth) { //collision with player
            if (y > playerPaddleY && playerPaddleY + paddleHeight > y) {
                dx = -dx;
                beep.play();
            }
        }
    }
}

document.addEventListener("keydown", function keyDownHandler(e) {
    if(e.keyCode == 38) {
        upPressed = true;
    } else if(e.keyCode == 40) {
        downPressed = true;
    } else if(e.keyCode == 39) {
        toggleFullScreen(document.documentElement);
    } else if(e.keyCode == 13) {
        togglePause();
    } else if(e.keyCode == 37) {
        toggleAudio();
    }
}, false);

document.addEventListener("keyup", function keyUpHandler(e) {
    if(e.keyCode == 38) {
        upPressed = false;
    } else if(e.keyCode == 40) {
        downPressed = false;
    }
}, false);

document.addEventListener("mousemove", function mouseMoveHandler(e) {
    var realtiveY = e.clientY - canvas.offsetLeft;
    if (realtiveY > 0 + paddleHeight /2 && realtiveY < canvas.height - paddleHeight / 2) {
        playerPaddleY = realtiveY - paddleHeight / 2;
    }
}, false);

var interval = setInterval(draw, 10);