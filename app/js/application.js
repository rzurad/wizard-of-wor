// WizardApplication Class
// -----------------------

// Application class that encapsulates all of the logic of the Wizard of Wor
// game.
import WizardLogic from 'logic';
import MainMenuView from 'views/main-menu';
import detector from 'utils/detector';
import config from 'default-config';

var WizardApplication;

WizardApplication = Ember.Object.extend({
    // Properties
    // ----------

    // **(Boolean)** `isRunning` - tells us if the application has been initialized
    isRunning: false,

    // **(Number)** `viewportHeight` - height (pixels) of the viewport
    viewportHeight: 0,

    // **(Number)** `viewportWidth` - width (pixels) of the viewport
    viewportWidth: 0,

    // **(String)** `language` - the language of the string table that the game is using.
    // This property is observed by `onLanguageChange`, which will reload the string
    // table with the appropriate language, if it is available
    language: 'en',

    // **(String)** `viewportSelector` - the CSS selector of the element that will be
    // the viewport for the application
    viewportSelector: 'body',

    // **(jQueryElement)** `$viewport` - jQuery wrapped DOM element that is the application viewport
    $viewport: null,

    // **(Object)** `stringTable` - Object which maps all strings/text displayed throughout the game
    stringTable: null,

    // **([WizardLogic](logic.html))** `game` - WizardLogic object. Responsible for
    // everything that is not render-related.
    game: null,

    // **(WebGLRenderer)** `renderer` - The THREE.js WebGLRenderer object
    renderer: null,

    // **(Object)** `options` - Game options for the application, such as sound settings,
    // graphics settings, network settings, etc. Defaults to the [default config](config.html)
    options: config,

    /*
    loadGame: function () {
        Ember.Logger.warn('`loadGame` not implemented!');
    },
    */

    // Initialization
    // --------------
    init: function () {
        var renderer;

        /* make sure the browser can handle the game */
        Ember.Logger.assert(detector.isEnvSane, 'Browser environment is not sane');

        /* RegisterEngineEvents */
        /* VRegisterGameEvents */
        /* initialize the resource cache */

        /* load the string table */
        this.loadStringTable();

        /* create the event manager */

        /* create the window, set the screen size, create the renderer */
        renderer = new THREE.WebGLRenderer({ antialias: this.get('options.antialias') });
        renderer.setSize(this.get('options.width'), this.get('options.height'));

        this.set('viewport', document.querySelector(this.get('viewportSelector')));
        this.set('renderer', renderer);

        /* create the game and initial view */
        this.createGameAndView();

        /* load all the resources */

        this.set('isRunning', true);
    },

    // Methods
    // -------

    // `loadStringTable` - reads the application's `language` property and loads the appropriate
    // string table.
    loadStringTable: function () {

    },

    // `createGameAndView` - function that initializes the WizardLogic and creates
    // the default MainMenu view
    createGameAndView: function () {
        var game = WizardLogic.create(),
            view = MainMenuView.create({
                game: game
            });

        game.addView(view);

        this.set('game', game);

        return game;
    },

    // Observers
    // ---------

    // `onLanguageChange` - observer function called whenever the `language` property changes.
    // Responsible for loading the string table for the newly selected language
    onLanguageChange: function () {
        this.loadStringTable();
    }.observes('language'),

    // `onUpdate` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the 
    // `deltaTime` since the last frame was executed.
    onUpdate: function (elapsedTime, deltaTime) {
        /* prevent the game from updating if need be (modal dialogs and such...) */
        if (!this.isRunning) {
            return;
        }

        /* quit application if isQuitting */
        /*
        if (this.isQuitting) {
            return;
        }
        */

        /* if the application is initialized (there is a WizardLogic object on the `game` property */
            /* let the event manager process for 20 milliseconds */
            /* socket code I don't understand yet */
            this.get('game').onUpdate(elapsedTime, deltaTime);
    },

    // `onRender` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the
    // `deltaTime` since the last frame was executed.
    onRender: function (elapsedTime, deltaTime) {
        // Call the WizardGameLogic `onRender` callback
        this.get('game').onRender(elapsedTime, deltaTime);
        /* this.get('game').renderDiagnostics(); */
    }
});

export default WizardApplication;
