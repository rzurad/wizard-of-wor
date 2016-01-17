// Clock class, taken from THREE.js:
// https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
export default class Clock {
    constructor(autoStart) {
        this.autoStart = !!autoStart;

        this._startTime = 0;
        this._oldTime = 0;
        this._elapsedTime = 0;

        this.running = false;
    }

    start() {
        this._startTime = self.performance.now();

        this._oldTime = this._startTime;
        this.running = true;
    }

    stop() {
        this.getElapsedTime();
        this.running = false;
    }

    getElapsedTime() {
        this.getDelta();

        return this._elapsedTime;
    }

    getDelta() {
        let diff = 0;

        if (this.autoStart && !this.running) {
            this.start();
        }

        if (this.running) {
            let newTime = self.performance.now();

            diff = 0.001 * (newTime - this.oldTime);
            this._oldTime = newTime;

            this._elapsedTime += diff;
        }

        return diff;
    }
}
