'use strict';
{
    const spaceship = new SpaceShip();
    const scoreDataModel = new ScoreDataModel();
    const binder = new Binder();
    const defaultDataModel = new DefaultDataModel();
    
    const levelObj = document.querySelector('#level > span');
    const levelProp = 'innerHTML';
    levelObj[levelProp] = scoreDataModel.level;
    const proxyLevel = binder.valueTo(scoreDataModel, 'level', levelObj, levelProp);
    
    const scoreObj = document.querySelector('#score > span');
    const scoreProp = 'innerHTML';
    const proxyScore = binder.valueTo(scoreDataModel, 'score', scoreObj, scoreProp);
    
    const lives = new Lives();
    const proxyLives = binder.livesTo(scoreDataModel, 'lives', lives);
    
    const display = new Display(defaultDataModel, proxyScore, proxyLives, proxyLevel);
    const blueSky = new BlueSky(display);
    
    const fallingObjectGenerator = new FallingObjectGenerator(defaultDataModel, proxyScore, proxyLives);
    
    lives.initialize(blueSky, fallingObjectGenerator, display);
    
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        blueSky.starsGenerator();
        defaultDataModel.initialize(proxyLevel.level, spaceship);
        fallingObjectGenerator.activeScore = true;
        fallingObjectGenerator.objectGenerator();
    });
    
}