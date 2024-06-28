import Task from './Task'
import Human from "./Human";
class AnalyticsState {
    all = 0;
    buffs = 1;
    coef = 1;
    exampleTasks;
    constructor() {
        this.exampleTasks = [new Task(360, {
            "description": "Улучшение инструментов по разработке",
            "type": "development",
            "number": 1.1
        }),
            new Task(180, {
                "description": "Нахождение новых способов для визуализации информации",
                "type": "design",
                "number": 1.1
            }),
            new Task(180, {
                "description": "Внедрение новых технологий проектирования",
                "type": "all",
                "number": 1.05
            }),
            new Task(720, {
                "description": "Изучение рынка компонентов для нейроинтерфейсов",
                "type": "development",
                "number": 1.2
            }),
            new Task(160, {"description": "Улучшение производительности работников", "type": "all", "number": 1.02}),
            new Task(90, {
                "description": "Проверка качества разработки и составление метрик",
                "type": "development",
                "number": 1.05
            }),
            new Task(180, {"description": "Анализ рынка", "type": "analysis", "number": 1.05}),
            new Task(1080, {"description": "Новая итерация", "type": "development", "number": 1.8})];
        this.poolTasks = this.exampleTasks;
    }

    poolTasks = [];
    //todo проверить на наличие undefined стек

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addTask() {
        if (this.poolTasks.length < 8) this.poolTasks.push(this.exampleTasks[this.getRandomNumber(0, this.exampleTasks.length - 1)]);
    }


//
    addWorkerToTask(human, targetTask, timer) {
        const worker = human;
        for (let task of this.poolTasks) {
            if (targetTask === task) {
                task.addWorker(human, timer);
                break;
            }
        }
        if ("command" in worker) this.all += worker["command"];
        if ("analytics" in worker) this.all += worker["analytics"];
        if ("technologies" in worker) this.all += worker["technologies"];


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
            }
        }
        return completedTasks;
    }

//
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

        if(isOnTasks){
            if ("command" in worker) this.all -= worker["command"];
            if ("analytics" in worker) this.all -= worker["analytics"];
            if ("technologies" in worker) this.all -= worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let i = 0; i < this.poolTasks[i]; i++) this.poolTasks[i].setCoef(this.coef * this.buffs, timer);

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

export default AnalyticsState