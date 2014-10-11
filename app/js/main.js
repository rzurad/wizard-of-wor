import WizardGameApp from 'application';

// set up the environment
// load player options/config/settings files
// set all callback functions

// call WizardGameApp.init()
var app = new WizardGameApp().init('#container', window.innerWidth, window.innerHeight),
    clock = new THREE.Clock(true);

// start the main loop
requestAnimationFrame(function main() {
    var elapsedTime = clock.getElapsedTime(),
        deltaTime = clock.getDelta();

    // update FPS stats

    // if a menu is open, render it instead of the game
    if (false) {
        // deal with menu
    } else {
        // else update the scene the scene
        app.update(elapsedTime, deltaTime);

        // if rendering is not paused
            app.render(elapsedTime, deltaTime);
    }

    requestAnimationFrame(main);
});

// handle shutdown
