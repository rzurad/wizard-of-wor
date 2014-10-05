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
    };

function Process(type, oder) {
    var process = Object.create(Process.prototype);

    process.type = type;
    process.isDead = false;
    process.isActive = true;
    process.isPaused = false;
    process.isInitialized = false;
    process.next = null;
    process.flags = 0;
}

Process.TYPES = TYPES;
Process.FLAG_ATTACHED = 1;

Process.prototype = {
    constructor: Process,

    onUpdate: function (/* deltaTime */) {
        if (!this.isInitialized) {
            this.onInitialize();
            this.isInitialized = true;
        }
    },

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
};

export { Process, TYPES };
export default Process;
