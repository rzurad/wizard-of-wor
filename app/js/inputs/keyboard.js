function Keyboard() {
    this.keyCodes = {};
    this.modifiers = {};

    this._onKeyDown = function (e) {
        this._onKeyChange(e, true);
    }.bind(this);

    this._onKeyUp = function (e) {
        this._onKeyChange(e, false);
    }.bind(this);

    document.addEventListener('keydown', this._onKeyDown, false);
    document.addEventListener('keyup', this._onKeyUp, false);
}

Keyboard.MODIFIERS = ['shift', 'ctrl', 'alt', 'meta'];
Keyboard.ALIAS = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    space: 32,
    pageup: 33,
    pagedown: 34,
    tab: 9
};

Keyboard.prototype = {
    constructor: Keyboard,

    destroy: function () {
        document.removeEventListener('keydown', this._onKeyDown, false);
        document.removeEventListener('keyup', this._onKeyUp, false);
    },

    isOressed: function (descriptor) {
        var keys = descriptor.split('+');

        keys.forEach(function (key) {
            var pressed;

            if (Keyboard.MODIFIERS.indexOf(key) !== -1) {
                pressed = this.modifiers[key];
            } else if (Object.keys(Keyboard.ALIAS).indexOf(key) !== -1) {
                pressed = this.keyCodes[Keyboard.ALIAS[key]];
            } else {
                pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)];
            }

            if (!pressed) {
                return false;
            }
        });

        return true;
    },

    _onKeyChange: function (e, pressed) {
        this.keyCodes[e.keyCode] = pressed;

        this.modifiers.shift = e.shiftKey;
        this.modifiers.ctrl = e.ctrlKey;
        this.modifiers.alt = e.altKey;
        this.modifiers.meta = e.metaKey;

        console.log('Keyboard:', e.keyCode, 'is', pressed ? 'pressed' : 'not pressed');
    }
};

export default Keyboard;
