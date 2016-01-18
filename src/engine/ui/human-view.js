import ProcessManager from '../processing/process-manager';
import { INVALID_GAME_VIEW_ID } from '../fiddle/game-view';
import { INVALID_ACTOR_ID } from '../actors/actor';
import { BASE_GAME_STATE } from '../fiddle/base-game-logic';

export default class HumanView {
    constructor(renderer) {
        this._actorId = INVALID_ACTOR_ID;
        this._viewId = INVALID_GAME_VIEW_ID;

        this.initAudio();

        this._processManager = new ProcessManager();
        this.pointerRadius = 1;

        this._registerAllDelegates();

        this._baseGameState = BASE_GAME_STATE.INITIALIZING;

        if (renderer) {
            this.scene = new ScreenElementScene(renderer);
            this.camera = new CameraNode(/* Identity Matrix, Frustum */);

            this.scene.addChild(INVALID_ACTOR_ID, this.camera);
            this.scene.setCamera(this.camera);
        }
    }

    _registerAllDelegates() {
        console.warn('`HumanView._registerAllDelegates` method not implemented!');
    }

    initAudio() {
        //TODO: check if HTML5 audio is enabled
        //this.audio = <the audio abstraction objection>
        console.warn('`HumanView.initAudio` method not implemented!');
    }

    onAttach(viewId, actorId) {
        this._actorId = actorId;
        this._viewId = viewId;
    }

    onRestore() {
        console.warn('`HumanView.onRestore` method not implemented!');
    }

    onUpdate(deltaMs) {
        console.warn('`HumanView.onUpdate` method not implemented!');
    }

    onRender(time, elapsedTime) {
        console.warn('`HumanView.onRender` method not implemented!');
    }

    pushElement(element) {
        console.warn('`HumanView.pushElement` method not implemented!');
    }
}
