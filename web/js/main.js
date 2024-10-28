(function(win, doc) {
    'use strict';

    const renderer = doc.querySelector('[data-screen]').getContext('2d');

    (function loop() {
        renderer.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
        renderer.fillStyle = '#c80000';
        renderer.fillRect(0, 0, 120, 120);
        window.requestAnimationFrame(loop);
    })();
})(window, document);
