import { GameOptions } from './game-options';
import eventFactory from '../event-manager/event-factory';

import EnvironmentLoadedEvent from '../event-manager/environment-loaded-event';
import NewActorEvent from '../event-manager/new-actor-event';
import MoveActorEvent from '../event-manager/move-actor-event';
import DestroyActorEvent from '../event-manager/destroy-actor-event';
import RequestNewActorEvent from '../event-manager/request-new-actor-event';
import NetworkPlayerActorAssignmentEvent from '../event-manager/network-player-actor-assignment-event';

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

        console.log(eventFactory);
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

        //TODO: create resource loaders
        //TODO: register resource loaders

        //TODO: load string table
        //TODO: load the Lua State manager (or whatever instead because no lua

        //TODO: load the preinit file

        //TODO: Register function exported from C++

        //TODO: Create the event manager

        //TODO: Create and setup the rendering context/window
        console.warn('`fiddleApplication.initInstance` method not implemented!');

        return true;
    }
}
