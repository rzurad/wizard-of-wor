import EventManager from 'EventManager';
import GoView from 'GoView';
import GetReadyView from 'GetReadyView';
import DungeonView from 'DungeonView';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Application {
    constructor(config) {
        this.element = document.querySelector('#game-container');
        this.onRequestViewChange = this.onRequestViewChange.bind(this);

        EventManager.global().on('RequestViewChange', this.onRequestViewChange);
        EventManager.global().trigger('RequestViewChange', 'GetReady');
    }

    changeView(view) {
        if (this.view) {
            this.view.destroy();
        }

        this.view = view;
        this.element.innerHTML = '';
        this.element.appendChild(view.element);
    }

    onRequestViewChange(event) {
        let View;

        switch (event.data) {
            case 'GetReady': View = GetReadyView; break;
            case 'Go': View = GoView; break;
            case 'Dungeon': View = DungeonView; break;
            default: throw new Error('unknown view: ' + name);
        }

        this.changeView(new View());
    }

    onUpdateFrame() {
        this.view.onUpdateFrame();
    }
}
