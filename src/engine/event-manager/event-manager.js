const INFINITE = 0xffffffff;

export default class EventManager {
    addListener(delegate, type) {
        console.warn('`eventManager.addListener` method not implemented!');
    }

    removeListener(delegate, type) {
        console.warn('`eventManager.removeListener` method not implemented!');
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
