import Process from './process';

export default class WaitProcess extends Process.extend {
    onUpdate(deltaTime) {
        this.start = 0;
        this.stop = 0;
        this.type = Process.TYPES.wait;

        if (this.isActive) {
            this.start += deltaTime * 1000;

            if (this.start >= this.stop) {
                this.kill();
            }
        }
    }
}
