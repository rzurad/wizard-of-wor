(function () {
    "use strict";

    var CELL_WIDTH = 36,
        CELL_HEIGHT = 36,
        BOARD_WIDTH = 11,
        BOARD_HEIGHT = 6,
        NAV_DIRECTION = {
            UP: 8,
            DOWN: 4,
            LEFT: 2,
            RIGHT: 1
        };

    var cells = [
            5, 3, 3, 7, 7, 3, 13, 3, 7, 10, 13, 3, 11, 7, 14, 5, 11,
            7, 5, 10, 13, 14, 5, 15, 12, 5, 10, 13, 14, 12, 9, 11, 3, 10, 9, 11
        ];


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

        if (this.cell.sprite.x === this.container.x && this.cell.sprite.y === this.container.y) {
            if (this.cell.hasNeighbor(direction)) {
                // TODO: would this move result in traveling through the portal?

                this.direction = direction;
                _move(direction);
            }
        } else {
            if (direction === this.direction) {
                _move(direction);

                // TODO: Did this move result in the actor leaving their current cell?
            } else {
                if ((this.container.y - this.cell.sprite.y !== 0 && direction > NAV_DIRECTION.LEFT) || (this.container.x - this.cell.sprite.x && direction <= NAV_DIRECTION.LEFT)) {
                    this.direction = direction;
                } else {
                    this.direction = direction <= NAV_DIRECTION.LEFT ? (this.container.x - this.cell.sprite.x > 0 ? NAV_DIRECTION.LEFT : NAV_DIRECTION.RIGHT) : (this.container.y - this.cell.sprite.y > 0 ? NAV_DIRECTION.UP : NAV_DIRECTION.DOWN);
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
            yPosition = 18,
            cellsContainer = new PIXI.Container(),
            cell, config;

        cellsContainer.x = CELL_WIDTH;
        cellsContainer.y = 2;

        while (index < dungeon.length) {
            xPosition = ((count % BOARD_WIDTH) * CELL_WIDTH) + 18;
            config = dungeon[index];

            if (direction < 0) {
                config = _invert(config);
            }

            cell = new Cell(config, xPosition, yPosition);

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
        this.sprite.pivot.set(18, 18);
    }

    Cell.prototype.hasNeighbor = function (direction) {
        return (this.config & direction) === direction
    };



    function KeyboardInput() {
        this.keysPressed = {};
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    KeyboardInput.prototype.onKeyDown = function (e) {
        this.keysPressed[e.code] = true;
    };

    KeyboardInput.prototype.onKeyUp = function (e) {
        delete this.keysPressed[e.code];
    };

    KeyboardInput.prototype.destroy = function () {
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
            container;

        board.load(cells);
        board.spawnActor(player);

        container = board.container;
        container.x = app.renderer.view.width / 2;
        container.y = app.renderer.view.height / 2;
        container.pivot.set(container.width / 2, container.height / 2);
        app.stage.addChild(container);
        document.body.appendChild(app.view);

        app.board = board;
        app.player = player;
        app.input = new KeyboardInput();

        app.processInput = function () {
            if (player.can('stopmoving') && !Object.keys(this.input.keysPressed).length) {
                player.stopmoving();
            }

            Object.keys(this.input.keysPressed).forEach(function (code) {
                switch (code) {
                    case 'ArrowLeft': player.move(NAV_DIRECTION.LEFT); break;
                    case 'ArrowRight': player.move(NAV_DIRECTION.RIGHT); break;
                    case 'ArrowUp': player.move(NAV_DIRECTION.UP); break;
                    case 'ArrowDown': player.move(NAV_DIRECTION.DOWN); break;
                }
            });
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
