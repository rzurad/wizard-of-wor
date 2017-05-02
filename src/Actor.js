import StateMachine from 'javascript-state-machine/state-machine';
import PortalCell from 'PortalCell';
import { DIRECTIONS, CELL_SIZE } from 'consts';
import 'pixi.js/dist/pixi';

export default class Actor {
    constructor() {
        this.sprites = {};
        this.container = new PIXI.Container();
        this.container.pivot.set(12, 12);
        this.speed = 2;
        this.direction = DIRECTIONS.RIGHT;
        this.cell = null;
    }

    setCell(cell) {
        this.cell = cell;
    }

    warpToCell(cell) {
        this.setCell(cell);
        this.container.x = cell.sprite.x;
        this.container.y = cell.sprite.y;
    }

    onstartmoving(event, from, to) {
        this.sprites.moving.play();
    }

    onstopmoving(event, from, to) {
        this.sprites.moving.stop();
    }

    onbeforestartup(event, from, to) {
        this.container.addChild(this.sprites.moving);
    }

    move(direction) {
        var _move = function (direction) {
                if (this.current === 'idle') {
                    this.startmoving();
                }

                switch (direction) {
                    case DIRECTIONS.UP:
                        this.container.y -= this.speed;
                        this.container.rotation = -(Math.PI / 2);
                        this.container.scale.set(1, 1);

                        break;
                    case DIRECTIONS.DOWN:
                        this.container.y += this.speed;
                        this.container.rotation = Math.PI / 2;
                        this.container.scale.set(1, -1);

                        break;
                    case DIRECTIONS.LEFT:
                        this.container.x -= this.speed;
                        this.container.rotation = Math.PI;
                        this.container.scale.set(1, -1);

                        break;
                    case DIRECTIONS.RIGHT:
                        this.container.x += this.speed;
                        this.container.rotation = 0;
                        this.container.scale.set(1, 1);

                        break;
                }
            }.bind(this);

        var cellX = this.cell.sprite.x,
            cellY = this.cell.sprite.y,
            actorX = this.container.x,
            actorY = this.container.y;

        // is the actor at the origin of the cell?
        if (cellX === actorX && cellY === actorY) {
            // can the actor move in the direction requested?
            if (this.cell.hasNeighbor(direction)) {
                if (this.cell instanceof PortalCell && this.cell.direction === direction) {
                    // TODO: shit...
                    console.log('portal');

                    return;
                }

                this.direction = direction;
                _move(direction);
            // the actor can not move in the requested direction. Stop the "moving" animation
            } else if (this.can('stopmoving')) {
                this.stopmoving();
            }
        // the actor is not at the origin of the cell they occupy
        } else {
            // is the actor already facing the requested direction?
            if (direction === this.direction) {
                _move(direction);

                var distanceFromCenter = Math.sqrt(
                        Math.pow(this.container.x - this.cell.sprite.x, 2) +
                        Math.pow(this.container.y - this.cell.sprite.y, 2)
                    );

                // Did this move result in the actor leaving their current cell?
                if (distanceFromCenter >= CELL_SIZE / 2) {
                    this.cell = this.cell.getNeighbor(direction);
                }
            } else {
                // requested direction is valid and is the inverse of the current direction,
                // so just invert the direction
                var yOffset = actorY - cellY,
                    xOffset = actorX - cellX;

                if ((yOffset !== 0 && direction > DIRECTIONS.LEFT) || (xOffset && direction <= DIRECTIONS.LEFT)) {
                    this.direction = direction;
                } else {
                    // requested direction is of a different axis than the current one, which requires that the actor
                    // move back to the origin of the current cell before the direction axis can be changed.
                    if (this.direction <= DIRECTIONS.LEFT) {
                        if (xOffset > 0) {
                            this.direction = DIRECTIONS.LEFT;
                        } else {
                            this.direction = DIRECTIONS.RIGHT;
                        }
                    } else {
                        if (yOffset > 0) {
                            this.direction = DIRECTIONS.UP;
                        } else {
                            this.direction = DIRECTIONS.DOWN;
                        }
                    }
                }

                _move(this.direction);
            }
        }
    }
}

StateMachine.create({
	target: Actor.prototype,
	events: [
		{ name: 'startup', from: 'none', to: 'idle' },
		{ name: 'startmoving', from: 'idle', to: 'moving' },
		{ name: 'stopmoving', from: 'moving', to: 'idle' },
	]
});

