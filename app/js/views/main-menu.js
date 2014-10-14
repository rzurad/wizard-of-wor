// TODO: There should be a UI view that deals with creating a container
// element and inserting it into the DOM and binding all of the events
import HumanView from 'views/human';

// TODO: screenElements can probably go away. If a view can be simple enough
// to handle everything about its container and DOM Event bindings,
// but that depends on how the EventSystem works

var MainMenuView;

MainMenuView = HumanView.extend({
    type: TYPES.main_menu,

    init: function () {
        var mainMenuUI = MainMenuUI.create();

        this._super();

        this.set('mainMenuUI', mainMenuUI);
        this.pushElement(mainMenuUI);
    },

    onRender: function (elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onRender` not implemented');
    },

    onUpdate: function (elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onUpdate` not implemented');
    }
});

export default MainMenuView;
