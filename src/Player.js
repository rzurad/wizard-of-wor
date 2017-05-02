import Actor from 'Actor';
import 'pixi.js/dist/pixi';

export default class Player extends Actor {
    constructor() {
        super();

        this.sprites.moving = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('worrior-one.walk1.png'),
            PIXI.Texture.fromFrame('worrior-one.walk2.png'),
            PIXI.Texture.fromFrame('worrior-one.walk3.png')
        ]);

        this.sprites.moving.animationSpeed = 0.25;
        this.startup();
    }
}
