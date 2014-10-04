import WizardGame from 'wizard-game';
import WizardGameView from 'wizard-game-view';

var DEFAULT_CONFIG = {
    };

function WizardGameApplication(config) {
    var app = Object.create(WizardGameApplication.prototype);

    app.config = /* _.merge({}, DEFAULT_CONFIG, */ config || {} /* ) */;

    return app;
};

WizardGameApplication.prototype = {
    constructor: WizardGameApplication,

    isInitialized: false,
    isRunning: false,
    // quitRequested
    // isQuitting
    viewportHeight: 0,
    viewportWidth: 0,
    // colorDepth: 32,
    // stringTable: null,
    // hasModalDialog: false,
    // showModal: function (defaultAnswer) { },
    // pumpUntilMessage: function (...) {}, // <-- omit, we don't have a message pump from the OS
    // flashWhileMinimized: function () {}, // <-- omit, probably not needed
                                            //     (if so, is it possible to swap the favicon to attract attention?)

    // constructor: function () { },
    // getGameTitle: function () {
        // return 'The Incredible Wizard of Wor';
    // },

    // getGameAppDirectory: function () { },
    init: function () {
        // load the string table

        // check for appropriate resources

        // load the resource cache
        
        // create the window (DXUTInit and DXUTCreateWindow calls...)

        this.game = this.createGameAndView();

        // DXUTCreateDevice

        this.loadGame();

        this.isInitialized = true;
        // this.isRunning = true;

        return this;
    },

    // msgProc: function (...) { }, // <-- omit, we don't have a message pump from the OS
    // ask: function (question) { }, // no fucking idea...
    // getString: function (key) { },
    // resourceCache: null,
    game: null,
    
    createGameAndView: function () {
        var game = WizardGame(),
            view = WizardGameView(game);

        game.addView(view);
        this.game = game;

        return game;
    },

    loadGame: function () { },
};

export default WizardGameApplication;
