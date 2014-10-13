var TYPES = {
        base: 'base'
    };

var BaseView;

BaseView = Ember.Object.extend({
    onRender: function (elapsedTime, deltaTime) {},
    onUpdate: function (elapsedTime, deltaTime) {},
    onAttach: function (viewId, actorId) {},

    /*
    onRestore: function () {},
    onLostDevice: function () {}
    */
});

BaseView.TYPES = TYPES;

export default BaseView;
export { BaseView, TYPES };
