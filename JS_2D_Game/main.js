window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;


    class Game{
        constructor(width, height){
            this._width = width;
            this._height = height;
        }

        update(){

        }

        draw(){
            
        }
    }
});