Object.prototype.extend = function(obj) {
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
    return this;
};