'use strict';
const SpaceShip = (function() {
    const ww = window.innerWidth;
    const playground = document.getElementById('playground');
    const pw = playground.offsetWidth;
    const offsetX = (ww - pw)/2;
    let moveIt = true;
    let go = true;
    
    return class SpaceShip {
        constructor() {
            this.spaceship = document.getElementById('spaceship');
            this.posX = this.spaceship.offsetLeft;
            this.posY = this.spaceship.offsetTop;
            this.ssw = this.spaceship.offsetWidth;
            this.ssh = this.spaceship.offsetHeight;
            this.initPlayGround();
        }
        
        initPlayGround() {
            const self = this;
            function wrapperPosX(e) {
                return self.updateSpaceShipPosX(e);
            }
            this.spaceship.addEventListener('mousedown', () => {
                this.spaceship.addEventListener('mousemove', wrapperPosX, false);
            });
            this.spaceship.addEventListener('mouseup', () => {
                this.spaceship.removeEventListener('mousemove', wrapperPosX, false);
            });
            
            document.addEventListener('keydown', (e) => {
                switch(e.keyCode) {
                    case 37:
                        if (go) {
                            this.moveLeft();
                            go = false;
                        }
                        break;
                    case 39:
                        if (go) {
                            this.moveRight(); 
                            go = false;
                        }
                        break;
                }
            });
            
            document.addEventListener('keyup', (e) => {
                switch(e.keyCode) {
                    case 37:
                        cancelAnimationFrame(moveIt);
                        go = true;
                        break;
                    case 39:
                        cancelAnimationFrame(moveIt);
                        go = true;
                        break;
                }
            });
            
        }

        updateSpaceShipPosX(e) {
            if ((e.pageX - offsetX)-(this.ssw/2) >= 0 && (e.pageX - offsetX)-(this.ssw/2) <= pw-this.ssw) {
                this.spaceship.style.left = ((e.pageX - offsetX)-(this.ssw/2)) + 'px';
                this.posX = this.spaceship.offsetLeft;
            }
        }
        
        collisionWallLeft() {
            if (this.posX < 0) return true;
            return false;
        }
        
        collisionWallRight() {
            if ((this.posX + this.ssw) > pw) return true;
            return false;
        }
        
        moveLeft() {
            if (!this.collisionWallLeft()) {
                this.posX -= 3;
                this.spaceship.style.left = this.posX + 'px';
                moveIt = requestAnimationFrame(() => { this.moveLeft(); });
            }
        }
        moveRight() {
            if (!this.collisionWallRight()) {
                this.posX += 3;
                this.spaceship.style.left = this.posX + 'px';
                moveIt = requestAnimationFrame(() => { this.moveRight(); });
            }
        }
    }
})();
