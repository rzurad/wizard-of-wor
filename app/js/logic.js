import ProcessManager from 'processing/process-manager';

var WizardLogic;

WizardLogic = Ember.Object.extend({
    init: function () {
        this.set('views', []);
        this.set('processManager', ProcessManager.create());

        /* init random number generator */
        /* set to initializing state */
        /* create the level manager */
        /* initialize the level manager */
        /* RegisterEngineScriptEvents */
        /* create game physics */
        /* RegisterAllDelegates */
        /* create actor factory */
        /* create pathing graph */
        /* add event listener for requestDestroyActor event */
    },

    addView: function (view) {
        this.get('views').push(view);

        view.onAttach();
        view.onRestore();
    },

    onUpdate: function (elapsedTime, deltaTime) {
        /* update game elapsedTime */
        /* check the wizardlogic state */
            /* if Initializing, change to MainMenu state */
            /* if MainMenu or LoadingGameEnvironment, do nothing */
            /* if WaitingForPlayersToLoadEnvironments, do nothing unless
             *      all players have loaded, in which case SpawnPlayersActors */
            /* if SpawnPlayersActors state, switch to Running */
            /* if WaitingForPlayers state, check if all players are attached and that
             *      we have a level to load from the server, if so, switch to LoadingGameEnvironment */
            /* if Running, */
                this.get('processManager').updateProcesses(deltaTime);
                /* update the physics system */

        /* TODO: this is not a safe iteration */
        this.views.forEach(function (view) {
            view.onUpdate(elapsedTime, deltaTime);
        });

        /* update all of the actors */
    },

    onRender: function (elapsedTime, deltaTime) {
        this.views.forEach(function (view) {
            view.onRender(elapsedTime, deltaTime);
        });

        this.renderDiagnostics();
    },

    renderDiagnostics: function () { },

    /*
    loadGame: function (name) {
        return true;
    },
    */

    destroy: function () {
        this.get('processManager').deleteAllProcesses();
    }
});

export default WizardLogic;
