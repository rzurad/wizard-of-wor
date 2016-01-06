// Sent when actors are destroyed
import BaseEventData from './base-event-data';
import { INVALID_ACTOR_ID } from '../../actors/actor';

const EVENT_TYPE = 0x1eb24ec4;

export default class DestroyActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID) {
        super();

        this._actorId = actorId;
    }

    static get eventType() {
        return EVENT_TYPE;
    }

    get name() {
        return DestroyActorEvent.name;
    }

    get actorId() {
        return this._actorId;
    }
}
