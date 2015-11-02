export default class ActorComponent {
    constructor(id) {
        if (!id) {
            console.warn(`ActorComponent constructor was not given a valid id`);
        }

        Object.defineProperty(this, 'id', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: id
        });

        let _owner = null;

        Object.defineProperty(this, 'owner', {
            get: function () { return _owner; },
            writeable: false,
            configurable: false,
            enumerable: true
        });

        this.setOwner = function (owner) { _owner = owner; };
    }

    init(config) {

    }

    postInit() {

    }

    update(deltaMs) {

    }
}
