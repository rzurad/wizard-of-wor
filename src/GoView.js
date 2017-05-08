import EventManager from 'EventManager';

export default class GoView {
    constructor() {
        this.template = [
            '<div class="go">',
                '<p class="terminal-font blue">GO</p>',
            '</div>'
        ].join('');

        const element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element;
        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('click', this.onKeyDown);
    }

    onKeyDown(e) {
        EventManager.global().trigger('RequestViewChange', 'Dungeon');
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('click', this.onKeyDown);
    }

    onUpdateFrame() {}
}
