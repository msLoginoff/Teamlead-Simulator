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
        const name = human._name;
        let worker;
        worker = this._design.deleteWorker(human, timer);
        if (worker.getName() === name) return worker;
        this._development.deleteWorker(human, timer);
        if (worker.getName() === name) return worker;
        this._analytics.deleteWorker(human, timer);
        if (worker.getName() === name) return worker;
        this._management.deleteWorker(human, timer);
        if (worker.getName() === name) return worker;
    }

    toTask(human, targetTask, state, timer) {
        console.log("toTask");
        if (state === "development") {
            for (let i = 0; i < this._development.poolTasks.length; i++) {
                if (this._development.poolTasks[i] === targetTask) {
                    console.log(this._development.poolTasks[i]);
                    this._development.addWorkerToTask(human, this._development.poolTasks[i], timer);
                    break;
                }
            }
        } else if (state === "analytics") {
            for (let i = 0; i < this._analytics.poolTasks.length; i++) {
                if (this._analytics.poolTasks[i] === targetTask) {
                    console.log(this._analytics.poolTasks[i]);
                    this._analytics.addWorkerToTask(human, this._analytics.poolTasks[i], timer);
                    break;
                }
            }
        } else if (state === "design"){
                for (let i = 0; i < this._design.poolTasks.length; i++) {
                    if (this._design.poolTasks[i] === targetTask) {
                        console.log(this._design.poolTasks[i]);
                        this._design.addWorkerToTask(human, this._design.poolTasks[i], timer);
                        break;
                    }
                }
            } else {
                for (let i = 0; i < this._management.poolTasks.length; i++) {
                    if (this._management.poolTasks[i] === targetTask) {
                        console.log(this._management.poolTasks[i]);
                        this._management.addWorkerToTask(human, this._management.poolTasks[i], timer);
                        break;
                    }
                }
            }
        }

    buffState(state, coef, timer) {
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