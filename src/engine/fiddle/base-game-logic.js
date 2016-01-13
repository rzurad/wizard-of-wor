import ProcessManager from '../processing/process-manager';

class LevelManager {
    constructor() {
        this._levels = [];
    }

    initialize(levels) {
        this._levels = levels;
    }
}

export default class BaseGameLogic {
    constructor() {
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

        this.levelManager.initialize(/* globalApp.resCache.match('world\\*.xml') */);
        this.registerEngineScriptEvents();
    }

    init() {
        this.actorFactory = this.createActorFactory();
        this.pathingGraph.reset(this.createPathingGraph());

        eventManager.addListener(makeDelegate(this, this.requestDestroyActorDelegate), RequestDestroyActorEvent);

        return true;
    }

    createActorFactory() {
        return new ActorFactory();
    }

    addView(view, actorId = INVALID_ACTOR_ID) {
        console.error('`baseGameLogic.addView` must be implemented by subclass!');
    }
}
