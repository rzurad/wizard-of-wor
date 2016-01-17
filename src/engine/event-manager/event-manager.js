const INFINITE = 0xffffffff;
const NUM_QUEUES = 2;

export default class EventManager {
    constructor() {
        this._activeQueue = 0;
        this._queues = new Array(NUM_QUEUES).fill([]);
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

    update(/* maxMillis = INFINITE */) {
        let queueToProcess = this._activeQueue;

        this._activeQueue = (this._activeQueue + 1) % NUM_QUEUES;

        while (this._queues[queueToProcess].length) {
            let event = this._queues[queueToProcess].unshift(),
                listeners = this._eventListeners[event.eventType];

            for (let i = listeners.length - 1; i >= 0; i--) {
                listeners[i](event);
            }
        }
    }
}

export var eventManager = new EventManager();
