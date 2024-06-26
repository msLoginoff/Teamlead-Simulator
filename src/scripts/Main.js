class Main {
    setInterval(tick, delay = 1000);

    _timer = 0;

    _points = { // количество очков на каждый стек
        "management": 1080,
        "design": 0,
        "development": 0
    };
    _staff = new Staff();// штат людей на отдыхе (слева сверху область)
    _hr = new HR();

    _passiveBuffs = new InactiveBuffs(); //бафы, которые готовы к активации
    _activeBuffs = new ActiveBuffs(); //активированные бафы

    _tasks = new TaskAll(); // объект с полями, которые хранят в себе все штаты

    _dialogs = new Dialogs(); // диалоговая система

    incrementTimer(){ // обновление состояния таймера
        this.timer = this._timer + 1;
    }

    getTimer() { // геттер для таймера
        return this.timer;
    }

    tick() { //изменение состояний, не зависящих от человека
        const developmentTasks = this._tasks._development.checkEndedTasks();
        const designTasks = this._tasks._design.checkEndedTasks();
        const analyticBuffs =  this._tasks._analitics.checkEndedTasks();
        for (const task of analyticBuffs) {
            this._passiveBuffs.addBuff(new Buff(task._description));
        }
        this._points["management"] -= 1;
        this.incrementTimer();
    }


}