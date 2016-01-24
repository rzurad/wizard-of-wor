export default class BaseUI {
    constructor() {
        this._posX = 0;
        this._posY = 0;
        this._width = 100;
        this._height = 100;
        this._isVisible = true;
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(visible) {
        this._isVisible = !!visible;
    }

    onRestore() {
        throw new Error('`BaseUI.onRestore` must be defined by subclass!');
    }

    onUpdate(deltaMs) {
        throw new Error('`BaseUI.onUpdate` must be defined by subclass!');
    }
}
