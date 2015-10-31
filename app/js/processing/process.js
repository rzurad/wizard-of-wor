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

export default class Process {
    construct() {
        this.isDead = false;
        this.isActive = true;
        this.isPaused = false;
        this.isInitialized = false;
        this.next = null;
        this.flags = 0;
    }

    onUpdate(/* deltaTime */) {}

    onInitialize() {}

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
