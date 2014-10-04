function WizardGame() {
    var game = Object.create(WizardGame.prototype);

    game.views = [];

    return game;
}

WizardGame.prototype = {
    constructor: WizardGame,

    addView: function (view) {
        this.views.push(view);
    },

    update: function (elapsedTime, deltaTime) {
        console.warn('`WizardGame.update` not implemented!');
    },

    render: function (elapsedTime, deltaTime) {
        this.views.forEach(function (view) {
            view.render(elapsedTime, deltaTime);
        });
    }
};
export default WizardGame;
