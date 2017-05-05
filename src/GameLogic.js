import Dungeon from 'Dungeon';
import { DUNGEONS } from 'consts';
import EventManager from 'EventManager';
import Player from 'Player';
import Input from 'Input';
import 'pixi.js/dist/pixi';

const PORTAL_COOLDOWN = 5000;

export default class GameLogic {
    constructor(config) {
        const board = new Dungeon();
        const player = new Player();

        board.load((function (d) {
            return d[~~(Math.random() * d.length)];
        }(DUNGEONS.WORRIOR)));
        board.spawnActor(player);

        this.container = new PIXI.Container();
        this.board = board;
        this.player = player;
        this.input = new Input();
        this.onPortalTrigger = this.onPortalTrigger.bind(this);

        this.container.addChild(this.board.container);
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

    onUpdate() {
        this.processInput();
    }
}
