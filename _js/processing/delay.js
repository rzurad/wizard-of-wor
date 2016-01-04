import Process from './process';

export default class DelayProcess {
    constructor(delayMs) {
        this.delay = delayMs;
        this.time = 0;
    }

    onUpdate(deltaMs) {
        this.time += deltaMs;

        if (this.time >= this.delay) {
            this.succeed();
        }
    }
}
