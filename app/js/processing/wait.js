import Process from 'process';

function WaitProcess(parent, milliseconds) {
    Process.apply(this, Process.TYPES.wait, 0, parent);

    this.start = 0;
    this.stop = milliseconds;
}

WaitProcess.prototype = {
    constructor: WaitProcess,

    onUpdate: function (deltaTime) {
        Process.onUpdate.apply(this, arguments);

        if (this.isActive) {
            this.start += deltaTime * 1000;

            if (this.start >= this.stop) {
                this.kill();
            }
        }
    }
};

Object.setPrototypeOf(WaitProcess.prototype, Process.prototype);

export default WaitProcess;
