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

    removeHuman(name, timer) {
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

    toTask(human, index, state, timer) {
        switch (state) {
            case "development":
                this._development.addWorkerToTask(human, index, timer);
                break;
            case "analytics":
                this._analytics.addWorkerToTask(human, index, timer);
                break;
            case "design":
                this._design.addWorkerToTask(human, index, timer);
                break;
            case "management":
                this._management.addWorkerToTask(human, index, timer);
        }
    }

    buffState(state, coef){
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