export class UI{
    constructor(game){
        this._game = game;
        this._fontSize = 20;
        this._fontFamily = 'Helvetica';
    }

    draw(context){
        context.font = this._fontSize + 'px ' + this._fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this._game._fontColor;
        context.fillText('Score: ' + this._game._score, 20, 50);
    }
}