import Process from 'process';

var WaitProcess;

WaitProcess = Process.extend({
    start: 0,
    stop: 0,
    type: Process.TYPES.wait,

    onUpdate: function (deltaTime) {
        if (this.isActive) {
            this.start += deltaTime * 1000;

            if (this.start >= this.stop) {
                this.kill();
            }
        }
    }
});

export default WaitProcess;
