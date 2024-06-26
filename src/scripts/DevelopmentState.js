import Task from './Task'
class DevelopmentState{
    tasks = [];
    mainTask;
    all = 0;
    buffs = 1;
    coef = 1;
    constructor(){
        this.tasks = [new Task(2, {
            "type": "development",
            "description": "Эмоциональное вдохновение",
            "number": [1.05]
        }),
        new Task(2, {
            "type": "development",
            "description": "Баг чувств всех отделов",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Баг конечности",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Анализ контрольной группы на эффект влияния прогресса",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Успешный тест на его анализ",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Захват мозга нейронкой",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Нейронка улучшила прогресс",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Кризисная ситуация из-за ЧП",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Неограниченные знания",
            "number": [1.0]
        }),
        new Task(2, {
            "type": "development",
            "description": "Тимбилдинг(шашлыки)",
            "number": [1.0]
        })];
    }

    checkEndedTasks(){
        let completedTasks = [];
        for(let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].task_is_ended()){
                completedTasks.push(this.tasks[i]);
                this.tasks.splice(i, 1);
            }
        }
        return completedTasks;
    }

    addWorker(human) {
        this.workers += human;
        this.all = 0;
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("innovations" in hum) this.all += hum["innovations"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all += hum["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    };

    deleteWorker(human) {
        this.all = 0;
        for (let hum in this.workers) {
            if (hum.getName === human.name) this.workers.delete(hum);
        }
        for (let hum in this.workers) {
            if ("command" in hum) this.all -= hum["command"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all -= hum["technologies"];
        }
        for (let hum in this.workers) {
            if ("innovations" in hum) this.all -= hum["innovations"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;
    };

    getBuff(coefficient) {
        this.buffs *= coefficient;
    }

    removeBuff(coefficient) {
        this.buffs /= coefficient;
    }
}

export default DevelopmentState