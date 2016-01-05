// Event that is sent whenever a new game is started
import BaseEventData from './base-event-data';

const EVENT_TYPE = 0x5ef4a6e2;

export default class EnvironmentLoadedEvent extends BaseEventData {
    get eventType() {
        return EVENT_TYPE;
    }
}
