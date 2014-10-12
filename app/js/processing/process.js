var TYPES = {
        none: 'none',
        wait: 'wait',
        sprite: 'sprite',
        control: 'control',
        screen: 'screen',
        music: 'music',
        sound: 'sound',
        movement: 'movement',
        game: 'game'
    },

    Process;

Process = Ember.Object.extend({
    isDead: false,
    isActive: true,
    isPaused: false,
    isInitialized: false,
    next: null,
    flags: 0,

    init: function () {},

    onUpdate: function (/* deltaTime */) {},

    onInitialize: function () {},

    kill: function () {
        this.isDead = true;
    },

    togglePause: function () {
        this.isPaused = !this.isPaused;
    },

    isAttached: function () {
        return this.flags & Process.FLAG_ATTACHED ? true : false;
    },

    setAttached: function (attach) {
        if (attach) {
            this.flags |= Process.FLAG_ATTACHED;
        } else {
            this.flags &= ~Process.FLAG_ATTACHED;
        }
    }
});

Process.TYPES = TYPES;
Process.FLAG_ATTACHED = 1;

export { Process, TYPES };
export default Process;
