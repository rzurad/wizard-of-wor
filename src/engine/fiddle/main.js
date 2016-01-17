import Clock from '../utilities/clock';
/* globals RSVP, Stats */

export default function fiddle(AppClass, width, height) {
    // Create a new Clock that will be the heartbeat of the game.
    let clock = new Clock(true);

    // Set up the default error handler for [RSVP](https://github.com/tildeio/rsvp.js)
    RSVP.onerrordefault = function (error) {
        console.error(error.stack);
        console.assert(error, false);
    };

    RSVP.on('error', RSVP.onerrordefault);

    // Initialize the Stats helper that will show us FPS and frame render times
    //TODO: should this Stat code be moved somewhere else?
    let stats = new Stats();

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;

    // Create the instance of the game app using the passed-in subclass. Note that, in a proper
    // C++ fashion, this really only just creates the object instance. It does not actually intialize
    // anything just yet. That's what the `initInstance` method call below is for.
    let app = new AppClass();

    // initialize the game options
    app.options.init('./player-options.json').then(function () {
        //TODO: This is where the DXUT callbacks are set: https://github.com/rzurad/gamecode4/blob/master/Source/GCC4/GameCode4/GameCode4.cpp#L125

        //  is there anything we can do about?:
        //  TODO: Some of these do have WebGL analagous events, but the should probably be set up
        //  with the renderer inside the the Application.initInstance, since they are specific to WebGL
        //  and a Canvas context will have different events (or none at all)
        //      MsgProc
        //      ModifyDeviceSettings
        //      DeviceChanging
        //      DeviceAcceptable
        //      DeviceCreated
        //      DeviceReset
        //      DeviceLost
        //      DeviceDestroyed

        app.initInstance().then(() => {
            requestAnimationFrame(function main() {
                //TODO: handle game pauses and shutdown requests (what about `onbeforeunload`?)

                let elapsedTime = clock.getElapsedTime(),
                    deltaTime = clock.getDelta();

                app.onUpdateGame(deltaTime, elapsedTime);

                //TODO: if rendering is not paused, then
                app.onFrameRender(deltaTime, elapsedTime);

                requestAnimationFrame(main);
            });
        }).catch((reason) => {
            console.error("Game App class' `initInstance` rejected!", reason, AppClass);
        });
    }).catch(function (reason) {
        console.error('Could not initialize game options:', reason);
    });
}
