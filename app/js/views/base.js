var TYPES = {
        base: 'base'
    };

var BaseView;

BaseView = Ember.Object.extend({
    onRender: function (elapsedTime, deltaTime) {},
    onUpdate: function (elapsedTime, deltaTime) {},
    onAttach: function () {},
    onRestore: function () {}
});

BaseView.TYPES = TYPES;

export default BaseView;
export { BaseView, TYPES };
