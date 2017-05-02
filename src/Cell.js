import { CELL_SIZE } from 'consts';
import 'pixi.js/dist/pixi';

export default class Cell {
	constructor(config, x, y) {
        this.config = config;
        this.sprite = new PIXI.Sprite(
			PIXI.Texture.fromFrame('cell.config' + config + '.png')
		);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.pivot.set(CELL_SIZE / 2, CELL_SIZE / 2);
        this.index = -1;
	}

	hasNeighbor(direction) {
		return (this.config & direction) === direction;
	}
}
