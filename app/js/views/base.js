var TYPES = {
        base: 'base'
    };

var BaseView;

BaseView = Ember.Object.extend({
    onRender: function (elapsedTime, deltaTime) {},
    onUpdate: function (elapsedTime, deltaTime) {}
});

BaseView.TYPES = TYPES;

export default BaseView;
export { BaseView, TYPES };
