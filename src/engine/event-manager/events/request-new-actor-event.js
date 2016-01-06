// Event sent by a server asking Client proxy logics to create new actors from their local
// resources. It is also sent from the server game logic to client logics AFTER it has created a
// new actor. The logics will all follow suit to stay in sync.
import BaseEventData from './base-event-data';
import { INVALID_ACTOR_ID } from '../../actors/actor';
import { INVALID_GAME_VIEW_ID } from '../../fiddle/game-view';

const EVENT_TYPE = 0xa2e6aadc;

export default class RequestNewActorEvent extends BaseEventData {
    constructor(
        actorResource = '',
        initialTransform = null,
        serverActorId = INVALID_ACTOR_ID,
        viewId = INVALID_GAME_VIEW_ID
    ) {
        super();

        this._actorResource = actorResource;
        this._hasInitialTransform = !!initialTransform;
        this._initialTransform = initialTransform;
        this._serverActorId = serverActorId;
        this._viewId = viewId;
    }

    static get eventType() {
        return EVENT_TYPE;
    }

    get name() {
        return RequestNewActorEvent.name;
    }

    get actorResource() {
        return this._actorResource;
    }

    get initialTransform() {
        return this._initialTransform;
    }

    get serverActorId() {
        return this._serverActorId;
    }

    get viewId() {
        return this._viewId;
    }
}
