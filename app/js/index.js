// Application Entry Point
// -----------------------

// This is the entry point for the application. This is where everything is bootstraped
// together and kicked off.
import WizardApplication from 'application';
import defaultConfig from 'default-config';
import detector from 'utils/detector';
import parseQueryString from 'utils/querystring';

// Create a new [Clock](http://threejs.org/docs/#Reference/Core/Clock) that will be
// the heartbeat of the game, and tie a few dependency
// libraries together. We're loading in only the parts of Ember that we need, so
// we need to assemble RSVP.js and jQuery onto the Ember namespace manually.
//
/* set up the environment */
var clock = new THREE.Clock(true),
    app, config, stats;

/* configure a default error handler for RSVP */
RSVP.onerrorDefault = function (error) {
    Ember.Logger.error(error.stack);
    Ember.Logger.assert(error, false);
};

RSVP.on('error', RSVP.onerrorDefault);

/* alias jQuery and RSVP onto Ember namespace */
Ember.$ = jQuery;
Ember.RSVP = RSVP;

// Initialize the Stats helper that will show us FPS and frame render times
/* initialize Stats.js */
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.zIndex = 100;


// Load all player options, configuration, and settings files so
// they can be passed into the application when it is created. There are three
// possible sources for a config option, and their order of precedence is as follows:
//  - A querystring key/value pair: `index.html?antialiasing=false`
//  - Local Storage
//  - the default config
/* load player options, configs, settings */
config = (function createConfig() {
    var ls = {},
        qs = parseQueryString();

    detector.localStorage && Object.keys(defaultConfig).forEach(function (key) {
        var item = localStorage.getItem('wizard.' + key);
        
        /* TODO: item types :-/ */
        if (item !== null) {
            ls[key] = item;
        }
    });

    return Ember.$.extend({}, defaultConfig, ls, qs);
}());

debugger;
// Register all global callback functions.
/* register global callback function s*/

// Now that the environment is set up and we have everything we need,
// initialize the app. This is done by creating a [WizardApplication](application.html)
// object
/* Initialize the application */
app = WizardApplication.create({
    viewportSelector: '#container',
    width: window.innerWidth,
    height: window.innerHeight,
    config: config
});

// The application is initialized, so fire off the main loop using
// the `requestAnimationFrame` function.
/* start the main loop */
requestAnimationFrame(function main() {
    /* check to make sure none of the devices have been lost or need to be recovered */
    /* yield processing if need be */

    // At the start of each frame, we need to figure out how much
    // time, in milliseconds, has passed since the last frame was
    // updated and drawn.
    /* how much time has passed since the last frame? (ms) */
    var elapsedTime = clock.getElapsedTime(),
        deltaTime = clock.getDelta();

    // Update the FPS counter
    /* Update FPS counter */
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
