const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    constructor(state){
        this._state = state;
    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this._player = player;
    }

    enter(){
        this._player._frameX = 0;
        this._player._maxFrame = 4;
        this._player._frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this._player.setState(states.RUNNING);
        }
    }
}

export class Running extends State{
    constructor(player){
        super('RUNNING');
        this._player = player;
    }

    enter(){
        this._player._frameX = 0;
        this._player._maxFrame = 6;
        this._player._frameY = 3;      
    }

    handleInput(input){
        if(input.includes('ArrowDown')){
            this._player.setState(states.SITTING);
        }else if(input.includes('ArrowUp')){
            this._player.setState(states.JUMPING);
        } 
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this._player = player;
    }

    enter(){
        if(this._player.onGround()){
            this._player._vSpeed -= 27;
        }
        this._player._frameX = 0;
        this._player._maxFrame = 6
        this._player._frameY = 1;
    }

    handleInput(input){
        if(this._player._vSpeed > this._player._weight){
            this._player.setState(states.FALLING);
        }
    }
}

export class Falling extends State{
    constructor(player){
        super('FALLING');
        this._player = player;
    }

    enter(){
        this._player._frameX = 0;
        this._player._maxFrame = 6
        this._player._frameY = 2;
    }

    handleInput(input){
        if(this._player.onGround()){
            this._player.setState(states.RUNNING);
        }
    }
}