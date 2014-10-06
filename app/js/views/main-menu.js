// TODO: There should be a UI view that deals with creating a container
// element and inserting it into the DOM and binding all of the events
import { BaseView, TYPES } from 'views/base';

// TODO: Types can probably go away. This isn't C++
// TODO: screenElements can probably go away. If a view can be simple enough
// to handle everything about its container and DOM Event bindings,
// but that depends on how the EventSystem works
//
// TODO: I think in the sense that I'm thinking about Views, I should be calling
// them Screens. What is the difference between Menu, Human, AI, Remote views?
TYPES.main_menu = 'main_menu';

function MainMenuView() {
    BaseView.apply(this, arguments);

    this.type = TYPES.main_menu;
    this.screenElements = [];
    this.container = document.createElement('div');
}

MainMenuView.prototype = {
    constructor: MainMenuView,

    destroy: function () {
        console.warn('`MainMenuView.destroy` not implemented');
    },

    onRender: function (elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onRender` not implemented');
    },

    onUpdate: function (elapsedTime, deltaTime) {
        console.warn('`MainMenuView.onUpdate` not implemented');
    }
};

Object.setPrototypeOf(MainMenuView.prototype, BaseView.prototype);

export default MainMenuView;
