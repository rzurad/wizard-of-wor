const INFINITE = 0xffffffff;

export default class EventManager {
    constructor() {
        this._activeQueue = 0;
        this._eventListeners = {};
    }

    addListener(delegate, type) {
        // shift into the list so that we can iterate backwards when triggering to
        // account for delegates that can remove themselves
        (this._eventListeners[type] = this._eventListeners[type] || []).shift(delegate);
    }

    removeListener(delegate, type) {
        let list = this._eventListeners[type];

        if (list) {
            list.splice(list.indexOf(delegate), 1);

            return true;
        }

        return false;
    }

    triggerEvent(event) {
        console.warn('`eventManager.triggerEvent` method not implemented!');
    }

    queueEvent(event) {
        console.warn('`eventManager.queueEvent` method not implemented!');
    }

    abortEvent(event, allOfType = false) {
        console.warn('`eventManager.abortEvent` method not implemented!');
    }

    update(maxMillis = INFINITE) {
        console.warn('`eventManager.update` method not implemented!');
    }
}

export var eventManager = new EventManager();
