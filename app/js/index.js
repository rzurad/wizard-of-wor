// The Incredible Wizard of Wor
// ----------------------------

// Welcome to an open-source Web Browser clone of the 1981 Midway Games title
// "Wizard of Wor" for the [Bally Astrocade](http://en.wikipedia.org/wiki/Bally_Astrocade).
// The goal of the project is to completely
// recreate as closely as possible the experience of playing the original title.

// The index.js file is where it all begins.
// This is the entry point for the application. This is where everything is
// bootstraped together and kicked off.
import WizardApplication from 'application';
import defaultOptions from 'default-options';
import detector from 'utils/detector';
import parseQueryString from 'utils/querystring';



// Before we do anything, we want to set up the browser environment and make
// sure all of the core library's are initialized.

// Create a new [Clock](http://threejs.org/docs/#Reference/Core/Clock) that will be
// the heartbeat of the game, 
var clock = new THREE.Clock(true),
    app, options, stats;

// tie a few dependency libraries together. We're not loading in the [Ember.JS](http://www.emberjs.com) framework
// in a typical fashion. We're loading in only the subpackages that we need. Because of this
// we need to do a little bit of manual glue to put a few things where we expect the regular
// Ember.JS framework to put them or handle them.

// Set up a default error handler for [RSVP](https://github.com/tildeio/rsvp.js/)
RSVP.onerrorDefault = function (error) {
    Ember.Logger.error(error.stack);
    Ember.Logger.assert(error, false);
};

RSVP.on('error', RSVP.onerrorDefault);

// alias [jQuery](http://www.jquery.org) and RSVP onto the Ember namespace
Ember.$ = jQuery;
Ember.RSVP = RSVP;

// Initialize the Stats helper that will show us FPS and frame render times
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.zIndex = 100;



// Load all player/game options/settings/preferences so
// they can be passed into the application when it is created. There are three
// possible sources for an option, and their order of precedence is as follows:
//  - A querystring key/value pair: `index.html?antialiasing=false`
//  - Local Storage
//  - the [default option values](default-options.html)
options = (function () {
    var types = {
            'number': Number,
            'string': function () {},
            'boolean': function (v) { return v === 'true'; }
        },
        overrides = {},
        qs = parseQueryString();

    Object.keys(defaultOptions).forEach(function (key) {
        var item;

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
        Ember.Logger.warn(
            'Unknown value passed to `renderer` option:', overrides.renderer, '- reverting to "WebGL"'
        );

        delete overrides.renderer;
    }

    return Ember.$.extend({}, defaultOptions, overrides);
}());



// Register all global callback functions.



// Now that the environment is set up and we have everything we need,
// initialize the app. This is done by creating a [WizardApplication](application.html)
// object
app = WizardApplication.create({
    viewportSelector: '#container',
    width: window.innerWidth,
    height: window.innerHeight,
    options: options
});



// The application is initialized, so fire off the main loop using
// the `requestAnimationFrame` function.
requestAnimationFrame(function main() {
    /* check to make sure none of the devices have been lost or need to be recovered */
    /* yield processing if need be */

    // At the start of each frame, we need to figure out how much
    // time, in milliseconds, has passed since the last frame was
    // updated and drawn.
    var elapsedTime = clock.getElapsedTime(),
        deltaTime = clock.getDelta();

    // Update the FPS counter
    if (app.get('options.showFPS')) {
        if (!stats.attached) {
            app.get('$viewport').append(stats.domElement);
            stats.attached = true;
        }

        stats.update();
    } else {
        if (!stats.attached) {
            Ember.$(stats.domElement).remove();
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
/* shutdown logic */
