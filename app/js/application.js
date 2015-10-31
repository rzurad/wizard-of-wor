// WizardApplication Class
// -----------------------

// Application class that encapsulates all of the logic and rendering of the
// Wizard of Wor game.
import WizardLogic from 'logic';
import MainMenuView from 'views/main-menu';
import detector from 'utils/detector';
import defaultOptions from 'default-options';

let WizardApplication;

WizardApplication = Ember.Object.extend({
    // Properties
    // ----------

    // **(Boolean)** `isRunning` - tells us if the application has been initialized
    isRunning: false,

    // **(Number)** `height` - height (pixels) of the viewport
    height: 0,

    // **(Number)** `width` - width (pixels) of the viewport
    width: 0,

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
    // graphics settings, network settings, etc. Defaults to the [default option values](default-options.html)
    options: defaultOptions,

    /*
     * at some point, you need to make sure that save games can be loaded and created
    loadGame: function () {
        Ember.Logger.warn('`loadGame` not implemented!');
    },
    */



    // Initialization
    // --------------
    init() {
        // Make sure that the browser environment has all of the required features
        // using the [detector](detector.html) utility
        Ember.Logger.assert(detector.isEnvSane, 'Browser environment is not sane');

        /* RegisterEngineEvents */
        /* VRegisterGameEvents */
        /* initialize the resource cache */
        /* m_ResCache->Init()
         *  m_ResCache->RegisterLoader(CreateWAVResourceLoader())
         *  m_ResCache->RegisterLoader(CreateOGGResourceLoader())
         *  m_ResCache->RegisterLoader(CreateDDSResourceLoader())
         */

        // Load the string table
        this.loadStringTable();

        /* create script manager (almost certainly not going to be needed. JS is the game's scripting lang) */
        /* create the event manager */

        // Create the renderer. Try for WebGL, but fallback to Canvas (if the environment
        // does not at least support Canvas, the detector.isEnvSane assertion would have failed).
        let renderer;

        if (detector.WebGL && this.get('options.renderer') === 'WebGL') {
            renderer = new THREE.WebGLRenderer({ antialias: this.get('options.antialias') });
        } else {
            renderer = new THREE.CanvasRenderer();
        }

        // set the screen size
        renderer.setSize(this.get('width'), this.get('height'));

        // Create the main viewport DOM Element
        this.set('$viewport', Ember.$(this.get('viewportSelector')));
        this.set('renderer', renderer);

        // Create the game and the initial view.
        this.createGameAndView();

        /* load all the resources (we can probably get by with loading all of them, 
         * since wizard is a simple game with not many resources. If this was Consensus,
         * we'd need to preload only the things we care about and intelligently load
         * other resources as we need them */

        this.set('isRunning', true);
    },



    // Methods
    // -------

    // `loadStringTable` - reads the application's `language` setting and loads the appropriate
    // string table.
    loadStringTable() {
        // The request for the string table currently is syncronous because it is part of
        // the initialization routine and I don't want to make it asynchronous with an
        // `isInitialized` flag or state yet.
        let request = new XMLHttpRequest();

        request.open('GET', 'assets/strings/' + this.get('options.language') + '.json', false);
        request.send(null);

        Ember.Logger.assert(request.status === 200, 'Failed to load string table!');

        this.set('stringTable', JSON.parse(request.responseText));
    },



    // `getString`- extracts a given string from the currently loaded string table based on id,
    getString(id) {
        Ember.Logger.assert(this.get('stringTable'), 'Cannot get string. String table is not initialized!');

        let string = this.get('stringTable')[id];

        Ember.Logger.assert(string, 'String with id "' + id + '" not found in string table!');

        return string;
    },


    // `createGameAndView` - function that initializes the WizardLogic and creates
    // the default MainMenu view
    createGameAndView() {
        let game = WizardLogic.create(),
            view = MainMenuView.create({
                game: game
            });

        game.addView(view);

        this.set('game', game);

        return game;
    },



    // Observers
    // ---------

    // `onUpdate` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the 
    // `deltaTime` since the last frame was executed.
    onUpdate(elapsedTime, deltaTime) {
        let game = this.get('game');

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

        // The game logic is initialized, so call the `onUpdate` callback
        if (game instanceof WizardLogic) {
            /* let the event manager process for 20 milliseconds */
            /* socket code I don't understand yet */
            game.onUpdate(elapsedTime, deltaTime);
        }
    },



    /* handler for doing game app shutdown logic. This usually involves destroying
     * systems in the reverse order that they were initialized
    onClose: function () {

    },
    */



    // `onRender` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the
    // `deltaTime` since the last frame was executed.
    onRender(elapsedTime, deltaTime) {
        // Call the WizardGameLogic `onRender` callback
        this.get('game').onRender(elapsedTime, deltaTime);
        /* this.get('game').renderDiagnostics(); */
    }
});

export default WizardApplication;
