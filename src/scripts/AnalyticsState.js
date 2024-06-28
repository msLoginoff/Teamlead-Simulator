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
                "number": 0.5
            }),
            new Task(180, {"description": "Анализ рынка", "type": "analysis", "number": 1.05}),
            new Task(450, {"description": "Новая итерация", "type": "development", "number": 1.0})];
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
    addWorkerToTask(human, index, timer) {
        this.poolTasks[index].addWorker(human,index)
        for (let task in this.poolTasks) {
            const worker = task.get_worker();
            if ("command" in worker) this.all += worker["command"];
            if ("analytics" in worker) this.all += worker["analytics"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.poolTasks) task.setCoef(this.coef);
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
    deleteWorker(name, timer) {
        let isOnTasks = false;
        let worker = new Human();
        for (const task in this.poolTasks) {
            if (task.get_worker().name === name) {
                isOnTasks = true;
                worker = task.get_worker();
                task.removeWorker(timer);
                break;
            }
        }

        if(isOnTasks){
            if ("command" in worker) this.all += worker["command"];
            if ("analytics" in worker) this.all += worker["analytics"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.poolTasks) task.setCoef(this.coef);

        return worker;
    }

    getBuff(coefficient) {
        this.buffs *= coefficient;
    }

    removeBuff(coefficient) {
        this.buffs /= coefficient;
    }
}

export default AnalyticsState