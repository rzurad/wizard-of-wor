import GameLogic from 'GameLogic';
import EventManager from 'EventManager';
import 'pixi.js/dist/pixi';

const INVALID_VIEW_ID = 0;

class HumanView {
    constructor(renderer) {
        this.initAudio();
        this.viewId = INVALID_VIEW_ID;
        this.registerAllDelegates()
        this.baseGameState = 'Initializing';
        this.scene = new PIXI.Container();
    }

    onKeyDown(e) {}
    onKeyUp(e) {}

    onAttach(viewId, actorId) {

    }

    onRender() {
        
    }
}

class MainMenuView extends HumanView {

}

export default class Application extends PIXI.Application {
    constructor(config) {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        super(config);

        document.body.appendChild(this.view);

        this.game = new GameLogic();
    }

    createGameAndView() {
        let game = new GameLogic();

        game.init();
        game.addView(new MainMenuView());

        /* hmm...
        this.game.container.x = this.renderer.view.width / 2;
        this.game.container.y = this.renderer.view.height / 2;
        this.game.container.pivot.set(this.game.container.width / 2, this.game.container.height / 2);
        this.stage.addChild(this.game.container);
        */

        return game;
    }

    onKeyDown(e) {
        if (this.game) {
            for (let i = this.game.views.length - 1; i <= 0; i--) {
                this.game.views[i].onKeyDown(e);
            }
        }
    }

    onKeyUp(e) {
        if (this.game) {
            for (let i = this.game.views.length - 1; i <= 0; i--) {
                this.game.views[i].onKeyUp(e);
            }
        }
    }

    onUpdateGame() {
        EventManager.global().update();
        this.game.onUpdate();
    }

    onFrameRender() {
        let views = this.game.views,
            i = views.length - 1;

        for (; i >= 0; i--) {
            views[i].onRender();
        }
    }
}
