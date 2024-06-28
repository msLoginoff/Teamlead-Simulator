import Task from './Task'
import Human from "./Human";
class ManagementState {
    all = 0;
    buffs = 1;
    coef = 1;
    exampleTasks;
    constructor(){
        this.exampleTasks = [
            new Task(1, {"description": "Выиграли грант", "type": ["management"], "number": [1.0]}),
            new Task(1, {"description": "Появление спонсора", "type": ["management"], "number": [1.0]}),
            new Task(1, {"description": "Организация IT выходных", "type": ["management"], "number": [1.0]}),
            new Task(1, {"description": "Приглашение эксперта по рефреймингу", "type": ["management"], "number": [1.0]}),
            new Task(1, {"description": "Страхование от судебных рисков", "type": ["management"], "number":[1.0]}),
            new Task(1, {"description": "Защита авторского права", "type": ["management"], "number":[1.0]}),
            new Task(1, {"description": "Необходимость перераспределения бюджета", "type" : ["management"], "number":[1.0]}),
            new Task(1, {"description": "Пересмотр тайм-менеджмента", "type": ["management"], "number":[1.0]}),
            new Task(1, {"description": "Расстановка приоритетов", "type": ["management"], "number":[1.0]}),
        ]
    }
    poolTasks = [];

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addTask() {
        if (this.poolTasks.length < 3) {
            const rndm = this.getRandomNumber(0, this.exampleTasks.length - 1);
            this.poolTasks.push(this.exampleTasks[rndm]);
            this.exampleTasks.splice(rndm, 1);
        }
    }

    addWorkerToTask(human, task, timer) {
        //this.poolTasks[index].addWorker(human,index); //todo fix index
        for (let task in this.poolTasks){
            const worker = task.get_worker();
            if ("command" in worker) this.all += worker["command"];
            if ("visualisation" in worker) this.all += worker["visualisation"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    };
//
    checkEndedTasks(){
        let completedTasks = [];
        for(let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i].task_is_ended()){
                completedTasks.push(this.poolTasks[i]);
                this.poolTasks[i] = this.exampleTasks[i];
                this.poolTasks.splice(i, 1);
            }
        }
        return completedTasks;
    }

//
    deleteWorker(name, timer) {
        let isOnTasks = false;
        let worker = new Human();
        for (const task in this.poolTasks) {
            if (task.get_worker().name === name) {
                isOnTasks = true;
                worker = task.get_worker();
                task.removeWorker(timer);
            }
            break;
        }

        if(isOnTasks){
            if ("command" in worker) this.all -= worker["command"];
            if ("analytics" in worker) this.all -= worker["analytics"];
            if ("technologies" in worker) this.all -= worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    }

    getBuff(coefficient, timer) {
        this.buffs *= coefficient;
        for (let task in this.poolTasks){task.setCoef(this.coef * this.buffs, timer);}
    }

    removeBuff(coefficient, timer) { // сделать в TaskAll
        this.buffs /= coefficient;
        for (let task in this.poolTasks){task.setCoef(this.coef * this.buffs, timer);}
    }
}

export default ManagementState