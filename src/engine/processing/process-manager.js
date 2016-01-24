export default class ProcessManager {
    constructor() {
        this._processList = [];
    }

    updateProcesses(deltaMs) {
        let successCount = 0,
            failCount = 0;

        for (let i = this._processList.length - 1; i >= 0; i--) {
            let current = this._processList[i];

            if (current.getState() === Process.UNINITIALIZED) {
                current.onInit();
            }

            if (current.getState() === Process.RUNNING) {
                current.onUpdate(deltaMs);
            }

            if (current.isDead()) {
                switch (current.getState()) {
                    case Process.SUCCEEDED:
                        current.onSuccess();

                        let child = current.removeChild();

                        if (child) {
                            this.attachProcess(child);
                        } else {
                            ++successCount;
                        }

                        break;
                    case Process.FAILED:
                        current.onFail();
                        ++failCount;

                        break;
                    case Process.ABORTED:
                        current.onAbort();
                        ++failCount;

                        break;
                    default:
                        console.warn('Process isDead and in an unknown state!', current.getState(), current);
                }

                current.destroy();
                this._processList.splice(i, 1);
            }
        }

        return (successCount << 16 | failCount);
    }

    attachProcess(process) {
        this._processList.push(process);

        return process;
    }
}
