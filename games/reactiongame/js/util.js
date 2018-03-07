var inFullScreen = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var muted = false;
var paused = false;
var beep = document.getElementById("beep");

function toggleAudio() {
    if (muted) {
        beep.volume = 1;
        muted = false
    }
    else {
        beep.volume = 0;
        muted = true
    }
}

function togglePause() {
    if(paused) {
        paused = false;
    } else {
        paused = true;
    }
}

function toggleFullScreen(element) {
    if (inFullScreen) {
        launchFullscreen(element);
        inFullScreen = false;
    } else {
        exitFullscreen();
        inFullScreen = true;
    }
}

function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

    canvas.width = screen.width;
    canvas.height = screen.height;
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
