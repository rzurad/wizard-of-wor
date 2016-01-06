import { GameOptions } from './game-options';
import eventFactory from '../event-manager/event-factory';
import eventManager from '../event-manager/event-manager';

import EnvironmentLoadedEvent from '../event-manager/events/environment-loaded-event';
import NewActorEvent from '../event-manager/events/new-actor-event';
import MoveActorEvent from '../event-manager/events/move-actor-event';
import DestroyActorEvent from '../event-manager/events/destroy-actor-event';
import RequestNewActorEvent from '../event-manager/events/request-new-actor-event';
import NetworkPlayerActorAssignmentEvent from '../event-manager/events/network-player-actor-assignment-event';

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
        [
            EnvironmentLoadedEvent,
            NewActorEvent,
            MoveActorEvent,
            DestroyActorEvent,
            RequestNewActorEvent,
            NetworkPlayerActorAssignmentEvent
        ].forEach(function (constructor) {
            eventFactory.register(constructor);
        });
    }

    registerGameEvents() {
        console.error('`registerGameEvents` must be implemented by a FiddleApplication subclass!');
    }

    loadStrings(language) {
        return new RSVP.Promise((resolve, reject) => {
            console.warn('`fiddleApplication.loadStrings` method not implemented!');

            resolve();
        });
    }

    initInstance(width, height) {
        console.warn('`fiddleApplication.initInstance` method not implemented!');

        // this is where you would normally check for things like:
        //  "Is there enough system ram to play this game?"
        //  "Is there enough storage space to play this game?"
        //  "Is the CPU powerful enough to play this game?"
        // but since we're in a browser and cant' tell such things, we'll settle for just leaving this comment
        // here saying this is where we would normally do this, but can't, so we wont.

        this._registerEngineEvents();
        this.registerGameEvents();

        //TODO: create resource loaders
        //TODO: register resource loaders

        return this.loadStrings('english').then(() => {
            //TODO: load the Lua State manager (or whatever instead because no lua)

            //TODO: load the preinit file

            //TODO: Register function exported from C++

            //TODO: I hate the fact that this is an instance export, essentially mimicing
            //the C++ global. I have no doubt that this can be turned into something significantly
            //more JavaScript friendly once I see how this thing is actually used throughout the
            //GCC4 architecture (like... why do they need a member variable and a global pointer?)
            this.eventManager = eventManager;

            //TODO: Create and setup the rendering context/window
        });
    }
}
