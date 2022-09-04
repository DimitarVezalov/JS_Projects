class Layer{
    constructor(game, width, height, speedModifier, image){
        this._game = game;
        this._width = width;
        this._height = height;
        this._speedModifier = speedModifier;
        this._image = image;
        this._x = 0;
        this._y = 0;
    }

    update(){
        if(this._x < -this._width){
            this._x= 0;
        }else{
            this._x -= this._game._speed * this._speedModifier;
        }
    }

    draw(context){
        context.drawImage(this._image, this._x, this._y, this._width, this._height);
        context.drawImage(this._image, this._x + this._width, this._y, this._width, this._height);
    }
}

export class Background{
    constructor(game){
        this._game = game;
        this._width = 1667;
        this._height = 500;
        this._layerImage1 = document.getElementById('layer1');
        this._layerImage2 = document.getElementById('layer2');
        this._layerImage3 = document.getElementById('layer3');
        this._layerImage4 = document.getElementById('layer4');
        this._layerImage5 = document.getElementById('layer5');
        this._layer1 = new Layer(this._game, this._width, this._height, 0, this._layerImage1);
        this._layer2 = new Layer(this._game, this._width, this._height, 0.2, this._layerImage2)
        this._layer3 = new Layer(this._game, this._width, this._height, 0.4, this._layerImage3)
        this._layer4 = new Layer(this._game, this._width, this._height, 0.8, this._layerImage4)
        this._layer5 = new Layer(this._game, this._width, this._height, 1, this._layerImage5)
        this._backgroundLayers  = [this._layer1, this._layer2, this._layer3, this._layer4, this._layer5];
    }

    update(){
        this._backgroundLayers.forEach(l => {
            l.update();
        })
    }

    draw(context){
        this._backgroundLayers.forEach(l => {
            l.draw(context);
        })
    }
}