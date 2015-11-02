import Actor from './actor';
import ActorComponentFactor from './actor-component-factory';

let _getId = (function () {
        let _id = 0;

        return function () {
            return ++_id;
        };
    }());

export default class ActorFactory {
    constructor() {
        this.actorComponentCreators;
    }

    create(actorResource) {
        let actor = new Actor(_getId());

        actor.init(actorResource);

        Object.keys(actorResource).forEach((componentType) => {
            let component = this.createComponent(actorResource[componentType]);

            actor.addComponent(component);
        });

        actor.postInit();

        return actor;
    }

    createComponent(type, config) {
        let component = ActorComponentFactory.create(type);

        if (component) {
            component.init(config);
        } else {
            console.error(`ActorFactor.createComponent: ComponentCreator did not create ${type} component`);
        }

        return component;
    }
}
