export class Player{
    constructor(game){
        this._game = game;
        this._width = 100;
        this._height = 91.3
        this._x = 0;
        this._y = this._game._height - this._height;
        this._image = document.getElementById('player');
    }

    update(){
       // this._x++;
    }

    draw(context){
        context.drawImage(this._image, 0, 0, this._width, this._height, this._x, this._y, this._width, this._height);
    }
}