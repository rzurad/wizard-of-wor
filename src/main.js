(function () {
    "use strict";

    var CELL_WIDTH = 36,
        CELL_HEIGHT = 36,
        WALL_WIDTH = 4,
        BOARD_WIDTH = 11,
        BOARD_HEIGHT = 6,
        LEFT_PORTAL_INDEX = 22,
        RIGHT_PORTAL_INDEX = 32,
        NAV_DIRECTION = {
            UP: 8,
            DOWN: 4,
            LEFT: 2,
            RIGHT: 1
        };

    var dungeons = {
            worrior: [
                [5, 3, 3, 7, 7, 3, 13, 3, 7, 10, 13, 3, 11, 7, 14, 5, 11, 7, 5, 10, 13, 14, 5, 15, 12, 5, 10, 13, 14, 12, 9, 11, 3, 10, 9, 11],
                [5, 6, 5, 3, 7, 3, 12, 13, 15, 3, 15, 3, 11, 14, 13, 6, 9, 7, 5, 14, 9, 14, 5, 11, 12, 13, 7, 15, 11, 7, 9, 11, 10, 9, 3, 11],
                [5, 3, 3, 6, 5, 7, 12, 5, 3, 11, 14, 12, 11, 14, 5, 7, 11, 15, 5, 14, 12, 13, 3, 11, 12, 13, 15, 15, 3, 7, 9, 11, 10, 9, 3, 11],
                [5, 6, 5, 3, 7, 3, 12, 13, 10, 5, 15, 3, 11, 15, 7, 14, 13, 3, 5, 14, 12, 12, 13, 7, 12, 12, 13, 15, 10, 12, 9, 11, 10, 9, 3, 11],
                [5, 3, 6, 5, 3, 7, 13, 3, 15, 15, 7, 15, 11, 7, 10, 12, 12, 12, 5, 10, 5, 14, 13, 15, 13, 3, 10, 13, 14, 12, 9, 3, 3, 10, 9, 11],
                [5, 7, 7, 7, 7, 7, 12, 12, 12, 12, 12, 12, 11, 15, 14, 9, 14, 12, 5, 14, 9, 7, 15, 15, 12, 13, 6, 13, 10, 12, 9, 10, 9, 11, 3, 11],
                [5, 3, 7, 7, 3, 7, 12, 5, 11, 14, 5, 11, 11, 14, 5, 15, 15, 3, 5, 11, 14, 12, 9, 7, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3],
                [5, 6, 5, 3, 7, 3, 12, 9, 14, 5, 11, 7, 11, 3, 14, 9, 6, 12, 5, 7, 11, 3, 14, 12, 12, 13, 7, 7, 15, 11, 9, 10, 9, 10, 9, 3],
                [5, 3, 6, 5, 3, 7, 12, 5, 15, 11, 3, 15, 15, 10, 13, 3, 6, 12, 13, 3, 14, 5, 11, 15, 12, 5, 11, 15, 6, 12, 9, 11, 3, 10, 9, 11],
                [5, 3, 6, 5, 3, 7, 12, 5, 11, 15, 3, 15, 11, 14, 5, 15, 6, 12, 5, 11, 14, 12, 12, 12, 13, 3, 15, 10, 13, 15, 9, 3, 11, 3, 10, 8],
                [5, 3, 6, 5, 7, 3, 13, 3, 14, 12, 9, 7, 11, 6, 13, 15, 7, 11, 5, 11, 10, 12, 13, 3, 13, 3, 7, 15, 15, 3, 9, 3, 11, 10, 9, 3],
                [5, 3, 6, 5, 3, 7, 13, 3, 11, 14, 5, 11, 11, 7, 7, 15, 15, 7, 5, 10, 12, 12, 12, 12, 13, 3, 15, 14, 9, 15, 9, 3, 10, 9, 3, 11],
                [5, 3, 6, 5, 3, 7, 13, 3, 11, 15, 6, 12, 11, 7, 3, 14, 13, 15, 5, 11, 6, 13, 10, 12, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3]
            ],

            worlord: [
                [5, 7, 3, 7, 7, 7, 13, 14, 5, 11, 10, 12, 15, 10, 12, 5, 7, 15, 13, 7, 11, 10, 13, 15, 13, 14, 5, 7, 15, 15, 9, 11, 11, 11, 11, 11],
                [5, 3, 7, 7, 3, 7, 13, 6, 9, 15, 7, 11, 15, 15, 7, 11, 15, 7, 13, 15, 15, 6, 9, 15, 13, 14, 13, 15, 6, 12, 9, 11, 11, 11, 11, 11],
                [5, 7, 7, 7, 3, 7, 13, 10, 9, 15, 6, 12, 15, 6, 5, 10, 9, 15, 12, 9, 15, 6, 5, 15, 13, 6, 13, 15, 15, 15, 9, 11, 11, 11, 11, 11],
                [5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 7, 14, 5, 15, 13, 15, 10, 13, 11, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11],
                [5, 7, 7, 7, 7, 7, 12, 13, 14, 12, 13, 15, 14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12, 13, 15, 14, 12, 13, 15, 9, 11, 11, 11, 11, 11],
                [5, 7, 7, 7, 7, 7, 12, 9, 15, 10, 13, 15, 15, 6, 13, 7, 14, 12, 13, 11, 14, 9, 14, 12, 12, 5, 15, 6, 13, 15, 9, 11, 11, 11, 11, 11],
                [5, 7, 7, 7, 3, 7, 13, 15, 15, 10, 5, 15, 15, 15, 10, 5, 15, 15, 13, 10, 5, 15, 10, 12, 13, 7, 15, 10, 5, 15, 9, 11, 11, 3, 11, 11],
                [5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 6, 12, 5, 15, 13, 15, 10, 12, 9, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11],
                [5, 3, 7, 7, 7, 3, 13, 7, 11, 14, 13, 3, 14, 13, 7, 11, 15, 7, 12, 13, 11, 7, 15, 11, 13, 11, 7, 14, 13, 3, 9, 3, 11, 11, 11, 3]
            ],

            arena: [5, 3, 7, 7, 3, 7, 13, 3, 10, 13, 7, 15, 15, 3, 7, 15, 15, 15, 13, 6, 9, 15, 11, 11, 12, 13, 7, 15, 7, 3, 9, 10, 9, 10, 9, 3],
            pit: [5, 7, 7, 7, 7, 7, 13, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 9, 11, 11, 11, 11, 11]
        };



    var ACTOR_STATES = {
            IDLE: 'IDLE',
            MOVING: 'MOVING',
            FIRING: 'FIRING',
            DIEING: 'DIEING'
        };

    function Actor() {
        this.sprites = {};
        this.container = new PIXI.Container();
        this.container.pivot.set(12, 12);
        this.speed = 2;
        this.direction = NAV_DIRECTION.RIGHT;
        this.cell = null;
    }

    Actor.prototype.setCell = function (cell) {
        this.cell = cell;
    };

    Actor.prototype.warpToCell = function (cell) {
        this.setCell(cell);
        this.container.x = cell.sprite.x;
        this.container.y = cell.sprite.y;
    };

    Actor.prototype.onstartmoving = function (event, from, to) {
        this.sprites.moving.play();
    };

    Actor.prototype.onstopmoving = function (event, from, to) {
        this.sprites.moving.stop();
    };

    Actor.prototype.onbeforestartup = function (event, from, to) {
        this.container.addChild(this.sprites.moving);
    };

    Actor.prototype.move = function (direction) {
        var _move = function (direction) {
                if (this.current === 'idle') {
                    this.startmoving();
                }

                switch (direction) {
                    case NAV_DIRECTION.UP:
                        this.container.y -= this.speed;
                        this.container.rotation = -(Math.PI / 2);
                        this.container.scale.set(1, 1);

                        break;
                    case NAV_DIRECTION.DOWN:
                        this.container.y += this.speed;
                        this.container.rotation = Math.PI / 2;
                        this.container.scale.set(1, -1);
                        
                        break;
                    case NAV_DIRECTION.LEFT:
                        this.container.x -= this.speed;
                        this.container.rotation = Math.PI;
                        this.container.scale.set(1, -1);
                        
                        break;
                    case NAV_DIRECTION.RIGHT:
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
                    // this.warpToCell(direction === NAV_DIRECTION.LEFT ? RIGHT_PORTAL_INDEX : LEFT_PORTAL_INDEX);
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
                if (distanceFromCenter >= CELL_WIDTH / 2) {
                    this.cell = this.cell.getNeighbor(direction);
                }
            } else {
                // requested direction is valid and is the inverse of the current direction,
                // so just invert the direction
                var yOffset = actorY - cellY,
                    xOffset = actorX - cellX;

                if ((yOffset !== 0 && direction > NAV_DIRECTION.LEFT) || (xOffset && direction <= NAV_DIRECTION.LEFT)) {
                    this.direction = direction;
                } else {
                    // requested direction is of a different axis than the current one, which requires that the actor
                    // move back to the origin of the current cell before the direction axis can be changed.
                    if (this.direction <= NAV_DIRECTION.LEFT) {
                        if (xOffset > 0) {
                            this.direction = NAV_DIRECTION.LEFT;
                        } else {
                            this.direction = NAV_DIRECTION.RIGHT;
                        }
                    } else {
                        if (yOffset > 0) {
                            this.direction = NAV_DIRECTION.UP;
                        } else {
                            this.direction = NAV_DIRECTION.DOWN;
                        }
                    }
                }

                _move(this.direction);
            }
        }
    };

    StateMachine.create({
        target: Actor.prototype,
        events: [
            { name: 'startup', from: 'none', to: 'idle' },
            { name: 'startmoving', from: 'idle', to: 'moving' },
            { name: 'stopmoving', from: 'moving', to: 'idle' },
        ]
    });



    function Player() {
        Actor.apply(this, arguments);

        this.sprites.moving = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('worrior-one.walk1.png'),
            PIXI.Texture.fromFrame('worrior-one.walk2.png'),
            PIXI.Texture.fromFrame('worrior-one.walk3.png')
        ]);

        this.sprites.moving.animationSpeed = 0.25;
        this.sprites.idle = this.sprites.moving;
        this.startup();
    }

    Object.setPrototypeOf(Player.prototype, Actor.prototype);



    function Board() {
        this.cells = [];
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('board.png'));
        this.container.addChild(this.sprite);
    }

    Board.prototype.spawnActor = function (actor) {
        actor.warpToCell(this.cells[5]);
        this.container.children[1].addChild(actor.container);
    };

    Board.prototype.load = function (dungeon) {
        function _invert(config) {
            if ((config & 3) === NAV_DIRECTION.LEFT || (config & 3) === NAV_DIRECTION.RIGHT) {
                return (config & 0xFC) + ((config & 0x03) ^ 3);
            }

            return config;
        }

        var index = 0,
            direction = 1,
            count = 0,
            xPosition = 0,
            yPosition = CELL_HEIGHT / 2,
            cellsContainer = new PIXI.Container(),
            cell, config, board = this;

        cellsContainer.x = CELL_WIDTH;
        cellsContainer.y = WALL_WIDTH / 2;

        function _getNeighbor(direction) {
            var neighbor = null;

            if (this.hasNeighbor(direction)) {
                switch (direction) {
                    case NAV_DIRECTION.UP: neighbor = board.cells[this.index - 11]; break;
                    case NAV_DIRECTION.DOWN: neighbor = board.cells[this.index + 11]; break;
                    case NAV_DIRECTION.LEFT: neighbor = board.cells[this.index - 1]; break;
                    case NAV_DIRECTION.RIGHT: neighbor = board.cells[this.index + 1]; break;
                }
            }

            return neighbor;
        }

        while (index < dungeon.length) {
            xPosition = ((count % BOARD_WIDTH) * CELL_WIDTH) + (CELL_WIDTH / 2);
            config = dungeon[index];

            if (direction < 0) {
                config = _invert(config);
            }

            if (count === LEFT_PORTAL_INDEX) {
                cell = new PortalCell(config, xPosition, yPosition, NAV_DIRECTION.LEFT);
            } else if (count === RIGHT_PORTAL_INDEX) {
                cell = new PortalCell(config, xPosition, yPosition, NAV_DIRECTION.RIGHT);
            } else {
                cell = new Cell(config, xPosition, yPosition);
            }

            cell.index = count;
            cell.getNeighbor = _getNeighbor;

            if ((index + direction) % BOARD_HEIGHT === 0 && direction > 0) {
                direction *= -1;
                index += direction;
            } else if (index % BOARD_HEIGHT === 0 && direction < 0) {
                direction *= -1;
                index += BOARD_HEIGHT;
                yPosition += CELL_HEIGHT;
            } else {
                index += direction;
            }

            cellsContainer.addChild(cell.sprite);
            this.cells.push(cell);

            count++;
        }

        this.container.addChild(cellsContainer);
    };



    function Cell(config, x, y) {
        this.config = config;
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('cell.config' + config + '.png'));
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.pivot.set(CELL_WIDTH / 2, CELL_HEIGHT / 2);
        this.index = -1;
    }

    Cell.prototype.hasNeighbor = function (direction) {
        return (this.config & direction) === direction
    };



    function PortalCell(config, x, y, direction) {
        Cell.apply(this, arguments);

        this.direction = direction;
        this.isOpen = false;
    }

    PortalCell.prototype.open = function () {
        this.isOpen = true;
    }

    PortalCell.prototype.close = function () {
        this.isOpen = false;
    }

    Object.setPrototypeOf(PortalCell.prototype, Cell.prototype);



    function Input() {
        var keyStack = [],
            keysPressed = {},
            moveKeys = {
                ArrowLeft: NAV_DIRECTION.LEFT,
                ArrowRight: NAV_DIRECTION.RIGHT,
                ArrowUp: NAV_DIRECTION.UP,
                ArrowDown: NAV_DIRECTION.DOWN
            }

        this.direction = 0;
        this.firing = false;

        this.onKeyDown = function (e) {
            if (e.code in moveKeys && !keysPressed[e.code]) {
                keyStack.push(e.code);
                keysPressed[e.code] = true;

                this.direction = moveKeys[e.code];
            }
        }.bind(this);

        this.onKeyUp = function (e) {
            if (e.code in moveKeys && keysPressed[e.code]) {
                keyStack.splice(keyStack.indexOf(e.code), 1);
                delete keysPressed[e.code];

                this.direction = moveKeys[keyStack[keyStack.length - 1]] || 0;
            }
        }.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    Input.prototype.destroy = function () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    };



    function setup() {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        var app = new PIXI.Application({
                width: 500,
                height: 350
            });

        var board = new Board(),
            player = new Player(),
            dungeon = (function (d) { return d[~~(Math.random() * d.length)]; }(dungeons.worrior)),
            container;

        board.load(dungeon);
        board.spawnActor(player);

        container = board.container;
        container.x = app.renderer.view.width / 2;
        container.y = app.renderer.view.height / 2;
        container.pivot.set(container.width / 2, container.height / 2);
        app.stage.addChild(container);
        document.body.appendChild(app.view);

        app.board = board;
        app.player = player;
        app.input = new Input();

        app.processInput = function () {
            if (player.can('stopmoving') && !this.input.direction) {
                player.stopmoving();
            }

            if (this.input.direction) {
                player.move(this.input.direction);
            }
        };

        return app;
    }



    PIXI.loader.add('../assets/wizard.json').load(function () {
        var app = setup();

        (function gameLoop() {
            requestAnimationFrame(gameLoop);
            app.processInput();
        }());
    });
}());
