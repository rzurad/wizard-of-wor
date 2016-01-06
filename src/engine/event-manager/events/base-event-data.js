export default class BaseEventData {
    static get eventType() {
        console.error('`baseEventData.eventType` getter must be overriden in subclass!');
    }

    constructor(timestamp = 0) {
        this._timestamp = 0;
    }

    serialize() {
        console.warn('`baseEventData.serialize` method not implemented!');
    }

    deserialize() {
        console.warn('`baseEventData.deserialize` method not implemented!');
    }

    copy() {
        console.error('`baseEventData.copy` method must be overridden in subclass!');
    }

    get name() {
        return BaseEventData.name;
    }
}
