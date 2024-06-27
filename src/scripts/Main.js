import InactiveBuffs from "./InactiveBuffs";
import ActiveBuffs from "./ActiveBuffs";
import Staff from "./Staff";
import HR from "./HR";
import TaskAll from "./TaskAll"
import Buff from "./Buff";
import Dialogs from "./Dialogs";

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

    getStaff() {
        return this._staff._allHumans;
    }

    getManagementPoints() {
        return this._points["management"];
    }

    getDevelopmentPoints() {
        return this._points["development"];
    }

    getDesignPoints() {
        return this._points["design"];
    }

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
        for (const task of developmentTasks) {
            this._points["development"] += task._number;
        }
        const designTasks = this._tasks._design.checkEndedTasks();
        for (const task of designTasks) {
            this._points["design"] += task._number;
        }
        const analyticBuffs =  this._tasks._analitics.checkEndedTasks();
        for (const task of analyticBuffs) {
            this._passiveBuffs.addBuff(new Buff(task._description));
        }
        this._points["management"] -= 1;
        this.incrementTimer();
    }

    dragToTask(name) { // назначить человека на работу

    }

    cancelWork(name) { // вернуть человека в стафф, отменить работу

    }

    activeBuff(number){ // активировать баф
        const buff = this._passiveBuffs.deleteBuff(number);

    }

    openDialog() { // открыть диалог

    }

    openHR() { // открыть меню HRa

    }

    openStaff() { // открыть стафф

    }

    chooseNewHuman(name) {
        this._hr.getHuman(name, this._timer);
        let newHuman = this._hr.returnNewHuman(name);
        this._staff.addHuman(newHuman);
    }
}

export default Main