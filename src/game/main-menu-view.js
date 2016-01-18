import HumanView from '../engine/ui/human-view';
import MainMenuUI from './main-menu-ui';
import { RequestStartGameEvent } from '../engine/event-manager/events';

export default class MainMenuView extends HumanView {
    constructor(renderer) {
        super(...arguments);

        this.pushElement(new MainMenuUI());
    }

    //TODO: this delegate might belong somewhere else...?
    onStartGameClick(e) {
        eventManager.queueEvent(new RequestStartGameEvent());
    }
}
