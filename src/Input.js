import { DIRECTIONS } from 'consts';

export default class Input {
    constructor() {
        var keyStack = [],
            keysPressed = {},
            moveKeys = {
                ArrowLeft: DIRECTIONS.LEFT,
                ArrowRight: DIRECTIONS.RIGHT,
                ArrowUp: DIRECTIONS.UP,
                ArrowDown: DIRECTIONS.DOWN
            }

        this.direction = 0;
        this.firing = false;

        this.onKeyDown = function (e) {
            if (e.code in moveKeys && !keysPressed[e.code]) {
                keyStack.push(e.code);
                keysPressed[e.code] = true;

                this.direction = moveKeys[e.code];
            }

            if (e.code === 'Space' && !this.firing) {
                this.firing = true;
            }
        }.bind(this);

        this.onKeyUp = function (e) {
            if (e.code in moveKeys && keysPressed[e.code]) {
                keyStack.splice(keyStack.indexOf(e.code), 1);
                delete keysPressed[e.code];

                this.direction = moveKeys[keyStack[keyStack.length - 1]] || 0;
            }

            if (e.code === 'Space' && this.firing) {
                this.firing = false;
            }
        }.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    }
}
