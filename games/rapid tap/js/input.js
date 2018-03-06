document.addEventListener("keydown", function(e) {
    if (e.keyCode == 38) {
        toggleFullScreen(document.documentElement);
    } else if (e.keyCode == 40) {
        toggleAudio();
    }
});

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

if (isTouchDevice()) {
    document.addEventListener("touchstart", click);
} else {
    document.addEventListener("mousedown", click);
}

function click(e) {
    if (isTouchDevice()) {
        var xPos = e.changedTouches[0].clientX;
        var yPos = e.changedTouches[0].clientY;
    } else {
        var xPos = e.clientX;
        var yPos = e.clientY;
    }

    if (gameOver || !started) {
        score = 0;
        time = 30;
        started = true;
        gameOver = false;
    } else if (started && !gameOver) {
        if (xPos > blackSquareX && xPos < blackSquareX + squareSize && yPos > blackSquareY && yPos < blackSquareY + squareSize) {
            score++;
            if (score > highscore) {
                highscore++;
            }
            beep.play();
            randomSquare();
        } 
        else {
            gameOver = true;
        }
    }
}