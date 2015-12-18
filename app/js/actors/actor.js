import ComponentCreator from './actor-component-creator';

export default class Actor {
    constructor(id) {
        if (!id) {
            console.error('No id given to Actor constructor!');
        }

        Object.defineProperty(this, 'id', {
            configurable: false,
            enumerable: true,
            writeable: false,
            value: id
        });

        this.components = {};
        this.position = [0, 0];
    }

    init(config) {

    }

    addComponent(component) {
        if (!component.id) {
            console.warn('Actor.addComponent: given component had no id');
        }

        component.setOwner(this);

        this.components[component.id] = component;
    }

    getComponent(component) {
        return this.components[components.id];
    }

    postInit() {

    }

    destroy() {

    }

    onUpdate(deltaMs) {

    }
}
