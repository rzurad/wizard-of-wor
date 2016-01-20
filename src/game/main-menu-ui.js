import BaseUI from '../engine/ui/base-ui';

export default class MainMenuUI extends BaseUI {
    constructor() {
        super(...arguments);

        console.warn('`MainMenuUI` constructor not implemented');
    }

    onRestore() {
        console.warn('`MainMenuUI.onRestore` method not implemented');
    }

    onUpdate(deltaMs) {
        console.warn('`MainMenuUI.onUpdate` method not implemented');
    }
}
