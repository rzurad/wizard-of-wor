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
        this.timeoutId;
        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('click', this.onKeyDown);
    }

    onKeyDown(e) {
        this.requestViewChange();
    }

    requestViewChange() {
        PIXI.sound.stopAll();
        clearTimeout(this.timeoutId);
        EventManager.global().trigger('RequestViewChange', 'Dungeon');
    }

    onAttach() {
        this.timeoutId = setTimeout(this.requestViewChange.bind(this), 1810);
        PIXI.sound.play('go');
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('click', this.onKeyDown);
    }

    onUpdateFrame() {}
}
