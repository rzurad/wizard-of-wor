// Application Entry Point
// -----------------------

// This is the entry point for the application. This is where everything is bootstraped
// together and kicked off.
import WizardApplication from 'application';

// Create a new Clock that will be the heartbeat of the game, and tie a few dependency
// libraries together. We're loading in only the parts of Ember that we need, so
// we need to assemble RSVP.js and jQuery onto the Ember namespace manually.
//
/* set up the environment */
var clock = new THREE.Clock(true),
    app;

RSVP.onerrorDefault = function (error) {
    Ember.Logger.error(error.stack);
    Ember.Logger.assert(error, false);
};

RSVP.on('error', RSVP.onerrorDefault);

Ember.$ = jQuery;
Ember.RSVP = RSVP;

// Next, we load all player options, configuration, and settings files so
// they can be passed into the application when it is created. This is also
// where all global callback functions are registered.
/* load player options, configs, settings */
/* register global callback function s*/

// Now that the environment is set up and we have everything we need,
// initialize the app. This is done by creating a [WizardApplication](application.html)
// object
/* Initialize the application */
app = WizardApplication.create({
    viewportSelector: '#container',
    width: window.innerWidth,
    height: window.innerHeight
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

    // If there was an FSP counter, it would be updated here.
    /* Update FSP counter */

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
