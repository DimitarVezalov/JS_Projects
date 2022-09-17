import { Sitting, Running, Jumping, Falling, Rolling } from "./playerState.js";

export class Player{
    constructor(game){
        this._game = game;
        this._width = 100;
        this._height = 91.3
        this._x = 0;
        this._y = this._game._height - this._height - this._game._groundMargin;
        this._vSpeed = 0;
        this._weight = 1;
        this._image = document.getElementById('player');
        this._frameX = 0;
        this._frameY = 0;
        this._maxFrame;
        this._fps = 20;
        this._frameInterval = 1000 / this._fps;
        this._frameTimer = 0;
        this._hSpeed = 0;
        this._maxSpeed = 5;
        this._states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Rolling(this)];
        this._currentState = this._states[0];
        this._currentState.enter()
    }

    update(input, deltatime){
        this.checkCollisions()
        this._currentState.handleInput(input);

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

        this._y += this._vSpeed;

        if(!this.onGround()){
            this._vSpeed +=  this._weight
        }else{
            this._vSpeed= 0;
        }

        //sprite animation
        if(this._frameTimer > this._frameInterval){
            this._frameTimer = 0;

            if(this._frameX < this._maxFrame){
                this._frameX++;
            }else{
                this._frameX = 0;
            }
        }else{
            this._frameTimer += deltatime;
        }
         
    }

    draw(context){
        if(this._game._debug){
            context.strokeRect(this._x, this._y, this._width, this._height);
        }
        context.drawImage(this._image, this._frameX * this._width, this._frameY * this._height, this._width, this._height, this._x, this._y, this._width, this._height);
    }

    onGround(){
        return this._y >= this._game._height - this._height - this._game._groundMargin;
    }

    setState(state, speed){
        this._currentState = this._states[state];
        this._game._speed = this._game._maxSpeed * speed;
        this._currentState.enter();
    }

    checkCollisions(){
        this._game._enemies.forEach(enemy => {
            if(
                enemy._x < this._x + this._width && 
                enemy._x + enemy._width > this._x &&
                enemy._y < this._y + this._height &&
                enemy._y + enemy._height > this._y
            ){
                enemy._markedForDeletion = true;    
                this._game._score++;
            } else{

            }
        });
    }
}