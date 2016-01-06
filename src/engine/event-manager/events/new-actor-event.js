// Sent when an actor is *actually* created
import BaseEventData from './base-event-data';
import { INVALID_ACTOR_ID } from '../../actors/actor';
import { INVALID_GAME_VIEW_ID } from '../../fiddle/game-view';

const EVENT_TYPE = 0x26c88ef4;

export default class NewActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, viewId = INVALID_GAME_VIEW_ID) {
        super();

        this._actorId = actorId;
        this._viewId = viewId;
    }

    get name() {
        return NewActorEvent.name;
    }

    static get eventType() {
        return EVENT_TYPE;
    }

    get viewId() {
        return this._viewId;
    }

    get actorId() {
        return this._actorId;
    }
}
