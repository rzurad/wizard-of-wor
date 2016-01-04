// The Incredible Wizard of Wor
// ----------------------------

//  - [processing/ProcessManager](process-manager.html)
//  - [processing/Process](process.html)
//  - [utils/Detector](detector.html)
//  - [utils/QueryString](querystring.html)
//  - [views/HumanView](human.html)
//  - [views/MainMenuView](main-menu.html)
//  - [Default Options](default-config.html)
//  - [Dungeons](dungeons.html)
//  - [Index](index.html)
//  - [WizardApplication](application.html)
//  - [WizardLogic](logic.html)

// Welcome to an open-source Web Browser clone of the 1981 Midway Games title
// "Wizard of Wor" for the [Bally Astrocade](http://en.wikipedia.org/wiki/Bally_Astrocade).
// The goal of the project is to completely
// recreate as closely as possible the experience of playing the original title.

// The index.js file is where it all begins.
// This is the entry point for the application. This is where everything is
// bootstraped together and kicked off.
import WizardApplication from './application';
import defaultOptions from './default-options';
import detector from './utils/detector';
import parseQueryString from './utils/querystring';

/* globals THREE, RSVP, Stats, $ */

// Before we do anything, we want to set up the browser environment and make
// sure all of the core library's are initialized.

// Create a new [Clock](http://threejs.org/docs/#Reference/Core/Clock) that will be
// the heartbeat of the game, 
let clock = new THREE.Clock(true);

// Set up a default error handler for [RSVP](https://github.com/tildeio/rsvp.js/)
RSVP.onerrorDefault = function (error) {
    console.error(error.stack);
    console.assert(error, false);
};

RSVP.on('error', RSVP.onerrorDefault);

// Initialize the Stats helper that will show us FPS and frame render times
let stats = new Stats();

stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.zIndex = 100;



// Load all player/game options/settings/preferences so
// they can be passed into the application when it is created. There are three
// possible sources for an option, and their order of precedence is as follows:
//  - A querystring key/value pair: `index.html?antialiasing=false`
//  - Local Storage
//  - the [default option values](default-options.html)
let options;

options = (function () {
    let types = {
            'number': Number,
            'string': function () {},
            'boolean': function (v) { return v === 'true'; }
        },
        overrides = {},
        qs = parseQueryString();

    Object.keys(defaultOptions).forEach(function (key) {
        let item;

        // When you read in from querystrings or localStorage, unfortunately all of the
        // values get converted to strings, so we'll run the value through a converter
        // function stored in `types` and keyed off of the object's answer to `typeof`.
        if (qs[key] !== void 0) {
            overrides[key] = types[typeof defaultOptions[key]](qs[key]);
        } else if (detector.localStorage) {
            item = localStorage.getItem('wizard.' + key);
            
            if (item !== null) {
                overrides[key] = types[typeof defaultOptions[key]](item);
            }
        }
    });

    // Make sure that if there is an override option for the `renderer`, it
    // is a valid value, otherwise just revert to WebGL
    if (overrides.renderer && !(overrides.renderer in { Canvas: 0, WebGL: 0 })) {
        console.warn(
            `Unknown value passed to 'renderer' option: ${overrides.renderer} - reverting to "WebGL"`
        );

        delete overrides.renderer;
    }

    return $.extend({}, defaultOptions, overrides);
}());



// Register all global callback functions.



// Now that the environment is set up and we have everything we need,
// initialize the app. This is done by creating a [WizardApplication](application.html)
// object
let app = new WizardApplication(window.innerWidth, window.innerHeight, 'body', options);

app.init();

// The application is initialized, so fire off the main loop using
// the `requestAnimationFrame` function.
requestAnimationFrame(function main() {
    /* check to make sure none of the devices have been lost or need to be recovered */
    /* yield processing if need be */

    // At the start of each frame, we need to figure out how much
    // time, in milliseconds, has passed since the last frame was
    // updated and drawn.
    let elapsedTime = clock.getElapsedTime(),
        deltaTime = clock.getDelta();

    // Update the FPS counter
    if (app.options.showFPS) {
        if (!stats.attached) {
            app.$viewport.append(stats.domElement);
            stats.attached = true;
        }

        stats.update();
    } else {
        if (!stats.attached) {
            $(stats.domElement).remove();
            stats.attached = false;
        }
    }

    // If there is a reason to pause the execution of the application,
    // such as a context menu was in they way or the application has a
    // flag set that explicitly tells us to completely pause all execution,
    // check for that here
    /* see if there is a reason to not call `app.update` or `app.render` this frame */
    if (false) {

    } else {
        // There is no reason to halt, so go ahead and tell the app to
        // update and render, provided that for some reason, the app
        // is in a state or has a flag set that tells us to pause
        // all rendering.
        app.onUpdate(elapsedTime, deltaTime);

        /* if rendering is not paused */
            app.onRender(elapsedTime, deltaTime);
    }

    /* update the frame counter */
    /* check to see if the app should shutdown. do so if needed, otherwise... */

    // This frame is finished. Queue up the next frame call, since we have no
    // reason to stop running the main loop
    requestAnimationFrame(main);
});



// Down here is where we would handle any application shutdown logic,
// of which we probably wont have much, if any.
/* TODO: Be aware of the state your game needs to be in to correctly attach and
 * detach onbeforeunload handlers. If the player is in the middle of a match or
 * a round, we don't want to kill the session like we normaly do for web pages
/* shutdown logic */
