'use strict';
function moveIt(posY, step) {
    setTimeout( () => {
        posY += step;
        postMessage(posY);
        if (posY < 605 ) {
            moveIt(posY, step);
        }
    }, 32);
}
self.addEventListener('message', (e) => {
    moveIt(e.data[0], e.data[1]);
});