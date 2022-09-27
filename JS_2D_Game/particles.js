class Particle {
    constructor(game) {
        this._game = game;
        this._markForDeletion = false;
    }

    update() {
        this._x -= this._speedX + this._game._speed;
        this._y -= this._speedY;
        this._size *= 0.97;
        if (this._size < 0.5) {
            this._markForDeletion = true;
        }
    }
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game);

        this._size = Math.random() * 10 +10;
        this._x = x;
        this._y = y;
        this._speedX = Math.random();
        this._speedY = Math.random();
        this._color = 'rgba(0,0,0,0.2)';
    }
    draw(context){
        context.beginPath();
        context.arc(this._x, this._y, this._size, 0, Math.PI * 2);
        context.fillStyle = this._color;
        context.fill();
    }
}

export class Splash extends Particle{
    constructor(){
        
    }
}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this._image = document.getElementById('fire');
        this._size = Math.random() * 100 + 50;
        this._x = x;
        this._y = y;
        this._speedX = 1;
        this._speedY = 1;
        this._angle = 0;
        this._va = Math.random() * 0.2 - 0.1;
    }

    update(){
        super.update();
        this._angle += this._va;
        this._x += Math.sin(this._angle* 5);
    }
    draw(context){
        context.save();
        context.translate(this._x, this._y);
        context.rotate(this._angle);
        context.drawImage(this._image, -this._size * 0.5, -this._size * 0.5, this._size, this._size);
        context.restore();
    }
}