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



    function Player() {
        this.sprite = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('worrior-one.walk1.png'),
            PIXI.Texture.fromFrame('worrior-one.walk2.png'),
            PIXI.Texture.fromFrame('worrior-one.walk3.png')
        ]);

        this.sprite.anchor.set(0.5);
        this.state = 'IDLE';
        this.speed = 3;
    }

    Player.prototype.move = function (direction) {
        switch (direction) {
            case NAV_DIRECTION.UP: this.sprite.y -= this.speed; break;
            case NAV_DIRECTION.DOWN: this.sprite.y += this.speed; break;
            case NAV_DIRECTION.LEFT: this.sprite.x -= this.speed; break;
            case NAV_DIRECTION.RIGHT: this.sprite.x += this.speed; break;
        }
    };



    function Board() {
        this.cells = [];
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('board.png'));
        this.container.addChild(this.sprite);
    }

    Board.prototype.spawnActor = function (actor) {
        this.container.children[1].addChild(actor.sprite);
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
            yPosition = 0,
            cellsContainer = new PIXI.Container(),
            cell, config;

        cellsContainer.x = CELL_WIDTH;
        cellsContainer.y = 2;

        while (index < dungeon.length) {
            xPosition = (count % BOARD_WIDTH) * CELL_WIDTH;
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
    }



    function KeyboardInput() {
        this.keysPressed = {};
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    KeyboardInput.prototype.onKeyDown = function (e) {
        e.preventDefault();
        this.keysPressed[e.code] = true;
    };

    KeyboardInput.prototype.onKeyUp = function (e) {
        e.preventDefault();
        delete this.keysPressed[e.code];
    };

    KeyboardInput.prototype.destroy = function () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    };



    function setup() {
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
