// Sent by the server to the clients when a newtwork view is assigned a player number
import BaseEventData from './base-event-data';
import { INVALID_ACTOR_ID } from '../actors/actor';

const EVENT_TYPE = 0xd862771c;

export default class NetworkPlayerActorAssignmentEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, socketId = -1) {
        super();

        this._actorId = actorId;
        this._socketId = socketId;
    }

    static get eventType() {
        return EVENT_TYPE;
    }

    get name() {
        return NetworkPlayerActorAssignmentEvent.name;
    }

    get actorId() {
        return this._actorId;
    }

    get socketId() {
        return this._socketId;
    }
}
