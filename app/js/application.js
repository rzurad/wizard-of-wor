import WizardGame from 'game';
import MainMenuView from 'views/main-menu';

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
    stringTable: null,
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

    loadStringTable: function (lang) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'assets/strings/' + lang + '.json', false);
    },

    // getGameAppDirectory: function () { },
    init: function (viewportSelector, width, height) {
        // make sure the browser/env can handle the game
        // RegisterEngineEvents
        // VRegisterGameEvents
        // initialize the resource cache
        // load the string table
        this.loadStringTable('en'); // TODO: refactor arg to config or env

        // create the event manager
        // this.createEventManager();

        // create the window, set the screen size, create the renderer
        this.viewport = document.querySelector(viewportSelector);
        this.viewportWidth = width;
        this.viewportHeight = height;

        // create the game and initial view
        this.game = this.createGameAndView();

        // load all the resources

        // this.loadGame();

        this.isInitialized = true;
        this.isRunning = true;

        return this;
    },
    
    loadGame: function () {
        console.warn('`loadGame` not implemented!');
    },

    createGameAndView: function () {
        var game = new WizardGame(),
            view = new MainMenuView(game);

        game.addView(view);
        this.game = game;

        return game;
    },

    update: function (elapsedTime, deltaTime) {
        if (!this.isRunning) {
            return;
        }

        /*
        if (this.isQuitting) {
            return;
        }
        */

        this.game.onUpdate(elapsedTime, deltaTime);
    },

    render: function (elapsedTime, deltaTime) {
        this.game.onRender(elapsedTime, deltaTime);
        this.game.renderDiagnostics();
    }

    // msgProc: function (...) { }, // <-- omit, we don't have a message pump from the OS
    // ask: function (question) { }, // no fucking idea...
    // getString: function (key) { },
};

export default WizardGameApplication;
