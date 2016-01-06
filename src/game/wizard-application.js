import FiddleApplication from '../engine/fiddle/application';
import eventFactory from '../engine/event-manager/event-factory';

export default class WizardApplication extends FiddleApplication {
    createGameAndView() {
        console.warn('`wizardApplication.createGameAndView` method not implemented!');
    }

    registerGameEvents() {
        console.warn('`wizardApplication.registerGameEvents` method not implemented!');
    }

    createNetworkEventForwarder() {
        console.warn('`wizardApplication.createNetworkEventForwarder` method not implemented!');
    }

    destroyNetworkEventForwarder() {
        console.warn('`wizardApplication.destroyNetworkEventForwarder` method not implemented!');
    }
}
