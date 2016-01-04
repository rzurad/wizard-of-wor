let TYPES = {
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

function defineGetter(obj, name, fn) {
    Object.defineProperty(obj, name, {
        configurable: false,
        writeable: false,
        enumerable: true,
        get: fn
    });
}

export default class Process {
    constructor() {
        this.stateManager = StateMachine.create({
            initial: 'uninitialized', // created but not running
            events: [
                { name: 'removed' }, // removed from the process list, but not destroyed (a process that is already running is parented to another process
                { name: 'running' }, // initialized and running
                { name: 'paused' }, // initialized but paused
                { name: 'succeeded' }, // completed successfully
                { name: 'failed' }, // failed to complete
                { name: 'aborted' } // aborted. may not have started
            ]
        });

        defineGetter(this, 'state', function () {
            return this.stateManager.current;
        });

        defineGetter(this, 'isAlive', function () {
            return ['running', 'paused'].indexOf(this.stateManager.current) > -1;
        });

        defineGetter(this, 'isDead', function () {
            return ['succeeded', 'failed', 'aborted'].indexOf(this.stateManager.current) > -1;
        });

        defineGetter(this, 'isRemoved', function () {
            return this.stateManager.current === 'removed';
        });

        defineGetter(this, 'isRemoved', function () {
            return this.stateManager.current === 'removed';
        });

        defineGetter(this, 'isPaused', function () {
            return this.stateManager.current === 'paused';
        });

        this.next = null;
        this.child = null;
        this.flags = 0;
    }

    onUpdate(deltaMs) {}

    onInitialize() {
        this.stateManager.running();
    }

    onSuccess() {}

    onFail() {}

    onAbort() {}

    // functions for ending the process
    succeed() {}
    fail() {}

    // pause
    pause() {}
    unpause() {}

    // child functions
    attachChild(child) {}
    removeChild() {}
    peekChild() {}

    kill() {
        this.isDead = true;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }

    isAttached() {
        return this.flags & Process.FLAG_ATTACHED ? true : false;
    }

    setAttached(attach) {
        if (attach) {
            this.flags |= Process.FLAG_ATTACHED;
        } else {
            this.flags &= ~Process.FLAG_ATTACHED;
        }
    }
}

Process.TYPES = TYPES;
Process.FLAG_ATTACHED = 1;

export { Process, TYPES };
