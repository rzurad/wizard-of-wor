import EventManager from 'EventManager';

export default class GetReadyView {
    constructor() {
        this.template = [
            '<div class="getready">',
                '<p class="terminal-font blue">GET</p>',
                '<p class="terminal-font yellow">READY</p>',
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

    destroy() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('click', this.onKeyDown);
    }

    requestViewChange() {
        PIXI.sound.stopAll();
        clearTimeout(this.timeoutId);
        EventManager.global().trigger('RequestViewChange', 'Go');
    }

    onAttach() {
        this.timeoutId = setTimeout(this.requestViewChange.bind(this), 3210); 
        PIXI.sound.play('getready');
    }

    onUpdateFrame() {}
}
