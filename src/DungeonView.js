import EventManager from 'EventManager';
import Player from 'Player';
import Input from 'Input';
import Dungeon from 'Dungeon';
import { DUNGEONS } from 'consts';

const PORTAL_COOLDOWN = 5000;

export default class DungeonView {
    constructor() {
        const app = new PIXI.Application({ width: 500, height: 350 });

        const board = new Dungeon();
        const player = new Player();

        board.load((function (d) {
            return d[~~(Math.random() * d.length)];
        }(DUNGEONS.WORRIOR)));
        board.spawnActor(player);

        const container = board.container;

        container.x = 500 / 2;
        container.y = 350 / 2;
        container.pivot.set(container.width / 2, container.height / 2);
        app.stage.addChild(container);

        this.board = board;
        this.player = player;
        this.input = new Input();
        this.element = app.view;

        // this belongs in GameLogic
        this.onPortalTrigger = this.onPortalTrigger.bind(this)
        EventManager.global().on('Portal', this.onPortalTrigger);
    }

    onPortalTrigger(e) {
        setTimeout(() => {
            this.board.openPortal();
        }, PORTAL_COOLDOWN);
    }

    processInput() {
        if (this.player.can('stopmoving') && !this.input.direction) {
            this.player.stopmoving();
        }

        if (this.input.direction) {
            this.player.move(this.input.direction);
        }
    }

    destroy() {
        EventManager.global().off('Portal', this.onPortalTrigger);
        this.input.destroy();
    }

    onUpdateFrame() {
        this.processInput();
    }
}
