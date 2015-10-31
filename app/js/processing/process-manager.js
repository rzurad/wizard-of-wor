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

    updateProcesses(deltaTime) {
        let i = this.processes.length,
            process;

        while (i--) {
            process = this.process[i];

            if (process.isDead) {
                if (process.next) {
                    this.attach(next);
                    process.next = null;
                }

                this.detach(process);
            } else if (process.isActive && !process.isPaused) {
                if (!process.isInitialized) {
                    process.onInitialize();
                    process.isInitialized = true;
                }

                process.onUpdate(deltaTime);
            }
        }
    }

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
