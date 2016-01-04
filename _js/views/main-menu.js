// TODO: There should be a UI view that deals with creating a container
// element and inserting it into the DOM and binding all of the events
import HumanView from './human';

// TODO: screenElements can probably go away. If a view can be simple enough
// to handle everything about its container and DOM Event bindings,
// but that depends on how the EventSystem works
export default class MainMenuView extends HumanView {
    constructor() {
        super();

        //this.mainMenuUI = new MainMenuUI();
        //this.pushElement(mainMenuUI);
    }

    onRender(elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onRender` not implemented', elapsedTime, deltaTime);
    }

    onUpdate(elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onUpdate` not implemented', elapsedTime, deltaTime);
    }
}
