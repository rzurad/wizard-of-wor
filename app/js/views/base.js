var TYPES = {
        base: 'base'
    };

function BaseView() {}

BaseView.TYPES = TYPES;
BaseView.prototype = {
    constructor: BaseView,

    onRender: function (elapsedTime, deltaTime) {
        if (this.constructor === BaseView) {
            throw new Error('You should not be instantiating `BaseView`s');
        } else {
            console.warn("You shouldn't be calling `BaseView.onRender` on ", this);
        }
    },

    onUpdate: function (elapsedTime, deltaTime) {
        if (this.constructor === BaseView) {
            throw new Error('You should not be instantiating `BaseView`s');
        } else {
            console.warn("You shouldn't be calling `BaseView.onUpdate` on ", this);
        }
    }
};

export default BaseView;
export { BaseView, TYPES };
