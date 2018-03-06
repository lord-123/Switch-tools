var inFullScreen = false;

var music = document.getElementById("music");
var beep = document.getElementById("beep");
var muted = false;

function toggleAudio() {
    if (muted) {
        music.volume = 1;
        beep.volume = 1;
        muted = false
    }
    else {
        music.volume = 0;
        beep.volume = 0;
        muted = true
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
