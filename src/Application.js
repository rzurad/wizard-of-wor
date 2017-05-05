import 'pixi.js/dist/pixi';
import GameLogic from 'GameLogic';
import DungeonView from 'DungeonView';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Application extends PIXI.Application {
    constructor(config) {
        super(config);

        this.game = new GameLogic();
        this.game.addView(new DungeonView());
    }

    onUpdateGame() {
        this.game.onUpdate();
    }
}
