import ProcessManager from 'processing/process-manager';

function WizardGame() {
    this.views = [];
    this.processManager = new ProcessManager();
    // this.random = new RNG();
}

WizardGame.prototype = {
    constructor: WizardGame,

    addView: function (view) {
        this.views.push(view);
    },

    onUpdate: function (elapsedTime, deltaTime) {
        this.processManager.updateProcesses(deltaTime);

        // TODO: Can a view be destroyed as a result of an `onUpdate` call?
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

    loadGame: function (name) {
        return true;
    },

    destroy: function () {
        this.sprocessManager.deleteAllProcesses();
    }
};

export default WizardGame;
