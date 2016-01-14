import BaseEventData from '../event-manager/events';
import { INVALID_ACTOR_ID } from '../actors/actor';

const PHYS_COLLISION_EVENT_TYPE = 0x702c8bac;

export class PhysCollisionEvent extends BaseEventData {
    constructor(actorA = INVALID_ACTOR_ID,
                actorB = INVALID_ACTOR_ID,
                sumNormalForce,
                sumFrictionForce,
                collisionPoints)
    {
        super();

        this._actorA = actorA;
        this._actorB = actorB;
        this._sumNormalForce = sumNormalForce || [0, 0, 0];
        this._sumFrictionForce = sumFrictionForce || [0, 0, 0];
        this._collisionPoints = collisionPoints;
    }

    static get eventType() {
        return PHYS_COLLISION_EVENT_TYPE;
    }

    get name() {
        return PhysCollisionEvent.name;
    }

    get actorA() {
        return this._actorA;
    }

    get actorB() {
        return this._actorB;
    }

    get sumNormalForce() {
        return this._sumNormalForce;
    }

    get sumFrictionForce() {
        return this._sumFrictionForce;
    }

    get collisionPoints() {
        return this._collisionPoints;
    }
}
