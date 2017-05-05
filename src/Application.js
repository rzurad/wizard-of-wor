import 'pixi.js/dist/pixi';
import GameLogic from 'GameLogic';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Application extends PIXI.Application {
    constructor(config) {
        super(config);

        this.game = new GameLogic();
        this.game.container.x = this.renderer.view.width / 2;
        this.game.container.y = this.renderer.view.height / 2;
        this.game.container.pivot.set(this.game.container.width / 2, this.game.container.height / 2);
        this.stage.addChild(this.game.container);
        document.body.appendChild(this.view);
    }

    onUpdateGame() {
        this.game.onUpdate();
    }
}
