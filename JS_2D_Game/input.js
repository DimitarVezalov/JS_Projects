export class InputHandler{
    constructor(game){
        this._game = game;
        this._keys = [];
        window.addEventListener('keydown', e => {
            
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this._keys.indexOf(e.key) == -1){
                this._keys.push(e.key);
            }else if(e.key == 'd'){
                this._game._debug = !this._game._debug;
                console.log(this._game._debug);
            }

            
        });

        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'){
                this._keys.splice(this._keys.indexOf(e.key), 1);
            }
            console.log(e.key, this._keys);
        });

    }
}