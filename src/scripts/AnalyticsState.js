class AnalyticsState {
    workers = [];
    all = 0;
    buffs = 1;
    coef = 1;
    tasks = ["main", "upgrade", "search", "innovation", "component", "performance", "quality", "analysis"];

    addWorker(human) {
        this.workers += human;
        this.all = 0;
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("analytics" in hum) this.all += hum["analytics"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all += hum["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    };

    deleteWorker(name) {
        this.command = 0;
        this.analytics = 0;
        this.technologies = 0;
        for (let hum in this.workers) {
            if (hum.getName === name) this.workers.delete(hum);
        }
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("analytics" in hum) this.all += hum["analytics"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all += hum["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    }
}