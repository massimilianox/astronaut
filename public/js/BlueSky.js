'use strict';
const BlueSky = (function() {
    const playground = document.getElementById('playground');
    
    class FallingStar {
        constructor(x, w, g) {
            this.domElement = document.createElement('div');
            this.domElement.style.position = 'absolute';
            this.domElement.style.width = `${w}px`;
            this.domElement.style.height = `${w}px`;
            this.domElement.style.left = `${x}px`;
            this.domElement.style.background = '#fff';
            this.domElement.style.top = '-5px';
            this.domElement.style.boxShadow = `0 0 ${g}px rgba(255,255,255,0.8)`;
            playground.appendChild(this.domElement);
        }
    }
    
    return class BlueSky {
        constructor(display) {
            this.startStars = false;
            this.display = display;
        }

        starsGenerator() {
            this.startStars = true;
            function randomNumber() {
                return 600 * Math.random().toFixed(3);
            }

            const fireStarSmall = setInterval( () => {
                if (this.startStars) {
                    this.fallingStar(randomNumber(), 1, 2, 7);
                } else {
                    clearInterval(fireStarSmall);
                }
            }, 350);

            const fireStarMedium = setInterval( () => {
                if (this.startStars) {
                    this.fallingStar(randomNumber(), 2, 3, 5);
                } else {
                    clearInterval(fireStarMedium);
                }
            }, 800);

            const fireStarLarge = setInterval( () => {
                if (this.startStars) {
                    this.fallingStar(randomNumber(), 3, 4, 3.5);
                } else {
                    clearInterval(fireStarLarge);
                }
            }, 1100);

            this.clearStars = setTimeout(() => {
                clearInterval(fireStarSmall);
                clearInterval(fireStarMedium);
                clearInterval(fireStarLarge);
                this.display.endOfLevel();
            }, 46000);
        }
        
        fallingStar(x, w, g, s) {
            let obj = new FallingStar(x, w, g);
            const moveIt = new Worker('/js/moveFallingObject.js');
            const ph = playground.offsetHeight;
            moveIt.addEventListener('message', (e) => {
                if (e.data < ph-10 && obj !== null) {
                    obj.domElement.style.top = e.data + 'px';
                } else if (e.data >= ph - 10 && obj !== null) {
                    playground.removeChild(obj.domElement);
                    obj = null;
                    moveIt.terminate();
                }
            });
            moveIt.postMessage([-5, s]);
        }
    }
})();
