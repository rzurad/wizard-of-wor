import ScreenElement from 'screen-element';

function MessageBox(msg, title, buttonFlags) {
    ScreenElement.apply(this, arguments);

    // the constructor does a bunch of things, like initialize the dialog window
    // add all the buttons, figure out the height, width, positioning...
    // buttonFlags is a flag variable to dictate which buttons are visible (ok, cancel, yes, no...)
    this.x;
    this.y;
    this.width;
    this.height;
    this.domElement;
    this.domButton;
    this.isOptional;
}

MessageBox.prototype = {
    constructor: MessageBox,

    onRender: function (elapsedTime, deltaTime) {

    },

    onGUIEvent: function (e) {
        
    }
};

Object.setPrototypeOf(MessageBox.prototype, ScreenElement.prototype);

export default MessageBox;
