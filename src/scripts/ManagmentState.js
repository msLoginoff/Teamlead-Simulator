class ManagementState {
    all = 0;
    buffs = 1;
    coef = 1;
    tasks;
    exampleTasks;
    constructor(){
        this.exampleTasks = [
            new Task(1, {"description": "Нейронный дальтонизм", "type": ["design"], "number": [1.0]}),
            new Task(1, {"description": "Шрифт для дизайна нейроинтерфейса", "type": ["design"], number: [1.0]}),
            new Task(1, {"description": "Изменение трендов", "type": ["design"], "number": [1.0]}),
            new Task(1, {"description": "Экспериментальный дизайн", "type": ["design"], "number": [1.0]}),
            new Task(1, {"description": "Упоролись дизайном", "type": ["design"], number:[1.0]}),
            new Task(1, {"description": "Пялить в монитор", "type": ["design"], number:[1.0]}),
            new Task(1, {"description": "Выпить латте", "type" : ["design"], number:[1.0]}),
            new Task(1, {"description": "Починить макбук", "type": ["design"], number:[1.0]})
        ]
    }
    poolTasks = [];

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addTask() {
        if (this.poolTasks.length < 8) this.poolTasks.push(this.tasks[this.getRandomNumber(0, this.tasks.length)]);
    }

    addWorkerToTask(human, index) {
        this.tasks[index].addWorker(human,index);
        for (let task in this.poolTasks) {
            const worker = task.get_worker();
            if ("command" in worker) this.all += worker["command"];
            if ("visualisation" in worker) this.all += worker["visualisation"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.tasks) task.setCoef(this.coef);
    };
//
    checkEndedTasks(){
        let completedTasks = [];
        for(let i = 0; i < this.poolTasks.length; i++) {
            if (this.tasks[i].task_is_ended()){
                completedTasks.push(this.tasks[i]);
                this.tasks[i] = this.exampleTasks[i];
            }
        }
        return completedTasks;
    }

//
    deleteWorker(name, timer) {
        let isOnTasks = false;
        let worker;
        for (const task in this.tasks) {
            if (task.get_worker().name === name) {
                isOnTasks = true;
                worker = task.get_worker();
                task.removeWorker(timer);
            }
            break;
        }

        if(isOnTasks){
            if ("command" in worker) this.all += worker["command"];
            if ("analytics" in worker) this.all += worker["analytics"];
            if ("technologies" in worker) this.all += worker["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.tasks) task.setCoef(this.coef);
    }

    getBuff(coefficient) {
        this.buffs *= coefficient;
    }

    removeBuff(coefficient) {
        this.buffs /= coefficient;
    }
}