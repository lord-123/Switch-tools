var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var started = false;

var time;
var timer;

var randMax = 9;
var randMin = 1;

function randomTime() {
    time = Math.floor(Math.random() * (randMax - randMin - 13) ) + randMin;
    time += Math.floor(Math.random() * (randMax - randMin + 1) ) + randMin * 0.1;
    time += Math.floor(Math.random() * (randMax - randMin + 1) ) + randMin * 0.01;
}

function drawStartMenu() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white";
    ctx.font = "3vmin arial";
    ctx.fillText("Tap to start!", canvas.width / 2, canvas.height / 2);

    if (previousTime) {
        ctx.fillText("Time: " + previousTime, canvas.width / 2, canvas.height * 0.6);
    }
}

function start() {
    randomTime();
    started = true;
    timer = setInterval("time -= 0.01", 10)
}

function end() {
    clearInterval(timer);
    previousTime = Math.round(-time * 100) / 100;
    started = false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!started) {
        drawStartMenu();
    } else if (time < 0) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

randomTime();
var interval = setInterval(draw, 10);