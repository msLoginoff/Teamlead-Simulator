import Task from './Task'
import Human from "./Human";
class DevelopmentState{
    mainTask;
    all = 0;
    buffs = 1;
    coef = 1;
    constructor(){
        this.exampleTasks = [new Task(2, {
            "type": "development",
            "description": "Эмоциональное вдохновение",
            "state": "development",
            "number": 1.05
        }),
        new Task(200, {
            "type": "development",
            "description": "Баг чувств всех отделов",
            "state": "development",
            "number": 1.0
        }),
        new Task(200, {
            "type": "development",
            "description": "Баг конечности",
            "state": "development",
            "number": 1.0
        }),
        new Task(200, {
            "type": "development",
            "description": "Анализ контрольной группы на эффект влияния прогресса",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Успешный тест на его анализ",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Захват мозга нейронкой",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Нейронка улучшила прогресс",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Кризисная ситуация из-за ЧП",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Неограниченные знания",
            "state": "development",
            "number": 1.0
        }),
        new Task(2, {
            "type": "development",
            "description": "Тимбилдинг(шашлыки)",
            "state": "development",
            "number": 1.0
        })];
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

    checkEndedTasks(){
        let completedTasks = [];
        for(let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i].task_is_ended()){
                completedTasks.push(this.poolTasks[i]);
                this.exampleTasks.push(this.poolTasks[i]);
                this.poolTasks.splice(i, 1);
            }
        }
        return completedTasks;
    }

    addWorkerToTask(human, targetTask, timer) {
        for(let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i] === targetTask) {
                this.poolTasks[i].addWorker(human, timer);
                break;
            }
        }
        for (let task in this.poolTasks) {
            const worker = task.get_worker();
            if ("command" in worker) this.all += worker["command"];
            if ("innovations" in worker) this.all += worker["innovations"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task of this.poolTasks) task.setCoef(this.coef * this.buffs, timer);
    };

    deleteWorker(human, timer) {
        let isOnTasks = false;
        let worker = new Human();
        for (let i = 0; i < this.poolTasks.length; i++) {
            if (this.poolTasks[i].get_worker() === human) {
                isOnTasks = true;
                worker = human;
                this.poolTasks[i].removeWorker(timer);
                break;
            }
        }

        if(isOnTasks) {
            if ("command" in worker) this.all -= worker["command"];
            if ("analytics" in worker) this.all -= worker["analytics"];
            if ("technologies" in worker) this.all -= worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for (let i= 0; i < this.poolTasks.length; i++) this.poolTasks[i].setCoef(this.coef * this.buffs, timer);
        return worker;
    }

    getBuff(coefficient, timer) {
        this.buffs *= coefficient;
        for (let i= 0; i < this.poolTasks.length; i++) this.poolTasks[i].setCoef(this.coef * this.buffs, timer);
    }

    removeBuff(coefficient, timer) {
        this.buffs /= coefficient;
        for (let i= 0; i < this.poolTasks.length; i++) this.poolTasks[i].setCoef(this.coef * this.buffs, timer);
    }
}

export default DevelopmentState