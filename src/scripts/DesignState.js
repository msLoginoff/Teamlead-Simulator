class DesignState{
    workers = [];
    all = 0;
    buffs = 1;
    coef = 1;

    addWorker(human) {
        this.workers += human;
        this.all = 0;
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("visualisation" in hum) this.all += hum["visualisation"];
        }
        for (let hum in this.workers) {
            if ("innovations" in hum) this.all += hum["innovations"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    };

    deleteWorker(human) {
        this.workers += human;
        this.all = 0;
        for (let hum in this.workers) {
            if (hum.getName === name) this.workers.delete(hum);
        }
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("visualisation" in hum) this.all += hum["visualisation"];
        }
        for (let hum in this.workers) {
            if ("innovations" in hum) this.all += hum["innovations"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    };
}