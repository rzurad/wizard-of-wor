import Cell from 'Cell';

export default class PortalCell extends Cell {
    constructor(config, x, y, direction) {
        super(config, x, y);

        this.direction = direction;
        this.isOpen = false;
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }
}
