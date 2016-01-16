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
    INVALID: 0,
    INITIALIZING: 1,
    MAIN_MENU: 2,
    WAITING_FOR_PLAYERS: 3,
    LOADING_GAME_ENVIRONMENT: 4,
    WAITING_FOR_PLAYERS_TO_LOAD_ENVIRONMENT: 5,
    SPAWNING_PLAYERS_ACTORS: 6,
    RUNNING: 7
};

export default class BaseGameLogic {
    constructor() {
        this._gameViews = [];

        this.lastActorId = 0;
        this.lifetime = 0;
        this.processManager = new ProcessManager();
        this.random = new Math.seedrandom();
        this.proxy = false;
        this.renderDiagnostics = false;
        this.expectedPlayers = 0;
        this.expectedRemotePlayers = 0;
        this.expectedAI = 0;
        this.humanPlayersAttached = 0;
        this.AIPlayersAttached = 0;
        this.humanGamesLoaded = 0;
        this.pathingGraph = null;
        this.actorFactory = null;
        this.levelManager = new LevelManager();

        console.warn('`BaseGameLogic` constructor needs the resource cache to load XML!');

        this.levelManager.initialize(/* globalApp.resCache.match('world\\*.xml') */);
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
        this.actorFactory = this.createActorFactory();
        this.pathingGraph = this.createPathingGraph();

        eventManager.addListener(events.RequestDestroyActorEvent, this.requestDestroyActorDelegate.bind(this));

        return true;
    }

    createActorFactory() {
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

        this._gameViews.push(view);

        view.onAttach(viewId, actorId);
        view.onRestore();
    }

    requestDestroyActorDelegate(e) {
        this.destroyActor(e.actorId);
    }
}
