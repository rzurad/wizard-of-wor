import Actor from 'Actor';

export default class Player extends Actor {
    createMovingSprite() {
        const sprite = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('worrior-one.walk1.png'),
            PIXI.Texture.fromFrame('worrior-one.walk2.png'),
            PIXI.Texture.fromFrame('worrior-one.walk3.png')
        ]);

        sprite.animationSpeed = 0.25;

        return sprite;
    }

    createFiringSprite() {
        const sprite = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('worrior-one.fire1.png'),
            PIXI.Texture.fromFrame('worrior-one.fire2.png'),
            PIXI.Texture.fromFrame('worrior-one.fire1.png')
        ]);

        sprite.animationSpeed = 0.2;
        sprite.loop = false;

        return sprite;
    }

    constructor() {
        super();

        this.startup();
    }
}
