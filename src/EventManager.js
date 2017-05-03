export default class EventManager {
    constructor() {
        this._listeners = {};
    }

    on(eventName, callback) {
        (this._listeners[eventName] = this._listeners[eventName] || []).push(callback);
    }

    off(eventName, callback) {
        if (arguments.length === 1) {
            this._listeners[eventName] = [];
        } else if (typeof callback === 'function') {
            let index = this._listeners[eventName].indexOf(callback);

            for (var i = 0; i < this._listeners.length && index === -1; i++) {
                if (this._listeners[i] === callback) {
                    index = i;
                }
            }

            if (index !== -1) {
                this._listeners.splice(index, 1);
            }
        }
    }

    trigger(eventName, data) {
        let listeners = this._listeners[eventName];

        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                const evt = new EventArg(eventName, data);

                listeners[i].call(null, evt);

                if (evt.removed) {
                    listeners.splice(i, 1);
                    --i;
                }

                if (evt.cancelled) {
                    break;
                }
            }
        }
    }
}

class EventArg {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.cancelled = false;
        this.removed = false;
    }

    cancel() {
        this.cancelled = true;
    }

    remove() {
        this.removed = true;
    }
}

const globalEventManager = new EventManager();

EventManager.global = function () {
    return globalEventManager;
};
