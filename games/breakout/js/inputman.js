//Using http://kallaspriit.github.io/HTML5-JavaScript-Gamepad-Controller-Library/

//There are about 60 Inputs per second. This sets how much of them to "skip"
var inputStepPause = 6;   //Moving-Input: Left,Right,Down

var inputStep = 0;
var gamepad = new Gamepad();
var leftPressed = false;
var rightPressed = false;
var holdDown = false;

gamepad.bind(Gamepad.Event.CONNECTED, function (device) {
    dbt.innerHTML = "Gamepad Detected";
    if (!running) {
        playerReset();
        updateScore();
        update();
        running = true;
    }
});

gamepad.bind(Gamepad.Event.BUTTON_DOWN, function (e) {
    dbt.innerHTML = "" + e.control;
    switch (e.control) {
        case "DPAD_LEFT":
            leftPressed = true;
            break;
        case "DPAD_RIGHT":
            rightPressed = true;
            break;
        case "START_FORWARD":
            togglePause();
            break;
        case "SELECT_BACK":
            togglePause();
            break;
    }

});

gamepad.bind(Gamepad.Event.BUTTON_UP, function (e) {
    switch (e.control) {
        case "DPAD_LEFT":
            leftPressed = false;
            break;
        case "DPAD_RIGHT":
            rightPressed = false;
            break;
    }

});

gamepad.bind(Gamepad.Event.AXIS_CHANGED, function (e) {
    dbt.innerHTML = "" + e.value + " | " + e.axis;
    switch (e.axis) {
        case "LEFT_STICK_X":
            if (e.value < -0.5) {
                leftPressed = true;
                rightPressed = false;
            } else if (e.value > 0.5) {
                rightPressed = true;
                leftPressed = false;
            } else if (e.value < 0.5 || e.value > -0.5) {
                leftPressed = false;
                rightPressed = false;
            }
            break;
    }
});

if (!gamepad.init()) {
    dbt.innerHTML = "ERROR";
}
