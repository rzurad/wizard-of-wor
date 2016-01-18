import ProcessManager from '../processing/process-manager';
import ActorFactory from '../actors/actor-factory';
import { INVALID_ACTOR_ID } from '../actors/actor';
import eventFactory from '../event-manager/event-factory';
import { eventManager } from '../event-manager/event-manager';
import * as events from '../event-manager/events';
import { PhysCollisionEvent } from '../physics/physics-event-listener';
import PathingGraph from '../ai/pathing-graph';

class LevelManager {
    constructor() {
        this._levels = [];
    }

    initialize(levels) {
        console.warn('`levelManager.initialize` method not implemented!');
        this._levels = levels;
    }
}

let viewIdCounter = 0;

export const BASE_GAME_STATE = {
    INVALID: 'invalid',
    INITIALIZING: 'initializing',
    MAIN_MENU: 'main_menu',
    WAITING_FOR_PLAYERS: 'waiting_for_players',
    LOADING_GAME_ENVIRONMENT: 'loading_game_environment',
    WAITING_FOR_PLAYERS_TO_LOAD_ENVIRONMENT: 'waiting_for_players_to_load_environment',
    SPAWNING_PLAYERS_ACTORS: 'spawning_players_actors',
    RUNNING: 'running'
};

export default class BaseGameLogic {
    constructor() {
        this._gameViews = [];

        this._lastActorId = 0;
        this._lifetime = 0;
        this._processManager = new ProcessManager();
        this._random = new Math.seedrandom();
        this._state = BASE_GAME_STATE.INITIALIZING;
        this._proxy = false;
        this._renderDiagnostics = false;
        this._expectedPlayers = 0;
        this._expectedRemotePlayers = 0;
        this._expectedAI = 0;
        this._humanPlayersAttached = 0;
        this._AIPlayersAttached = 0;
        this._humanGamesLoaded = 0;
        this._pathingGraph = null;
        this._actorFactory = null;
        this._actors = {};
        this._physics = null;
        this._levelManager = new LevelManager();

        console.warn('`BaseGameLogic` constructor needs the resource cache to load XML!');

        this._levelManager.initialize(/* globalApp.resCache.match('world\\*.xml') */);
        this.registerEngineScriptEvents();
    }

    registerEngineScriptEvents() {
        [
            events.RequestDestroyActorEvent,
            events.PlaySoundEvent,
            PhysCollisionEvent
        ].forEach(function (constructor) {
            eventFactory.register(constructor, constructor.eventType);
        });
    }

    init() {
        this.actorFactory = this._createActorFactory();
        this.pathingGraph = this.createPathingGraph();

        eventManager.addListener(events.RequestDestroyActorEvent, this.requestDestroyActorDelegate.bind(this));

        return true;
    }

    _createActorFactory() {
        return new ActorFactory();
    }

    createPathingGraph() {
        return new PathingGraph();
    }

    destroyActor(actorId) {
        console.warn('`baseGameLogic.destroyActor` method not implemented!');
    }

    addView(view, actorId = INVALID_ACTOR_ID) {
        let viewId = ++viewIdCounter;

        this._gameViews.unshift(view);

        view.onAttach(viewId, actorId);
        view.onRestore();
    }

    renderDiagnostics() {
        if (this._renderDiagnostics) {
            this._physics.renderDiagnostics();
        }
    }

    requestDestroyActorDelegate(e) {
        this.destroyActor(e.actorId);
    }

    onUpdate(time, elapsedTime) {
        let deltaMilliseconds = elapsedTime * 1000;

        this._lifetime += elapsedTime;

        switch (this._state) {
            case BASE_GAME_STATE.INITIALIZING:
                this.changeState(BASE_GAME_STATE.MAIN_MENU);

                break;
            case BASE_GAME_STATE.MAIN_MENU:
            case BASE_GAME_STATE.LOADING_GAME_ENVIRONMENT:
                break;
            case BASE_GAME_STATE.WAITING_FOR_PLAYERS_TO_LOAD_ENVIRONMENT:
                if (this._expectedPlayers + this._expectedRemotePlayers <= this._humanGamesLoaded) {
                    this.changeState(BASE_GAME_STATE.SPAWNING_PLAYERS_ACTORS);
                }

                break;
            case BASE_GAME_STATE.SPAWNING_PLAYERS_ACTORS:
                this.changeState(BASE_GAME_STATE.RUNNING);

                break;
            case BASE_GAME_STATE.WAITING_FOR_PLAYERS:
                if (this._expectedPlayers + this._expectedRemotePlayers === this._humanPlayersAttached) {
                    console.error(
                        'the base game logic needs to get the game options, which live on the app!',
                        'https://github.com/rzurad/gamecode4/blob/master/Source/GCC4/GameCode4/BaseGameLogic.cpp#L357'
                    );
                }

                break;

            case BASE_GAME_STATE.RUNNING:
                this._processManager.updateProcesses(deltaMilliseconds);

                if (this._physics && !this._proxy) {
                    this._physics.onUpdate(elapsedTime);
                    this._physics.syncVisibleScene();
                }

                break;
            default:
                console.error('`BaseGameLogic.onUpdate`: unrecognized state!', this._state);
        }

        for (let i = this._gameViews.length - 1; i >= 0; i--) {
            this._gameViews[i].onUpdate(deltaMilliseconds);
        }

        Object.keys(this._actors).forEach((key) => {
            this._actors[key].update(deltaMilliseconds);
        });
    }

    changeState(newState) {
        if (newState === BASE_GAME_STATE.WAITING_FOR_PLAYERS) {
            console.warn('`BaseGameLogic.changeState` is not set up to handle WAITING_FOR_PLAYERS');
        } else if (newState === BASE_GAME_STATE.LOADING_GAME_ENVIRONMENT) {
            console.warn('`BaseGameLogic.changeState` is not set up to handle LOADING_GAME_ENVIRONMENT');
        }

        this._state = newState;
    }
}
