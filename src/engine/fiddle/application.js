import { GameOptions } from './game-options';
import detector from '../utilities/detector';
import eventFactory from '../event-manager/event-factory';
import { eventManager } from '../event-manager/event-manager';
import * as events from '../event-manager/events';

export default class FiddleApplication {
    constructor() {
        this.game = null;
        this.options = new GameOptions();

        this.rcDesktop = { bottom: 0, left: 0, right: 0, top: 0 };
        this.screenSize = { width: 0, height: 0 };
        this.colorDepth = 32;
        this._viewportSelector = '#game';
        
        this.isRunning = false;
        this.isEditorRunning = false;

        this.renderer = null;
        this.eventManager = null;
        this.resCache = null;
        this._textResource = null;

        this.networkEventForwarder = null;
        this.baseSocketManager = null;

        this.quitRequested = false;
        this.quitting = false;
        this.hasModalDialog = 0;
    }

    getGameTitle() {
        if (!this._textResource) {
            throw new Error('String table has not been initialized!');
        }

        return this._textResource.TITLE;
    }

    onFrameRender(time, elapsedTime) {
        console.warn('`fiddleApplication.onFrameRender` method not implemented!');
    }

    onUpdateGame(time, elapsedTime) {
        console.log('========== Application.onUpdateGame ==========');

        if (this.hasModalDialog) {
            return;
        }

        if (this.quitting) {
            //TODO: example uses PostMessage to send a WM_CLOSE to the application, I'm assuming
            //so the quit logic will be handled by the message pump handlers. Until I know for sure...
            console.warn('`fiddleApplication.onUpdateGame` does not know what to do when `this.qutting` is true!');
        }

        if (this.game) {
            // tell the event manager to process for 20 ms
            eventManager.update(20);

            if (this.baseSocketManager) {
                // pause for 0 ms
                this.baseSocketManager.doSelect(0);
            }

            this.game.onUpdate(time, elapsedTime);
        }
    }

    _registerEngineEvents() {
        [
            events.EnvironmentLoadedEvent,
            events.NewActorEvent,
            events.MoveActorEvent,
            events.DestroyActorEvent,
            events.RequestNewActorEvent,
            events.NetworkPlayerActorAssignmentEvent
        ].forEach(function (constructor) {
            eventFactory.register(constructor, constructor.eventType);
        });
    }

    registerGameEvents() {
        console.error('`registerGameEvents` must be implemented by a FiddleApplication subclass!');
    }

    loadStrings(language) {
        return new RSVP.Promise((resolve, reject) => {
            let url = `./assets/strings/${language}.json`;

            $.getJSON(url).done((data) => {
                this._textResource = data;

                resolve();
            }).fail(function () {
                reject(`Failed to load string table! ${url}`);
            });
        });
    }

    initInstance(width, height) {
        console.warn('`fiddleApplication.initInstance` method not implemented!');

        this._registerEngineEvents();
        this.registerGameEvents();

        //TODO: create resource loaders
        //TODO: register resource loaders

        return this.loadStrings(this.options.language).then(() => {
            //TODO: load the Lua State manager (or whatever instead because no lua)
            //TODO: load the preinit file
            //TODO: Register function exported from C++

            //TODO: I hate the fact that this is an instance export, essentially mimicing
            //the C++ global. I have no doubt that this can be turned into something significantly
            //more JavaScript friendly once I see how this thing is actually used throughout the
            //GCC4 architecture (like... why do they need a member variable and a global pointer?)
            this.eventManager = eventManager;

            //TODO: Create and setup the rendering context/window
            $('title').text(this.getGameTitle());

            this.screenSize.width = this.width;
            this.screenSize.height = this.height;

            if (detector.WebGL && this.options.renderer === 'WebGL') {
                this.renderer = new THREE.WebGLRenderer({ antialias: this.options.antialias || false });
            } else {
                this.renderer = new THREE.CanvasRenderer();
            }

            if (this.renderer) {
                this.renderer.setSize(this.width, this.height);
                this._$viewport = $(this.viewportSelector);
            }

            this.game = this.createGameAndView();

            //TODO: Preload files (*.ogg, *.dds, *.jpg, *sdkmesh)
            //TODO: CheckForJoystick

            this.isRunning = true;
        });
    }
}
