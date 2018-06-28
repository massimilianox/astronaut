'use strict';
const FallingObjectGenerator = (function() {
    const objectsMap = new WeakMap();
    const _ = (obj) => objectsMap.get(obj);
    const playground = document.getElementById('playground');
    
    class FallingObject {
        constructor(x, y, w, h, url) {
            this.domElement = document.createElement('div');
            this.domElement.style.position = 'absolute';
            this.domElement.style.left = x + 'px';
            this.domElement.style.top = y + 'px';
            this.domElement.style.width = w + 'px';
            this.domElement.style.height = h + 'px';
            this.domElement.style.zIndex = '1';
            this.domElement.style.backgroundImage= `url("${url}")`;
            playground.appendChild(this.domElement);
        }
    }
    
    return class FallingObjectGenerator {
        constructor(dataModel, proxyScore, proxyLives) {
            this.dataModel = dataModel;
            this.proxyScore = proxyScore;
            this.proxyLives = proxyLives;
            this.activeScore = true;
        }

        objectGenerator() {
            const self = this;
            this.na = this.dataModel.astronaut.na;
            this.nr = this.dataModel.rock.nr;
            function randomPosX(kind) {
                switch (kind) {
                    case 'astronaut':
                        return (playground.offsetWidth - self.dataModel.astronaut.wa) * Math.random();
                        break;
                    case 'rock':
                        return (playground.offsetWidth - self.dataModel.rock.wr) * Math.random();
                        break;
                }
            }

            function fireAstronaut() {
                setTimeout( () => {
                    self.falling(randomPosX('astronaut'), 'astronaut');
                    if (self.na > 0) {
                        fireAstronaut();
                    }
                    self.na -= 1;
                }, self.dataModel.astronaut.hzAstronaut);
            }
            fireAstronaut();

            function fireRock() {
                setTimeout( () => {
                    self.falling(randomPosX('rock'), 'rock');
                    if (self.nr > 0) {
                        fireRock();
                    }
                    self.nr -= 1;
                }, self.dataModel.rock.hzRock);
            }
            fireRock();
        }

        fallingObject(obj, data) {
            const moveIt = new Worker('/js/moveFallingObject.js');
            const ph = playground.offsetHeight;
            moveIt.addEventListener('message', (e) => {
                if (e.data < ph-2 && obj !== null) {
                    obj.domElement.style.top = e.data + 'px';
                    _(obj).posY = e.data;
                    const tipo = _(obj).tipo;
                    
                    let oh;
                    let ow;
                    switch (tipo) {
                        case 'rock':
                            oh = this.dataModel.rock.hr;
                            ow = this.dataModel.rock.wr;
                            break;
                        case 'astronaut':
                            oh = this.dataModel.astronaut.ha;
                            ow = this.dataModel.astronaut.wa;
                            break;
                    }
                    
                    const ssh = this.dataModel.spaceship.ssh;
                    const ox = _(obj).posX;
                    const ssx = this.dataModel.spaceship.posX;
                    const ssw = this.dataModel.spaceship.ssw;
                    
                    if ( _(obj).posY + oh > ph - ssh - 6 && ((ox >= ssx && ox <= ssx + ssw) || (ox + ow >= ssx && ox + ow <= ssx + ssw)) && this.activeScore ) {
                        
                        switch (tipo) {
                            case 'rock':
                                if (this.proxyLives.lives >= 1) this.proxyLives.lives -= 1;
                                break;
                            case 'astronaut':
                                this.proxyScore.score += 1;
                                break;
                        }
                        
                        playground.removeChild(obj.domElement);
                        objectsMap.delete(obj);
                        moveIt.terminate();
                        obj = null;
                    }
                } else if (e.data >= ph-2 && obj !== null) {
                    playground.removeChild(obj.domElement);
                    objectsMap.delete(obj);
                    moveIt.terminate();
                    obj = null;
                }
            });
            moveIt.postMessage([data.posY, data.step]);
        }
        
        
        falling(x, tipo) {
            
            let y;
            let w;
            let h;
            let url;
            let step;
            
            switch (tipo) {
                case 'rock':
                    y = this.dataModel.rock.posY;
                    w = this.dataModel.rock.wr;
                    h = this.dataModel.rock.hr;
                    url = this.dataModel.rock.url;
                    step = this.dataModel.rock.step;
                    break;
                case 'astronaut':
                    y = this.dataModel.astronaut.posY;
                    w = this.dataModel.astronaut.wa;
                    h = this.dataModel.astronaut.ha;
                    url = this.dataModel.astronaut.url;
                    step = this.dataModel.astronaut.step;
                    break;
            }
            
            const obj = new FallingObject(x, y, w, h, url);
            objectsMap.set(obj, {
                tipo: tipo,
                posY: obj.domElement.offsetTop,
                posX: obj.domElement.offsetLeft
            });
            this.fallingObject(obj, {posY: y, step: step});
            //console.log(objectsMap);
        }
    }
})();
