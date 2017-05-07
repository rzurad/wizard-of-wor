const INVALID_ACTOR_ID = 0;

export default class ActorFactory {
    constructor() {
        let _lastActorId = INVALID_ACTOR_ID;
        Object.defineProperty(this, 'lastActorId', {
            get() { return _lastActorId; }
        });

        this.getNextActorId = function () {
            return ++_lastActorId;
        };
    }

    createActor(resource, overrides, initialTransform, serversActorId) {
        console.log('createActor!');
    }

    createComponent(data) {
        console.log('createComponent');
    }
}
