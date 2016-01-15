import { INVALID_ACTOR_ID } from './actor';
import GenericObjectFactory from '../utilities/generic-object-factory';
import TransformComponent from './transform-component';
import AudioComponent from './audio-component';

export default class ActorFactory {
    constructor() {
        this._lastActorId = INVALID_ACTOR_ID;
        this._componentFactory = new GenericObjectFactory();

        //TODO: Missing Components: MeshRender, SphereRender, Physics, TeapotRender, GridRender,
        //               LightRender, SkyRender, BaseScript
        this._componentFactory.register(TransformComponent, TransformComponent.name);
        this._componentFactory.register(AudioComponent, AudioComponent.name);
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
