import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js'
import { UI } from './UI.js'

window.addEventListener('load', function () {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;


    class Game {
        constructor(width, height) {
            this._width = width;
            this._height = height;
            this._groundMargin = 80;
            this._speed = 0;
            this._maxSpeed = 3;
            this._background = new Background(this);
            this._player = new Player(this);
            this._input = new InputHandler(this);
            this._UI = new UI(this);
            this._enemies = [];
            this._particles = [];
            this._maxParticles = 50;
            this._enemyTimer = 0;
            this._enemyInterval = 1000;
            this._debug = true;
            this._score = 0;
            this._fontColor = 'black';
            this._player._currentState = this._player._states[0];
            this._player._currentState.enter();
        }

        update(deltaTime) {
            this._background.update();
            this._player.update(this._input._keys, deltaTime);
            // handle Enemies
            if (this._enemyTimer > this._enemyInterval) {
                this.addEnemy();
                this._enemyTimer = 0;
            } else {
                this._enemyTimer += deltaTime;
            }

            this._enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy._markedForDeletion) {
                    this._enemies.splice(this._enemies.indexOf(enemy), 1);
                }
            });

            // handle particles
            this._particles.forEach((particle, index) => {
                particle.update();
                if (particle._markedForDeletion) {
                    this._particles.splice(index, 1);
                }
            });

            if(this._particles.length > this._maxParticles){
                this._particles = this._particles.slice(0, this._maxParticles)
            }
            console.log(this._particles);
        }

        draw(context) {
            this._background.draw(context);
            this._player.draw(context);
            this._enemies.forEach(enemy => enemy.draw(context));
            this._UI.draw(context);
            this._particles.forEach(particle => {
                particle.draw(context);
            })
        }

        addEnemy() {
            if (this._speed > 0 && Math.random() < 0.5) {
                this._enemies.push(new GroundEnemy(this));
            } else if (this._speed > 0) {
                this._enemies.push(new ClimbingEnemy(this));
            }
            this._enemies.push(new FlyingEnemy(this));

        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});