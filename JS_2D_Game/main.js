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
            this._player = new Player(this);
            this._input = new inputHandler();
        }

        update(){
            this._player.update();
        }

        draw(context){
            this._player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});