import {Dust, Fire} from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
}

class State {
    constructor(state, game){
        this._state = state;
        this._game = game;
    }
}

export class Sitting extends State{
    constructor(game){
        super('SITTING', game);
    }

    enter(){
        this._game._player._frameX = 0;
        this._game._player._maxFrame = 4;
        this._game._player._frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this._game._player.setState(states.RUNNING, 1);
        } else if(input.includes('Enter')){
            this._game._player.setState(states.ROLLING, 2) ;
        }
    }
}

export class Running extends State{
    constructor(game){
        super('RUNNING', game);
    }

    enter(){
        this._game._player._frameX = 0;
        this._game._player._maxFrame = 8;
        this._game._player._frameY = 3;      
    }

    handleInput(input){
        this._game._particles.unshift(new Dust(this._game, this._game._player._x + this._game._player._width *0.5, this._game._player._y + this._game._player._height));

        if(input.includes('ArrowDown')){
            this._game._player.setState(states.SITTING, 0);
        }else if(input.includes('ArrowUp')){
            this._game._player.setState(states.JUMPING, 1);
        } else if(input.includes('Enter')){ 
            this._game._player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
    }

    enter(){
        if(this._game._player.onGround()){
            this._game._player._vSpeed -= 23;
        }
        this._game._player._frameX = 0;
        this._game._player._maxFrame = 6
        this._game._player._frameY = 1;
    }

    handleInput(input){
        if(this._game._player._vSpeed > this._game._player._weight){
            this._game._player.setState(states.FALLING, 1);
        } else if(input.includes('Enter')){
            this._game._player.setState(states.ROLLING, 2);
        }
    }
}

export class Falling extends State{
    constructor(game){
        super('FALLING', game);
    }

    enter(){
        this._game._player._frameX = 0;
        this._game._player._maxFrame = 6
        this._game._player._frameY = 2;
    }

    handleInput(input){
        if(this._game._player.onGround()){
            this._game._player.setState(states.RUNNING, 1);
        }
    }
}

export class Rolling extends State{
    constructor(game){
        super('ROLLING', game);
    }

    enter(){
        this._game._player._frameX = 0;
        this._game._player._maxFrame = 6;
        this._game._player._frameY = 6;
    }

    handleInput(input){

        this._game._particles.unshift(new Fire(this._game, this._game._player._x + this._game._player._width * 0.5, this._game._player._y + this._game._player._height * 0.5));

        if(!input.includes('Enter') && this._game._player.onGround()){
            this._game._player.setState(states.RUNNING, 1);
        } else if(!input.includes('Enter') && !this._game._player.onGround()){
            this._game._player.setState(states.FALLING, 1);
        }else if(input.includes('Enter') && input.includes('ArrowUp') && this._game._player.onGround()){
            this._game._player._vSpeed -=27;
        }
    }
}