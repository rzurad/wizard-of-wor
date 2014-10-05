var TYPES = {
        base: 'base'
    };

function BaseView() {}

BaseView.TYPES = TYPES;
BaseView.prototype = {
    constructor: BaseView,

    onRender: function (elapsedTime, deltaTime) { },
    onUpdate: function (elapsedTime, deltaTime) { }
};

export default BaseView;
export { BaseView, TYPES };
