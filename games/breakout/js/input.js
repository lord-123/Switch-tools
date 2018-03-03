document.addEventListener("keydown", function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
        leftPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = true;
        rightPressed = false;
    } else if (e.keyCode == 40) {
        toggleMusic();
    } else if (e.keyCode == 13) {
        togglePause();
    } else if (e.keyCode == 38) {
        toggleFullScreen(document.documentElement);
    }
}, false);

document.addEventListener("keyup", function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}, false);

document.addEventListener("mousemove", function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}, false);