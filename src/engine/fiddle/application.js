import { GameOptions } from '../mainloop/initialization';

export default class FiddleApplication {
    constructor() {
        this.game = null;
        this.options = new GameOptions();

        this.rcDesktop = { bottom: 0, left: 0, right: 0, top: 0 };
        this.screenSize = { width: 0, height: 0 };
        this.colorDepth = 32;
        
        this.isRunning = false;
        this.isEditorRunning = false;

        this.eventManager = null;
        this.resCache = null;

        this.networkEventForwarder = null;
        this.baseSocketManager = null;

        this.quitRequested = false;
        this.quitting = false;
        this.hasModalDialog = 0;
    }

    onUpdateGame(time, elapsedTime) {
        console.warn('`fiddleApplication.onUpdateGame` method not implemented!');
    }

    initInstance(width, height) {
        console.warn('`fiddleApplication.initInstance` method not implemented!');

        return true;
    }
}
