var DMV = /** @class */ (function () {
    function DMV() {
        this.Line = [];
    }
    DMV.prototype.addToLine = function (name) {
        this.Line.push(name);
    };
    DMV.prototype.removeFromLine = function () {
        return this.Line.shift();
    };
    return DMV;
}());
var dmv = new DMV();
dmv.addToLine('Michael Johnson');
dmv.addToLine('Dylan Wraith');
console.log('Now helping: ' + dmv.removeFromLine());
console.log('Now helping: ' + dmv.removeFromLine());
