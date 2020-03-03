class DMV {
    private Line = [];
    public addToLine(name: string) {
        this.Line.push(name);
    }
    public removeFromLine() {
        return this.Line.shift();
    }
}

let dmv: DMV = new DMV();
dmv.addToLine('Michael Johnson');
dmv.addToLine('Dylan Wraith');
console.log('Now helping: ' + dmv.removeFromLine());
console.log('Now helping: ' + dmv.removeFromLine());
