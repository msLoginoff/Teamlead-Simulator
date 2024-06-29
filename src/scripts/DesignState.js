import Task from "./Task";
import Human from "./Human";
class DesignState{
    all = 0;
    buffs = 1;
    coef = 1;
    exampleTasks;
    constructor(){
        this.exampleTasks = [
            new Task(1, {"description": "Нейронный дальтонизм", "type": "design", "state": "design", "number": 1.0}),
            new Task(1, {"description": "Шрифт для дизайна нейроинтерфейса", "type": "design","state": "design", "number": 1.0}),
            new Task(1, {"description": "Изменение трендов", "type": "design", "state": "design","number": 1.0}),
            new Task(1, {"description": "Экспериментальный дизайн", "type": "design","state": "design", "number": 1.0}),
            new Task(1, {"description": "Упоролись дизайном", "type": "design","state": "design", "number":1.0}),
            new Task(1, {"description": "Пялить в монитор", "type": "design","state": "design", "number":1.0}),
            new Task(1, {"description": "Выпить латте", "type" : "design", "state": "design","number":1.0}),
            new Task(1, {"description": "Починить макбук", "type": "design","state": "design", "number":1.0})
        ]
    }
    poolTasks = [];

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addTask() {
        if (this.poolTasks.length < 8) {
            const rndm = this.getRandomNumber(0, this.exampleTasks.length - 1);
            this.poolTasks.push(this.exampleTasks[rndm]);
            this.exampleTasks.splice(rndm, 1);
        }
    }

    async addWorkerToTask(human, task, timer) {
        const worker = human;
        for (let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i] === task) {
                this.poolTasks[i].addWorker(human, timer);
                break;
            }
        }
        if ("command" in worker) this.all += worker["command"];
        if ("visualisation" in worker) this.all += worker["visualisation"];
        if ("technologies" in worker) this.all += worker["technologies"];

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task of this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    };
//
    checkEndedTasks(){
        let completedTasks = [];
        for(let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i].task_is_ended()){
                completedTasks.push(this.exampleTasks[i]);
                this.exampleTasks.push(new Task(this.poolTasks[i]._timefull, this.poolTasks[i]._result));
                this.poolTasks.splice(i, 1);
            }
        }
        return completedTasks;
    }

//
    deleteWorker(human, timer) {
        let name = human._name;
        let isOnTasks = false;
        let worker = new Human();
        for (let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i].get_worker()._name === name) {
                isOnTasks = true;
                worker = this.poolTasks[i].get_worker();
                this.poolTasks[i].removeWorker(timer);
                break;
            }
        }

        if(isOnTasks){
            if ("command" in worker) this.all -= worker["command"];
            if ("analytics" in worker) this.all -= worker["analytics"];
            if ("technologies" in worker) this.all -= worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task of this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
        return worker;
    }

    getBuff(coefficient, timer) {
        this.buffs *= coefficient;
        for (let task of this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    }

    removeBuff(coefficient, timer) {
        this.buffs /= coefficient;
        for (let task of this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    }
}

export default DesignState