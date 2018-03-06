var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var fontSize;

var gameOver = false;
var started = false;

var time = 30;

var highscore = 0;
var score = 0;
var previousScore;

var previousBlackSquare;
var blackSquare;
var blackSquareX;
var blackSquareY;

//squares
var squarePadding = 10;
var squareRowCount = 4;
var squareColumnCount = 4;

var squareSize;
var squareOffsetLeft;

var squares = [];
for (c = 0; c < squareColumnCount; c++) {
    squares[c] = [];
    for (r = 0; r < squareRowCount; r++) {
        squares[c][r] = {
            x: 0,
            y: 0,
        };
    }
}

function randomSquare() {
    while (blackSquare == previousBlackSquare) {
        blackSquare = Math.floor((Math.random() * 16) + 1);
    }
    
    previousBlackSquare = blackSquare; 
}

function drawSquares() {
    var currentSquare = 0;

    for (c = 0; c < squareColumnCount; c++) {
        for (r = 0; r < squareRowCount; r++) {
            var squareX = (c * (squareSize + squarePadding)) + squareOffsetLeft;
            var squareY = (r * (squareSize + squarePadding)) + squareOffsetTop;
            squares[c][r].x = squareX;
            squares[c][r].y = squareY;

            currentSquare++;

            if (currentSquare == blackSquare) {
                ctx.fillStyle = "black";
                blackSquareX = squareX;
                blackSquareY = squareY;
            } else {
                ctx.fillStyle = "white";
            }

            ctx.beginPath();
            ctx.rect(squareX, squareY, squareSize, squareSize);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawScore() {
    ctx.textAlign = "start"
    ctx.font = "3" + fontSize  + " failed";
    ctx.fillStyle = "black";
    ctx.fillText("Highscore: " + highscore, 50, 80);

    ctx.font = "2" + fontSize  + " failed";
    ctx.fillText("Score: " + score, 50, 130);
}

function drawTime() {
    ctx.textAlign = "end"
    ctx.font = "4" + fontSize  + " failed";
    ctx.fillStyle = "black";
    ctx.fillText(time, canvas.width - 50, 80);
}

function drawGameOver() {
    ctx.textAlign = "center"
    ctx.font = "15" + fontSize  + " failed";
    ctx.fillStyle = "black";
    ctx.fillText("Game over!", canvas.width / 2, canvas.height / 2);

    ctx.font = "10" + fontSize  + " failed";
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height * 0.75)
}

function drawClickToStart() {
    ctx.textAlign = "center";
    ctx.font = "15" + fontSize  + " failed";
    ctx.fillStyle = "black"
    ctx.lineWidth = 4;       
    ctx.fillText("Click to start", (canvas.width / 2), canvas.height / 2)
}

function draw() {
    //if (inFullScreen) {
        //canvas.width = screen.width;
        //canvas.height = screen.height;
    //} else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    //}
    
    if (canvas.width > canvas.height) {
        //squares
        squareSize = canvas.height / 4 - squarePadding / 2;
        squareOffsetLeft = canvas.width / 2 - squareSize * 2 - squarePadding * 1.5;
        squareOffsetTop = 0;

        //font
        fontSize = "vw";
    } else {
        //squares
        squareSize = canvas.width / 4 - squarePadding / 2;
        squareOffsetLeft = 0;
        squareOffsetTop = canvas.height - squareSize * 4 - squarePadding * 3;

        //font
        fontSize = "vw";
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (time < 0) {
        gameOver = true;
    }

    if (gameOver) {
        drawGameOver();
    } else if (!started) {
        drawClickToStart();
    } else {
        drawSquares();
        drawScore();
        drawTime();
    }
}

randomSquare();

var countdownInterval = setInterval("time--", 1000);
var drawInterval = setInterval(draw, 10);