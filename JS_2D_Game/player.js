export class Player{
    constructor(game){
        this._game = game;
        this._width = 100;
        this._height = 91.3
        this._x = 0;
        this._y = this._game._height - this._height;
        this._vSpeed = 0;
        this._weight = 1;
        this._image = document.getElementById('player');
        this._hSpeed = 0;
        this._maxSpeed = 10;
    }

    update(input){
        // horizontal movement
        this._x += this._hSpeed;
        if(input.includes('ArrowRight')){
            this._hSpeed =   this._maxSpeed;
        }else if(input.includes('ArrowLeft')){
            this._hSpeed = -this._maxSpeed;
        }else {
            this._hSpeed = 0;
        }

        if (this._x < 0) {
            this._x = 0;
        }

        if(this._x > this._game._width - this._width){
            this._x = this._game._width - this._width;
        }

        // vertical movement
        
        if(input.includes('ArrowUp') && this.onGround()){
            this._vSpeed -= 20
        }

        this._y += this._vSpeed;

        if(!this.onGround()){
            this._vSpeed +=  this._weight
        }else{
            this._vSpeed= 0;
        }
    }

    draw(context){
        context.drawImage(this._image, 0, 0, this._width, this._height, this._x, this._y, this._width, this._height);
    }

    onGround(){
        return this._y >= this._game._height - this._height;
    }
}