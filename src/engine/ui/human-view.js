import ProcessManager from '../processing/process-manager';
import { INVALID_GAME_VIEW_ID } from '../fiddle/game-view';
import { INVALID_ACTOR_ID } from '../actors/actor';
import { BASE_GAME_STATE } from '../fiddle/base-game-logic';
import { PlaySoundEvent } from '../event-manager/events';
import { eventManager } from '../event-manager/event-manager';

export default class HumanView {
    constructor(renderer) {
        this._actorId = INVALID_ACTOR_ID;
        this._viewId = INVALID_GAME_VIEW_ID;

        this.initAudio();

        this._processManager = new ProcessManager();
        this.pointerRadius = 1;

        this._registerAllDelegates();

        this._baseGameState = BASE_GAME_STATE.INITIALIZING;
        this.screenElements = [];

        if (renderer) {
            this.scene = new ScreenElementScene(renderer);
            this.camera = new CameraNode(/* Identity Matrix, Frustum */);

            this.scene.addChild(INVALID_ACTOR_ID, this.camera);
            this.scene.setCamera(this.camera);
        }
    }

    _registerAllDelegates() {
        eventManager.addListener(this.onPlaySound, PlaySoundEvent.eventType);
    }

    initAudio() {
        //TODO: check if HTML5 audio is enabled
        //this.audio = <the audio abstraction objection>
        console.warn('`HumanView.initAudio` method not implemented!');
    }

    onPlaySound(e) {
        console.warn('`HumanView.onPlaySound` method not implemented!');
    }

    onAttach(viewId, actorId) {
        this._actorId = actorId;
        this._viewId = viewId;
    }

    onRestore() {
        this.screenElements.forEach(function (screen) {
            screen.onRestore();
        });
    }

    onUpdate(deltaMs) {
        this._processManager.updateProcesses(deltaMs);

        this.screenElements.forEach(function (screen) {
            screen.onUpdate(deltaMs);
        });
    }

    onRender(time, elapsedTime) {
        console.warn('`HumanView.onRender` method not implemented!');
    }

    pushElement(element) {
        this.screenElements.push(element);
    }

    removeElement(element) {
        this.screenElements.splice(this.screenElements.indexOf(element), 1);
    }
}
