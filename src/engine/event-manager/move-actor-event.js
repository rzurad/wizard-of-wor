import BaseEventData from './base-event-data';
import { INVALID_ACTOR_ID } from '../actors/actor';

const EVENT_TYPE = 0x58e5605a;

export default class MoveActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, matrix) {
        super();

        this._actorId = actorId;
        this._matrix = matrix;
    }

    static get eventType() {
        return EVENT_TYPE;
    }

    get name() {
        return MoveActorEvent.name;
    }

    get actorId() {
        return this._actorId;
    }

    get matrix() {
        return this._matrix;
    }
}
