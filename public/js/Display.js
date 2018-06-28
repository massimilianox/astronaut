'use strict';
class Display {
    constructor(defaultDataModel, proxyScore, proxyLives, proxyLevel) {
        this.dataModel = defaultDataModel;
        this.proxyScore = proxyScore;
        this.proxyLives = proxyLives;
        this.proxyLevel = proxyLevel;
        //this.bluesky = bluesky;
    }
    
    endOfLevel() {
        //console.log('called display.endOfLevel');
        const btnStart = document.getElementById('start-game');
        if (this.proxyScore.score > (this.dataModel.astronaut.na*0.7) && this.proxyLevel.level < 3) {
            btnStart.innerHTML = `you win! ${this.proxyScore.score} points <br> click for the next level`;
            btnStart.style.display = 'block';
            this.dataModel.totalScore += this.proxyScore.score;
            this.proxyScore.score = 0;
            this.proxyLives.lives = 3;
            this.proxyLevel.level += 1;
        } else if (this.proxyScore.score > (this.dataModel.astronaut.na*0.7) && this.proxyLevel.level >= 3) {
            this.dataModel.totalScore += this.proxyScore.score;
            this.proxyScore.score = 0;
            this.proxyLives.lives = 3;
            this.proxyLevel.level = 1;
            btnStart.innerHTML = `Your Total Score is ${this.dataModel.totalScore} <br>
                                    you Finished the game <br>
                                    click to restart`;
            btnStart.style.display = 'block';
            this.dataModel.totalScore = 0;
        } else {
            this.proxyScore.score = 0;
            this.proxyLives.lives = 3;
            btnStart.innerHTML = 'you loose! <br> repeat the last level';
            btnStart.style.display = 'block';
        }
    }
    
    looser() {
        const btnStart = document.getElementById('start-game');
        //clearTimeout(this.bluesky.clearStars);
        this.proxyScore.score = 0;
        this.proxyLives.lives = 3;
        btnStart.innerHTML = 'you loose!<br> repeat the last level';
        btnStart.style.display = 'block';
    }
}