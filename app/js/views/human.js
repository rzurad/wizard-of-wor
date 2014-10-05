import ProcessManager from 'processing/process-manager';
import { BaseView, TYPES } from 'views/base';

TYPES.human = 'human';

function HumanView() {
    this.initAudio();

    BaseView.apply(this, arguments);

    this.type = TYPES.human;
    this.processManager = new ProcessManager();
    this.timeOfLastRender;
    // this.time;
    // this.isFullspeed;
    this.screenElements = [];
    // this.keyboardHandler;
    // this.audioManager = null;

    // ID3DXFont* m_pFont;
    // ID3DXSprite* m_pTextSprite;

    // this.initAudio();
}

HumanView.prototype = {
    constructor: HumanView,

    // onRestore: function () { }, <-- don't think I'll need since I'm not that close to the hardware
    onRender: function (elapsedTime, deltaTime) {
        if (elapsedTime === this.timeOfLastRender) {
            return;
        }

        // clear the render target and the zbuffer

        // render the scene

        this.screenElements.sort();
        
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
    pushScreen: function (screen) { console.warn('`pushScreen` does not do anything yet.'); },
    popScreen: function () { console.warn('`popScreen` does not do anything yet.'); },
    onMessageProcess: function (msg) { console.warn('`onMessageProcess` does not do anything yet'); },

    onUpdate: function (elapsedTime, deltaTime) {
        this.processManager.updateProcesses(deltaTime);
    },

    initAudio: function () { console.warn('`initAudio` does not do anything yet.'); },

    destroy: function () {
        this.processManager.deleteAllProcesses();
        // g_Audio->VShutdown();
    }
};

Object.setPrototypeOf(HumanView.prototype, BaseView.prototype);

export default HumanView;
