import ActorComponent from './actor-component';

export default TransformComponent extends ActorComponent {
    static get name() {
        return TransformComponent.name;
    }

    constructor() {
        this._transform = new THREE.Matrix4();
    }

    getTransform() {
        return this._transform;
    }

    setTransform(transform) {
        this._transform = transform;
    }
}
