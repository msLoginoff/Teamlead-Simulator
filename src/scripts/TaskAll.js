import DesignState from "./DesignState";
import DevelopmentState from "./DevelopmentState";
import AnalyticsState from "./AnalyticsState";
import ManagementState from "./ManagmentState";

class TaskAll{
    _design
    _development
    _analytics
    _management

    constructor() {
        this._design = new DesignState();
        this._development = new DevelopmentState();
        console.log(this._development)
        this._analytics = new AnalyticsState();
        this._management = new ManagementState();
    }
    addHumanToTask(state, human, task) {

    }

    removeHuman(human, timer) {
        const name = human.name;
        let worker;
        worker = this._design.deleteWorker(name, timer);
        if (worker.getName() === name) return worker;
        this._development.deleteWorker(name, timer);
        if (worker.getName() === name) return worker;
        this._analytics.deleteWorker(name, timer);
        if (worker.getName() === name) return worker;
        this._management.deleteWorker(name, timer);
        if (worker.getName() === name) return worker;
    }

    toTask(human, targetTask, state, timer) {
        switch (state) {
            case "development":
                for (let task of this._development) {
                    if (task === targetTask) {
                        this._development.addWorkerToTask(human, task, timer);
                        break;
                    }
                }
                break;
            case "analytics":
                for (let task of this._analytics) {
                    if (task === targetTask) {
                        this._analytics.addTask(human, task, timer);
                        break;
                    }
                }
                break;
            case "design":
                for (let task of this._design) {
                    if (task === targetTask) {
                        this._design.addTask(human, task, timer);
                        break;
                    }
                }
                break;
            case "management":
                for (let task of this._management) {
                    if (task === targetTask) {
                        this._management.addTask(human, task, timer);
                        break;
                    }
                }
                break;
        }
    }

    buffState(state, coef, timer){
        switch(state){
            case "design": {
                this._design.getBuff(coef);
                break;
            }
            case "development": {
                this._development.getBuff(coef);
                break;
            }
            case "analysis": {
                this._analytics.getBuff(coef);
                break;
            }
            default:{
                this._analytics.getBuff(coef);
                this._development.getBuff(coef);
                this._design.getBuff(coef);
                break;
            }
        }
    }
}

export default TaskAll