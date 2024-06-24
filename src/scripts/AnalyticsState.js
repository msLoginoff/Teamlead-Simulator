class AnalyticsState {
    all = 0;
    buffs = 1;
    coef = 1;
    tasks = [
        new Task(360, {"description": "Улучшение инструментов по разработке", "type": ["development"], "number": [1.1]}),
        new Task(180, {"description": "Нахождение новых способов для визуализации информации", "type": ["design"], "number": [1.1]}),
        new Task(180, {"description": "Внедрение новых технологий проектирования", "type": ["development", "test"], "number": [1.05, 1.05]}),
        new Task(720, {"description": "Изучение рынка компонентов для нейроинтерфейсов", "type": ["development"], "number": [1.2]}),
        new Task(90, {"description": "Улучшение производительности работников", "type": ["all"], "number": [1.02]}),
        new Task(90, {"description": "Проверка качества разработки и составление метрик", "type": ["errors"], "number": [0.5]}),
        new Task(180, {"description": "Анализ рынка", "type": ["analysis"], "number": [1.05]}),
        new Task(450, {"description": "Новая итерация", "type": ["development"], "number": [1.0]})
    ];

    addWorkerToTask(human, index) {
        tasks.with(tasks.find(new AnalysisTask(taskname)), )
        this.all = 0;
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("analytics" in hum) this.all += hum["analytics"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all += hum["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.tasks) task.setCoef(this.coef);
    };

    check(){
        for(var task in this.tasks) {
            if (task.task_is_ended()){

            }
        }
    }

    deleteWorker(name) {
        this.command = 0;
        this.analytics = 0;
        this.technologies = 0;
        for (let hum in this.workers) {
            if (hum.getName === name) this.workers.delete(hum);
        }
        for (let hum in this.workers) {
            if ("command" in hum) this.all += hum["command"];
        }
        for (let hum in this.workers) {
            if ("analytics" in hum) this.all += hum["analytics"];
        }
        for (let hum in this.workers) {
            if ("technologies" in hum) this.all -= hum["technologies"];
        }

        if (this.all <= -5)  this.coef = 0.5;
        if (this.all > 0 && this.all <= 10) this.coef = 1.5;
        if (this.all > 10) this.coef = 2;

        for(let task in this.tasks) task.setCoef(this.coef);
    }
}