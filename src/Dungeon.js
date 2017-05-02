import Cell from 'Cell';
import PortalCell from 'PortalCell';
import { DIRECTIONS, CELL_SIZE } from 'consts';
import 'pixi.js/dist/pixi';

const LEFT_PORTAL_INDEX = 22;
const RIGHT_PORTAL_INDEX = 32;
const WALL_WIDTH = 4;
const BOARD_HEIGHT = 6;
const BOARD_WIDTH = 11;

export default class Dungeon {
    constructor() {
        this.cells = [];
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('board.png'));
        this.sprite.alpha = 0;
        this.container.addChild(this.sprite);
    }

	spawnActor(actor) {
        actor.warpToCell(this.cells[5]);
        this.container.children[1].addChild(actor.container);
	}

    load(layout) {
        function _invert(config) {
            if ((config & 3) === DIRECTIONS.LEFT || (config & 3) === DIRECTIONS.RIGHT) {
                return (config & 0xFC) + ((config & 0x03) ^ 3);
            }

            return config;
        }

        var index = 0,
            direction = 1,
            count = 0,
            xPosition = 0,
            yPosition = CELL_SIZE / 2,
            cellsContainer = new PIXI.Container(),
            cell, config, board = this;

        cellsContainer.x = CELL_SIZE;
        cellsContainer.y = WALL_WIDTH / 2;

        function _getNeighbor(direction) {
            var neighbor = null;

            if (this.hasNeighbor(direction)) {
                switch (direction) {
                    case DIRECTIONS.UP: neighbor = board.cells[this.index - 11]; break;
                    case DIRECTIONS.DOWN: neighbor = board.cells[this.index + 11]; break;
                    case DIRECTIONS.LEFT: neighbor = board.cells[this.index - 1]; break;
                    case DIRECTIONS.RIGHT: neighbor = board.cells[this.index + 1]; break;
                }
            }

            return neighbor;
        }

        while (index < layout.length) {
            xPosition = ((count % BOARD_WIDTH) * CELL_SIZE) + (CELL_SIZE / 2);
            config = layout[index];

            if (direction < 0) {
                config = _invert(config);
            }

            if (count === LEFT_PORTAL_INDEX) {
                cell = new PortalCell(config, xPosition, yPosition, DIRECTIONS.LEFT);
            } else if (count === RIGHT_PORTAL_INDEX) {
                cell = new PortalCell(config, xPosition, yPosition, DIRECTIONS.RIGHT);
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
                yPosition += CELL_SIZE;
            } else {
                index += direction;
            }

            cellsContainer.addChild(cell.sprite);
            this.cells.push(cell);

            count++;
        }

        this.container.addChild(cellsContainer);
    }
}
