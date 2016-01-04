export default class ProcessManager {
    constructor() {
        this.processes = [];
    }

    detach(process) {
        let index = this.processes.indexOf(process);

        if (index > -1) {
            this.processes.splice(index, 1);
            process.setAttached(false);
        }
    }

    updateProcesses(deltaMs) {
        let i = this.processes.length,
            process,
            successCount = 0,
            failureCount = 0;

        // this shit will break when a process dies, because this is blindly iterating
        // through a list that can potentially change length
        while (i--) {
            process = this.processes[i];

            if (process.state === 'uninitialized') {
                process.onInit();
            }

            if (process.state === 'running') {
                process.onUpdate(deltaMs);
            }

            if (process.isDead) {
                switch (process.state) {
                    case 'succeeded':
                        process.onSuccess();

                        let child = process.removeChild();

                        if (child) {
                            this.attach(child);
                        } else {
                            // a process only counts towards success if the whole chain is completed
                            successCount++;
                        }

                        break;
                    case 'failed':
                        process.onFail();
                        failureCount++;
                        break;
                    case 'aborted':
                        process.onAbort();
                        failureCount++;
                        break;
                }

                this.detach(process);
            }
        }

        return ((successCount << 16) | failureCount);
    }

    abortAllProcesses(immediate) {}

    deleteAllProcesses() {
        while (this.processes.length) {
            this.processes[0].detach();
        }
    }

    isProcessActive(type) {
        return this.processes.some(function (process) {
            return process.type = type && (!process.isDead || process.next);
        });
    }

    attach(process) {
        this.processes.shift(process);
        process.setAttached(true);
    }

    hasProcesses() {
        return !!this.processes.length;
    }
}
