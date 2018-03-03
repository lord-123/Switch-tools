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