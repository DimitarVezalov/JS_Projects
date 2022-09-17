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
            this._player.setState(states.RUNNING, 1);
        } else if(input.includes('Enter')){
            this._player.setState(states.ROLLING, 2);
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
            this._player.setState(states.SITTING, 0);
        }else if(input.includes('ArrowUp')){
            this._player.setState(states.JUMPING, 1);
        } else if(input.includes('Enter')){
            this._player.setState(states.ROLLING, 2);
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
            this._player._vSpeed -= 23;
        }
        this._player._frameX = 0;
        this._player._maxFrame = 6
        this._player._frameY = 1;
    }

    handleInput(input){
        if(this._player._vSpeed > this._player._weight){
            this._player.setState(states.FALLING, 1);
        } else if(input.includes('Enter')){
            this._player.setState(states.ROLLING, 2);
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
            this._player.setState(states.RUNNING, 1);
        }
    }
}

export class Rolling extends State{
    constructor(player){
        super('ROLLING');
        this._player = player;
    }

    enter(){
        this._player._frameX = 0;
        this._player._maxFrame = 6
        this._player._frameY = 6;
    }

    handleInput(input){
        if(!input.includes('Enter' && this._player.onGround())){
            this._player.setState(states.RUNNING, 1);
        } else if(!input.includes('Enter') && !this._player.onGround()){
            this._player.setState(states.FALLING, 1);
        }
    }
}