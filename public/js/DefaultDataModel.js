'use strict';
class DefaultDataModel {
    constructor() {
        this.totalScore = 0;
    }
    initialize(level, spaceship) {
        this.spaceship = spaceship;
        this.astronaut = {
            posY: -97,
            wa: 45,
            ha: 73,
            url: '/img/astronaut.png'
        };
        this.rock = {
            posY: -141,
            wr: 32,
            hr: 107,
            url: '/img/asteroid.png'
        }; 
        this.initModule(level);
    }
    
    initModule(level) {
        switch (level) {
            case 1:
                console.log('level 1');
                Object.assign(this.astronaut, {
                    na: 15,
                    hzAstronaut: 2500,
                    step: 3.6
                });
                Object.assign(this.rock, {
                    nr: 18,
                    hzRock: 2000,
                    step: 2.8
                });
                break;
            case 2:
                console.log('level 2');
                Object.assign(this.astronaut, {
                    na: 19,
                    hzAstronaut: 2000,
                    step: 6,
                });
                Object.assign(this.rock, {
                    nr: 25,
                    hzRock: 1500,
                    step: 4.8
                });
                break;
            case 3:
                console.log('level 3');
                Object.assign(this.astronaut, {
                    na: 28,
                    hzAstronaut: 1400,
                    step: 8
                });
                Object.assign(this.rock, {
                    nr: 38,
                    hzRock: 1000,
                    step: 6
                });
                break;
            default:
                console.log('default');
                Object.assign(this.astronaut, {
                    na: 32,
                    hzAstronaut: 1400,
                    step: 8
                });
                Object.assign(this.rock, {
                    nr: 45,
                    hzRock: 1000,
                    step: 6
                });
        }
    }
}