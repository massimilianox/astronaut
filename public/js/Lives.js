'use strict';
const Lives = (function() {
    const showLives = document.getElementById('lives');
    class Life {
        constructor() {
            const domElement = document.createElement('div');
            domElement.style.width = '35px';
            domElement.style.height = '24px';
            domElement.style.backgroundImage = 'url(/img/life.png)';
            domElement.style.backgroundRepet = 'no-repet';
            domElement.style.backgroundPosition = 'cover';
            domElement.style.display = 'inline-block';
            showLives.appendChild(domElement);
        }
    }

    return class Lives {
        initialize(blueSky, fallingObjectGenerator, display) {
            this.blueSky = blueSky;
            this.fallingObject = fallingObjectGenerator;
            this.display = display;
            this.proxyLives = this.display.proxyLives;;
            this.displayLives();
        }

        displayLives() {
            showLives.innerHTML = '';
            console.log('Lives: ' + this.proxyLives.lives);
            for (let x = 0; x < this.proxyLives.lives; x++) {
                const life = new Life();
            }
            
            if (this.proxyLives.lives < 1) {
                this.blueSky.startStars = false;
                clearTimeout(this.blueSky.clearStars);
                this.fallingObject.activeScore = false;
                this.fallingObject.na = 0;
                this.fallingObject.nr = 0;
                this.display.looser();
            }
        }
    }
})(); 