import Dungeon from 'Dungeon';
import { DUNGEONS } from 'consts';
import Player from 'Player';
import Input from 'Input';
import 'pixi.js/dist/pixi';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Application extends PIXI.Application {
    constructor(config) {
        super(config);

        const board = new Dungeon();
        const player = new Player();

        board.load((function (d) {
            return d[~~(Math.random() * d.length)];
        }(DUNGEONS.WORRIOR)));
        board.spawnActor(player);

        const container = board.container;

        container.x = this.renderer.view.width / 2;
        container.y = this.renderer.view.height / 2;
        container.pivot.set(container.width / 2, container.height / 2);
        this.stage.addChild(container);
        document.body.appendChild(this.view);

        this.board = board;
        this.player = player;
        this.input = new Input();
    }

    processInput() {
        if (this.player.can('stopmoving') && !this.input.direction) {
            this.player.stopmoving();
        }

        if (this.input.direction) {
            this.player.move(this.input.direction);
        }
    }
}
