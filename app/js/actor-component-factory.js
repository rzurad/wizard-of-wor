import Component from './actor-component';

let TYPES = {
        base: Component
    },
    _getId = (function () {
        let _id = 0;

        return function () {
            return ++_id;
        };
    }());

export default class ActorComponentFactory {
    create(type) {
        let component = null,
            constructor = TYPES[type];

        if (!constructor) {
            console.warn(`ActorComponentFactor.create did not recognize '${type}' component`);
        } else {
            component = new constructor(_getId());
        }

        return component;
    }
}
