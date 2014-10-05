import ProcessManager from 'processing/process-manager';
import { BaseView, TYPES } from 'base';

function HumanView() {
    this.initAudio();

    BaseView.apply(this, arguments);

    this.type = TYPES.human;
    this.processManager = new ProcessManager();
    this.time;
    this.timeOfLastRender;
    this.isFullspeed;
    this.screenElements;
    this.keyboardHandler;

    // ID3DXFont* m_pFont;
    // ID3DXSprite* m_pTextSprite;
}

HumanView.prototype = {
    constructor: HumanView,

    // onRestore: function () { },
    onRender: function (elapsedTime, deltaTime) {
        console.warn('`HumanView.onRender` not implemented');
    },

    // onLostDevice: function () { },
    pushScreen: function (screen) { },
    popScreen: function () { },
    onMessageProcess: function (msg) { },

    onUpdate: function (elapsedTime, deltaTime) {
        console.warn('`HumanView.onUpdate` not implemented');
    },

    initAudio: function () { },

    destroy: function () {
        this.processManager.deleteAllProcesses();
        // g_Audio->VShutdown();
    }
};

Object.setPrototypeOf(HumanView.prototype, BaseView.prototype);

export default HumanView;
