'use strict';
class Binder {
    valueTo(dataSourceObj, dataSourceProperty, dataTargetObj, dataTargetProperty) {
        const bindHandler = {
            set: function(target, property, newValue) {
                if (property === dataSourceProperty) {
                    target[dataSourceProperty] = newValue;
                    dataTargetObj[dataTargetProperty] = newValue;
                }
                return true;
            },
            get: function() {
                return dataSourceObj[dataSourceProperty];
            }
        };
        return new Proxy(dataSourceObj, bindHandler);
    }
    
    livesTo(dataSourceObj, dataSourceProperty, lives) {
        const bindHandler = {
            set: function(target, property, newValue) {
                if (property === dataSourceProperty) {
                    target[dataSourceProperty] = newValue;
                    lives.displayLives();
                }
                return true;
            },
            get: function() {
                return dataSourceObj[dataSourceProperty];
            }
        };
        return new Proxy(dataSourceObj, bindHandler);
    }
}