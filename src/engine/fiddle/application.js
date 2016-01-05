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

    //TODO: In C++, this is a static function!
    onUpdateGame(time, elapsedTime) {
        console.warn('`fiddleApplication.onUpdateGame` method not implemented!');
    }

    _registerEngineEvents() {
        // g_eventFactory.Register<EvtData_Environment_Loaded>(EvtData_Environment_Loaded::sk_EventType)

        // EvtData_Environment_Loaded
        // EvtData_New_Actor
        // EvtData_Move_Actor
        // EvtData_Destroy_Actor
        // EvtData_Request_New_Actor
        // EvtData_Network_Player_Actor_Assignment

        console.warn('`fiddleApplication._registerEngineEvents` method not implemented!');
    }

    registerGameEvents() {
        console.error('`registerGameEvents` must be implemented by a FiddleApplication subclass!');
    }

    initInstance(width, height) {
        // this is where you would normally check for things like:
        //  "Is there enough system ram to play this game?"
        //  "Is there enough storage space to play this game?"
        //  "Is the CPU powerful enough to play this game?"
        // but since we're in a browser and cant' tell such things, we'll settle for just leaving this comment
        // here saying this is where we would normally do this, but can't, so we wont.

        this._registerEngineEvents();
        this.registerGameEvents();

        console.warn('`fiddleApplication.initInstance` method not implemented!');

        return true;
    }
}
