class Enemy {
    constructor(){
        this._frameX = 0;
        this._frameY = 0;
        this._fps = 20;
        this._frameInterval = 1000 / this._fps;
        this._frameTimer = 0;
        this._markedForDeletion = false;
    }

    update(deltaTime){
        // movement
        this._x -= this._speedX;
        this._y += this._speedY;

        if(this._frameTimer > this._frameInterval){
            this._frameTimer = 0;
            
            if(this._frameX < this._maxFrame){
                this._frameX ++;
            }else{
                this._frameX = 0;
            }

        }else {
            this._frameTimer += deltaTime;
        }

        //check if enemies are of screen and remove them from the array
        if(this._x + this._width < 0){
            this._markedForDeletion = true;
        }
    }

    draw(context){
        context.drawImage(this._image, this._frameX * this._width, 0, this._width, this._height, this._x, this._y, this._width, this._height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this._game = game
        this._width = 60;
        this._height = 44;
        this._x = this._game._width;
        this._y = Math.random() * this._game._height * 0.6;
        this._speedX = 2;
        this._speedY = 0;
        this._maxFrame = 5;
        this._image = document.getElementById('enemy_fly');
    }

    update(deltaTime){
        super.update(deltaTime);
    }
}

export class GroundEnemy extends Enemy{

}

export class ClimbingEnemy extends Enemy{

}