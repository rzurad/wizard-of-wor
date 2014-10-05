import WizardGame from 'wizard-game';
import WizardGameView from 'wizard-game-view';

var DEFAULT_CONFIG = {
    };

function WizardGameApplication(config) {
    this.config = /* _.merge({}, DEFAULT_CONFIG, */ config || {} /* ) */;
};

WizardGameApplication.prototype = {
    constructor: WizardGameApplication,

    isInitialized: false,
    isRunning: false,
    // quitRequested
    // isQuitting
    viewportHeight: 0,
    viewportWidth: 0,
    viewport: null,

    // colorDepth: 32,
    // stringTable: null,
    // hasModalDialog: false,
    // resourceCache: null,
    game: null,

    // showModal: function (defaultAnswer) { },
    // pumpUntilMessage: function (...) {}, // <-- omit, we don't have a message pump from the OS
    // flashWhileMinimized: function () {}, // <-- omit, probably not needed
                                            //     (if so, is it possible to swap the favicon to attract attention?)
    // getGameTitle: function () {
        // return 'The Incredible Wizard of Wor';
    // },

    // getGameAppDirectory: function () { },
    init: function (viewportSelector, width, height) {
        // load the string table

        // check for appropriate resources

        // load the resource cache
        
        // create the window (DXUTInit and DXUTCreateWindow calls...)
        this.viewport = document.querySelector(viewportSelector);
        this.viewportWidth = width;
        this.viewportHeight = height;

        this.game = this.createGameAndView();

        // DXUTCreateDevice

        this.loadGame();

        this.isInitialized = true;
        // this.isRunning = true;

        return this;
    },
    
    loadGame: function () {
        console.warn('`loadGame` not implemented!');
    },

    createGameAndView: function () {
        var game = new WizardGame(),
            view = new WizardGameView(game);

        game.addView(view);
        this.game = game;

        return game;
    },

    updateGame: function (elapsedTime, deltaTime) {
        if (!this.isRunning) {
            return;
        }

        /*
        if (this.isQuitting) {
            return;
        }
        */

        this.game.update(elapsedTime, deltaTime);
    },

    render: function (elapsedTime, deltaTime) {
        this.game.render(elapsedTime, deltaTime);
        // this.game.renderDiagnostics();
    }

    // msgProc: function (...) { }, // <-- omit, we don't have a message pump from the OS
    // ask: function (question) { }, // no fucking idea...
    // getString: function (key) { },
};

export default WizardGameApplication;
