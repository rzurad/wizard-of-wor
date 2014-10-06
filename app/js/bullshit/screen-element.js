function Message() {}

//NOTE: This is an interface in the source material
function ScreenElement() {
    this.zOrder;
    this.isVisible;
}

ScreenElement.prototype = {
    constructor: ScreenElement,

    // onRestore: function () { },
    // onMessageProcess: function (msg) { },

    onRender: function (elapsedTime, deltaTime) {

    }
};

export default ScreenElement;
