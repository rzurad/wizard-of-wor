import { INVALID_ACTOR_ID } from './actor';
import GenericObjectFactory from '../utilities/generic-object-factory';

export default class ActorFactory {
    constructor() {
        this._lastActorId = INVALID_ACTOR_ID;
        this._componentFactory = new GenericObjectFactory();

        console.warn('`ActorFactory` constructor not implemented!');
    }

    createActor(actorResource, overrides, initialTransform, serversActorId) {
        console.warn('`actorFactory.createActor` method not implemented!');
    }

    modifyActor(actor, overrides) {
        console.warn('`actorFactory.modifyActor` method not implemented!');
    }

    createComponent(data) {
        console.error('`actorFactory.createComponent` method must be defined by subclass!');
    }

    _getNextActorId() {
        return ++this._lastActorId;
    }
}
