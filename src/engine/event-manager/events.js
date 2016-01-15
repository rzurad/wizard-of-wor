import { INVALID_ACTOR_ID } from '../actors/actor';
import { INVALID_GAME_VIEW_ID } from '../fiddle/game-view';

export default class BaseEventData {
    static get eventType() {
        console.error('`baseEventData.eventType` getter must be overriden in subclass!');
    }

    constructor(timestamp = 0) {
        this._timestamp = 0;
    }

    serialize() {
        console.warn('`baseEventData.serialize` method not implemented!');
    }

    deserialize() {
        console.warn('`baseEventData.deserialize` method not implemented!');
    }

    copy() {
        console.error('`baseEventData.copy` method must be overridden in subclass!');
    }

    get name() {
        return 'BaseEventData';
    }
}



// Sent when actors are destroyed
const DESTROY_ACTOR_EVENT_TYPE = 0x1eb24ec4;

export class DestroyActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID) {
        super();

        this._actorId = actorId;
    }

    static get eventType() {
        return DESTROY_ACTOR_EVENT_TYPE;
    }

    get name() {
        return 'DestroyActorEvent';
    }

    get actorId() {
        return this._actorId;
    }
}



// Event that is sent whenever a new game is started
const ENVIRONMENT_LOADED_EVENT_TYPE = 0x5ef4a6e2;

export class EnvironmentLoadedEvent extends BaseEventData {
    static get eventType() {
        return ENVIRONMENT_LOADED_EVENT_TYPE;
    }
}



const MOVE_ACTOR_EVENT_TYPE = 0x58e5605a;

export class MoveActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, matrix) {
        super();

        this._actorId = actorId;
        this._matrix = matrix;
    }

    static get eventType() {
        return MOVE_ACTOR_EVENT_TYPE;
    }

    get name() {
        return 'MoveActorEvent';
    }

    get actorId() {
        return this._actorId;
    }

    get matrix() {
        return this._matrix;
    }
}



// Sent by the server to the clients when a newtwork view is assigned a player number
const NETWORK_PLAYER_ACTOR_ASSIGNMENT_EVENT_TYPE = 0xd862771c;

export class NetworkPlayerActorAssignmentEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, socketId = -1) {
        super();

        this._actorId = actorId;
        this._socketId = socketId;
    }

    static get eventType() {
        return NETWORK_PLAYER_ACTOR_ASSIGNMENT_EVENT_TYPE;
    }

    get name() {
        return 'NetworkPlayerActorAssignmentEvent';
    }

    get actorId() {
        return this._actorId;
    }

    get socketId() {
        return this._socketId;
    }
}



// Sent when an actor is *actually* created
const NEW_ACTOR_EVENT_TYPE = 0x26c88ef4;

export class NewActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID, viewId = INVALID_GAME_VIEW_ID) {
        super();

        this._actorId = actorId;
        this._viewId = viewId;
    }

    get name() {
        return 'NewActorEvent';
    }

    static get eventType() {
        return NEW_ACTOR_EVENT_TYPE;
    }

    get viewId() {
        return this._viewId;
    }

    get actorId() {
        return this._actorId;
    }
}



// Event sent by a server asking Client proxy logics to create new actors from their local
// resources. It is also sent from the server game logic to client logics AFTER it has created a
// new actor. The logics will all follow suit to stay in sync.
const REQUEST_NEW_ACTOR_EVENT_TYPE = 0xa2e6aadc;

export class RequestNewActorEvent extends BaseEventData {
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
        return REQUEST_NEW_ACTOR_EVENT_TYPE;
    }

    get name() {
        return 'RequestNewActorEvent';
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

const REQUEST_DESTROY_ACTOR_EVENT_TYPE = 0x348abb8f;

export class RequestDestroyActorEvent extends BaseEventData {
    constructor(actorId = INVALID_ACTOR_ID) {
        super();

        this._actorId;
    }

    static get eventType() {
        return REQUEST_DESTROY_ACTOR_EVENT_TYPE;
    }

    get name() {
        return 'RequestDestroyActorEvent';
    }

    get actorId() {
        return this._actorId;
    }
}

const PLAY_SOUND_EVENT_TYPE = 0xb568570f;

export class PlaySoundEvent extends BaseEventData {
    constructor(soundResource) {
        super();

        this._soundResource = soundResource;
    }

    static get eventType() {
        return PLAY_SOUND_EVENT_TYPE;
    }

    get name() {
        return 'PlaySoundEvent';
    }

    get soundResource() {
        return this._soundResource;
    }
}
