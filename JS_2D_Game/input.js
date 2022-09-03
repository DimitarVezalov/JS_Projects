export class inputHandler{
    constructor(){
        this._keys = [];
        window.addEventListener('keydown', e => {
            
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this._keys.indexOf(e.key) == -1){
                this._keys.push(e.key);
            }

            console.log(e.key, this._keys);
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