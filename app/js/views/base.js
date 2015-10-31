export default class BaseView {
    onRender(elapsedTime, deltaTime) { console.log('BaseView.onRender does nothing', elapsedTime, deltaTime); }
    onUpdate(elapsedTime, deltaTime) { console.log('BaseView.onUpdate does nothing', elapsedTime, deltaTime); }
    onAttach(viewId, actorId) { console.log('BaseView.onAttach does nothing', viewId, actorId); }

    onRestore() {}
    /*
    onLostDevice: function () {}
    */
}
