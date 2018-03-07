document.addEventListener("mousedown", function(e) {
    if (!started) {
        start();
    } else {
        end();
    }
})