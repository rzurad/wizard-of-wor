import ProcessManager from 'processing/process-manager';

export default class WizardLogic {
    /*
    state: function () {
        return this.get('stateManager.currentState.name');
    }.property('stateManager.currentState.name'),
    */

    constructor() {
        this.elapsedTime = 0;
        this.views = [];
        this.processManager = new ProcessManager();

        // Initialize the random number generator
        this.random = new Math.seedrandom(this.options.seed);

        /*
        // Create the [state machine](https://github.com/emberjs/ember-states/blob/master/packages/ember-states/lib/state_manager.js#L238) for the game logic
        this.stateManager = Ember.StateManager.create({
            // Set the logic object to the "initializing" state
            initialState: 'initializing',

            initializing: Ember.State.create(),
            mainMenu: Ember.State.create(),
            loadingGameEnvironment: Ember.State.create(),
            waitingForPlayersToLoadEnvironments: Ember.State.create(),
            spawnPlayersActors: Ember.State.create(),
            waitingForPlayers: Ember.State.create(),
            running: Ember.State.create()
        }));
        */

        /* create the level manager */
        /* initialize the level manager */
        /* RegisterEngineScriptEvents */
        /* create game physics */
        /* RegisterAllDelegates */
        /* create actor factory */
        /* create pathing graph */
        /* add event listener for requestDestroyActor event */
    }

    addView(view/*, actorId */) {
        /* generate a new viewId and assign it to view */
        this.views.push(view);

        view.onAttach(/* viewId, actorId */);
        view.onRestore();
    }

    onUpdate(elapsedTime, deltaTime) {
        var stateManager = this.stateManager;

        // Update the `elapsedTime`.
        this.elapsedTime = elapsedTime;
        
        // Every frame, we want to make sure that if we are in a place
        // that requires a state change, we go ahead and make that state change.
        switch (this.state) {
            case 'initializing':
                // Since initialization is synchronous, we should never actually get to the
                // `onUpdate` call every frame if the game logic was not done initializing. This
                // means we want to transition to the default state: the `"mainMenu"` state
                stateManager.transitionTo('mainMenu');
                break;

            // If we are in a frame callback and we are in either the `"mainMenu"` state or
            // the `"loadingGameEnvironment"` state, don't do anything, because transitions
            // out of those states depend on logic done by other functions.
            case 'mainMenu':
            case 'loadingGameEnvironment':
                break;

            /* if WaitingForPlayersToLoadEnvironments, do nothing unless
             *      all players have loaded, in which case SpawnPlayersActors */
            case 'waitingForPlayersToLoadEnvironments':
                console.error('"watingForPlayersToLoadEnvironments" state not handled!');
                break;

            // Similarly, processing that needs to happen when in the `"spawnPlayersActors"`
            // state should be happening within one Frame, so if we're in the `"spawnPlayersActors"`
            // state, assume we don't need to be in it anymore and switch to the `"running"` state.
            case 'spawnPlayersActors':
                stateManager.transitionTo('running');
                break;

            /* if WaitingForPlayers state, check if all players are attached and that
             *      we have a level to load from the server, if so, switch to LoadingGameEnvironment */
            case 'waitingForPlayers':
                console.error('"waitingForPlayers" state not handled!');
                break;

            // The game is running, so do fire off all of the processing that needs to happen
            // every frame (updating processes, updating the physics system, etc)
            case 'running':
                this.processManager.updateProcesses(deltaTime);

                /* update the physics system */

                break;

            default:
                console.assert(false, 'Unknown state!');
        }

        this.views.forEach(function (view) {
            view.onUpdate(elapsedTime, deltaTime);
        });

        /* update all of the actors */
    }

    onRender(elapsedTime, deltaTime) {
        this.views.forEach(function (view) {
            view.onRender(elapsedTime, deltaTime);
        });

        this.renderDiagnostics();
    }

    renderDiagnostics() { }

    /*
    loadGame: function (name) {
        return true;
    },
    */

    destroy() {
        this.processManager.deleteAllProcesses();
    }
}
