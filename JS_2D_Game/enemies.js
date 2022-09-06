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
        this._x -= this._speedX + this._game._speed;
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
        this._x = this._game._width + Math.random() * this._game._width * 0.5;
        this._y = Math.random() * this._game._height * 0.55;
        this._speedX = Math.random() + 1;
        this._speedY = 0;
        this._maxFrame = 5;
        this._image = document.getElementById('enemy_fly');
        this._angle = 0;
        this._angleCurve = Math.random() * 0.1 + 0.1; 
    }

    update(deltaTime){
        super.update(deltaTime);
        this._angle += this._angleCurve
        this._y += Math.sin(this._angle);
    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this._game = game;
        this._width = 60;
        this._height = 87;
        this._x = this._game._width;
        this._y = this._game._height - this._height - this._game._groundMargin;
        this._image = document.getElementById("enemy_plant");
        this._speedX = 0;
        this._speedY = 0;
        this._maxFrame = 1;
    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this._game = game;
        this._width = 120;
        this._height = 144;
        this._x = this._game._width;
        this._y = Math.random() * this._game._height * 0.5
        this._image = document.getElementById('enemy_spider_big');
        this._speedX = 0;
        this._speedY = Math.random() > 0.5 ? 1 : -1;
        this._maxFrame = 5;
    }   

    update(deltaTime){
        super.update(deltaTime);
         
        if(this._y > this._game._height - this._height - this._game._groundMargin){
            this._speedY *= -1
        }

        if(this._y < -this._height){
            this._markedForDeletion = true;
        }
    }

    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this._x + this._width / 2, 0);
        context.lineTo(this._x + this._width / 2, this._y + 50);
        context.stroke(); 
        
    }   
}