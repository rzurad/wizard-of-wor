import ActorComponent from './actor-component';

export default class TransformComponent extends ActorComponent {
    static get name() {
        return 'TransformComponent';
    }

    constructor() {
        super();

        console.warn('`TransformComponent` does nothing at the moment!');
        this._transform = null;
    }

    getTransform() {
        return this._transform;
    }

    setTransform(transform) {
        this._transform = transform;
    }
}
