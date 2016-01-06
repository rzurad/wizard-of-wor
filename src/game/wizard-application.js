import FiddleApplication from '../engine/fiddle/application';
import eventFactory from '../engine/event-manager/event-factory';

export default class WizardApplication extends FiddleApplication {
    createGameAndView() {
        console.warn('`wizardApplication.createGameAndView` method not implemented!');
    }

    registerGameEvents() {
        //I believe the only purpose of the EventFactory is to handle the creation
        //of events that are recieved from network players. I assume this because not all
        //events in the sample game are actually registered to the g_eventFactory object,
        //and the only time events are created via the g_eventFactory object is in the
        //RemoteEventSocket class.

        //TODO: Come back later and register game events that the eventFactory may
        //need to know about (or just delete everything about the event factory because
        //you figured out that you don't need it.
    }

    createNetworkEventForwarder() {
        console.warn('`wizardApplication.createNetworkEventForwarder` method not implemented!');
    }

    destroyNetworkEventForwarder() {
        console.warn('`wizardApplication.destroyNetworkEventForwarder` method not implemented!');
    }
}
