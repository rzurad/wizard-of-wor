// WizardApplication Class
// -----------------------

import WizardLogic from './logic';
import MainMenuView from './views/main-menu';
import detector from './utils/detector';
import defaultOptions from './default-options';

/* globals THREE, $ */

// Application class that encapsulates all of the logic and rendering of the
// Wizard of Wor game.
export default class WizardApplication {
    /*
     * at some point, you need to make sure that save games can be loaded and created
    loadGame() {
        console.warn('`loadGame` not implemented!');
    }
    */

    // Initialization
    // --------------
    constructor(width = 0, height = 0, viewportSelector = 'body', options = defaultOptions) {
        // Make sure that the browser environment has all of the required features
        // using the [detector](detector.html) utility
        console.assert(detector.isEnvSane, 'Browser environment is not sane');

        // Properties
        // ----------
        // **(Boolean)** `isRunning` - tells us if the application has been initialized
        this.isRunning = false;

        // TODO: why is height and width on the application object?
        // **(Number)** `height` - height (pixels) of the viewport
        this.height = height;

        // **(Number)** `width` - width (pixels) of the viewport
        this.width = width;

        // **(String)** `viewportSelector` - the CSS selector of the element that will be
        // the viewport for the application
        this.viewportSelector = viewportSelector;

        // **(Object)** `options` - Game options for the application, such as sound settings,
        // graphics settings, network settings, etc. Defaults to the [default option values](default-options.html)
        this.options = options;

        // "Private" properties
        // --------------------
        // **(Object)** `_stringTable` - Object which maps all strings/text displayed throughout the game
        // **([WizardLogic](logic.html))** `_game` - WizardLogic object. Responsible for
        // everything that is not render-related.
        // **(WebGLRenderer)** `_renderer` - The THREE.js WebGLRenderer object
        // **(jQueryElement)** `_$viewport` - jQuery wrapped DOM element that is the application viewport
    }


    // the windows analog of this is the message pump handler. really in our world, we'll just needed it
    // as the entry point for browser level events. due to the nature of windows, all the message translation
    // happens here. it might make more sense down the line for each view to be responsible for intercepting
    // browser events it cares about, but for now, lets mimic the GCC4 code as much as possible and refactor
    // it to be more browser-centric later
    msgProc(e) {
        // if e is from a mouse or keyboard event (input device)
            // TODO: if a view consumes a message, then that message should not get sent to any other view.
            // make sure this happens at some point. you know if a view completely consumed the event by
            // `onMsgProc` returning true
            this.game.gameViews.forEach(function (view) {
                view.onMsgProc(e);
            });
    }

    // Methods
    // -------
    init() {
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

        if (detector.webGL && this.options.renderer === 'WebGL') {
            renderer = new THREE.WebGLRenderer({ antialias: this.options.antialias });
        } else {
            renderer = new THREE.CanvasRenderer();
        }

        if (renderer) {
            // set the screen size
            renderer.setSize(this.width, this.height);

            // Create the main viewport DOM Element
            this.$viewport = $(this.viewportSelector);
            this.renderer = renderer;
        }

        // Create the game and the initial view.
        this.createGameAndView();

        /* load all the resources (we can probably get by with loading all of them, 
         * since wizard is a simple game with not many resources. If this was Consensus,
         * we'd need to preload only the things we care about and intelligently load
         * other resources as we need them */

        this.isRunning = true;
    }

    // `loadStringTable` - reads the application's `language` setting and loads the appropriate
    // string table.
    loadStringTable(language) {
        // The request for the string table currently is syncronous because it is part of
        // the initialization routine and I don't want to make it asynchronous with an
        // `isInitialized` flag or state yet.
        let request = new XMLHttpRequest();

        request.open('GET', `assets/strings/${language || this.options.language}.json`, false);
        request.send(null);

        console.assert(request.status === 200, 'Failed to load string table!');

        this.stringTable = JSON.parse(request.responseText);
    }



    // `getString`- extracts a given string from the currently loaded string table based on id,
    getString(id) {
        console.assert(this.stringTable, 'Cannot get string. String table is not initialized!');

        let string = this.stringTable[id];

        console.assert(string, `String with id "${id}" not found in string table!`);

        return string;
    }


    // `createGameAndView` - function that initializes the WizardLogic and creates
    // the default MainMenu view
    createGameAndView() {
        let game = new WizardLogic(this.options.seed),
            view = new MainMenuView(game);

        game.addView(view);

        this.game = game;

        return game;
    }



    // Observers
    // ---------

    // `onUpdate` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the 
    // `deltaTime` since the last frame was executed.
    onUpdate(elapsedTime, deltaTime) {
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
        let game = this.game;

        if (game && typeof game.onUpdate === 'function') {
            /* let the event manager process for 20 milliseconds */
            /* socket code I don't understand yet */
            game.onUpdate(elapsedTime, deltaTime);
        }
    }



    /* handler for doing game app shutdown logic. This usually involves destroying
     * systems in the reverse order that they were initialized
    onClose() {

    },
    */



    // `onRender` - callback function that is executed once every frame. When executed
    // it is given, in milliseconds, the total `elapsedTime` since page load, and the
    // `deltaTime` since the last frame was executed.
    onRender(elapsedTime, deltaTime) {
        // Call the WizardGameLogic `onRender` callback
        let game = this.game;

        if (game && typeof game.onRender === 'function') {
            game.onRender(elapsedTime, deltaTime);
            /* game.renderDiagnostics(); */
        }
    }
}
