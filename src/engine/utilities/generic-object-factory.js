export default class GenericObjectFactory {
    constructor() {
        this._creationFunctions = {};
    }

    register(constructor) {
        if (constructor.eventType && !this._creationFunctions[constructor.eventType]) {
            this._creationFunctions[constructor.eventType] = constructor;

            return true;
        } else {
            console.warn(constructor, 'does not have a valid `eventType`!');
        }

        return false;
    }

    create(typeId) {
        console.warn('`genericObjectFactory.create` method not implemented!');
    }
}
