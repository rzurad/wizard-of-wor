function WizardGame() {
    return Object.create(WizardGame.prototype);
}

WizardGame.prototype = {
    constructor: WizardGame,

    addView: function (view) {
        console.warn('`WizardGame.addView` not implemented!');
    }
};
export default WizardGame;
