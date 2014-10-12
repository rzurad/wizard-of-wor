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
        this.processManager.updateProcesses(deltaTime);

        /* TODO: Can a view be destroyed as a result of an `onUpdate` call? */
        this.views.forEach(function (view) {
            view.onUpdate(elapsedTime, deltaTime);
        });
    },

    onRender: function (elapsedTime, deltaTime) {
        this.views.forEach(function (view) {
            view.onRender(elapsedTime, deltaTime);
        });
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
