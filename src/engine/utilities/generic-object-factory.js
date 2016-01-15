export default class GenericObjectFactory {
    constructor() {
        this._creationFunctions = {};
    }

    register(constructor, id) {
        if (!this._creationFunctions[id]) {
            this._creationFunctions[id] = constructor;

            return true;
        }

        return false;
    }

    create(typeId) {
        console.warn('`genericObjectFactory.create` method not implemented!');
    }
}
