import WizardGameApp from 'application';

// load data files (string tables, images, sounds, assets, etc...)

// check and init the audio system

// check and init the video system

// initialize game/application
var app = new WizardGameApp().init('#container', window.innerWidth, window.innerHeight),
    clock = new THREE.Clock(true);

// execute main loop
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
