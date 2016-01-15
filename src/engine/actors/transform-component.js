import ActorComponent from './actor-component';

export default class TransformComponent extends ActorComponent {
    static get name() {
        return 'TransformComponent';
    }

    constructor() {
        super();

        this._transform = new THREE.Matrix4();
    }

    getTransform() {
        return this._transform;
    }

    setTransform(transform) {
        this._transform = transform;
    }
}
