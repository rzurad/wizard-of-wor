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

    var cells = [5, 3, 3, 7, 7, 3, 13, 3, 7, 10, 13, 3, 11, 7, 14, 5, 11, 7, 5, 10, 13, 14, 5, 15, 12, 5, 10, 13, 14, 12, 9, 11, 3, 10, 9, 11];

    function Board() {
        this._cells = [];

        // TODO: Spawn board sprite
    }

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
            yPosition = CELL_WIDTH / 2,
            cell, config;

        while (index < dungeon.length) {
            xPosition = ((count % BOARD_WIDTH) * CELL_WIDTH) + (CELL_WIDTH / 2);
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

            // TODO: make sure the Cell's sprite is added as a part of the board's PIXI Container
            app.stage.addChild(cell.sprite);

            count++;
        }
    };

    function Cell(config, x, y) {
        this.config = config;
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('cell.config' + config + '.png'));
        this.sprite.x = x;
        this.sprite.y = y;
    }


    var app;

    function setup() {
        // TODO: smell
        app = new PIXI.Application({
            width: 720,
            height: 480
        });

        var board = new Board();

        board.load(cells);

        document.body.appendChild(app.view);
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);
    }



    PIXI.loader.add('../assets/wizard.json').load(function () {
        setup();
        gameLoop();
    });
}());
