import { Player } from './player.js';
import { inputHandler} from './input.js';

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;


    class Game{
        constructor(width, height){
            this._width = width;
            this._height = height;
            this._groundMargin = 50;
            this._player = new Player(this);
            this._input = new inputHandler();
            
        }

        update(deltaTime){
            this._player.update(this._input._keys, deltaTime);
        }

        draw(context){
            this._player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});