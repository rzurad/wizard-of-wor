import ProcessManager from 'processing/process-manager';
import { BaseView, TYPES } from 'views/base';

TYPES.human = 'human';

var HumanView;

HumanView = BaseView.extend({
    type: TYPES.human,
    timeOfLastRender: 0,

    init: function () {
        /* initialize the audio */
        this.set('processManager', ProcessManager.create());
        this.set('screenElements', []);

        /* register all delegates */
        /* set base game state to initializing */
        /* scene.reset(ScreenElementScene.create({ renderer: renderer }) */
        /* create the camera */
        /* add the camera as a child to the scene */
        /* set the camera to be the camera of the scene */
    },

    // onRestore: function () { }, <-- don't think I'll need since I'm not that close to the hardware
    onRender: function (elapsedTime, deltaTime) {
        if (elapsedTime === this.timeOfLastRender) {
            return;
        }

        // clear the render target and the zbuffer

        // render the scene

        // TODO: screens can probably destroy themselves onRender
        // TODO: be smarter about inserting and you won't need the sort
        // TODO: You might not even need any of this at all
        this.screenElements.sort();
        this.screenElements.forEach(function (screen) {
            screen.onRender(elapsedTime, deltaTime);
        });
        
        // walk through all screenElements and call their
        // `onRender` with elapsedTime, deltaTime

        /* Screens are basically anything that draws UI. See if you can think about them
         * in terms of DOM elements. A screen is a DOM element that contains some piece of UI.
         * They are all drawn in the same viewport container because the can just be all
         * positioned absolutely and have various z-indicies
         */

        this.timeOfLastRender = elapsedTime;
    },

    // onLostDevice: function () { }, <-- don't think I'll need since I'm not that close to the hardware
    pushScreen: function (screen) {
        this.screenElements.push(screen);
    },

    popScreen: function () {
        this.screenElements.pop();
    },

    onMessageProcess: function (msg) { console.warn('`onMessageProcess` does not do anything yet'); },

    onUpdate: function (elapsedTime, deltaTime) {
        this.processManager.updateProcesses(deltaTime);
    },

    initAudio: function () { console.warn('`initAudio` does not do anything yet.'); },

    destroy: function () {
        this.processManager.deleteAllProcesses();
        // g_Audio->VShutdown();
    }
});

export default HumanView;
