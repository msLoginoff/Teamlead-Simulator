import InactiveBuffs from "./InactiveBuffs";
import ActiveBuffs from "./ActiveBuffs";
import Staff from "./Staff";
import HR from "./HR";
import TaskAll from "./TaskAll"
import Buff from "./Buff";

class Main {


    _timer = 0;

    _points = [ // количество очков на каждый стек
        0,
        0,
        1080,
    ];
    _staff = new Staff();// штат людей на отдыхе (слева сверху область)
    _hr = new HR();

    getStaff() {
        return this._staff._allHumans;
    }

    getManagementPoints() {
        return this._points[2];
    }

    getDevelopmentPoints() {
        return this._points[0];
    }

    getDesignPoints() {
        return this._points[1];
    }

    _passiveBuffs = new InactiveBuffs(); //бафы, которые готовы к активации
    _activeBuffs = new ActiveBuffs(); //активированные бафы

    _tasks = new TaskAll(); // объект с полями, которые хранят в себе все штаты

    incrementTimer(){ // обновление состояния таймера
        this._timer = this._timer + 1;
    }

    getTimer() { // геттер для таймера
        return this._timer;
    }

    tick() {
        //изменение состояний, не зависящих от человека
        for (let i = 0; i < this._staff._allHumans.length; i++) {
            if (this._staff._allHumans[i]._name === "")
            {
                this._staff._allHumans.splice(i, 1);
                i--;
            }
        }
        const developmentTasks = this._tasks._development.checkEndedTasks();
        if (developmentTasks.length > 0) {
            for (const task of developmentTasks) {
              this._points[0] += task._number;
              this._staff.addHuman(task._worker);
            }
        }

        const designTasks = this._tasks._design.checkEndedTasks();
        if (designTasks.length > 0) {
            for (const task of designTasks) {
                this._points[1] += task._number;
                this._staff.addHuman(task._worker);
            }
        }

        const analyticBuffs =  this._tasks._analytics.checkEndedTasks();

        if (analyticBuffs.length > 0) {
            for (const task of analyticBuffs) {
                this._passiveBuffs.addBuff(new Buff(task._description));
            }
        }

        const managementEndedTasks = this._tasks._management.checkEndedTasks();
        if (managementEndedTasks.length > 0) {
            for (const task of managementEndedTasks) {
                this._points[2] += task._number;
            }
        }
        this._points[2] -= 1;
        if (this._timer % 50 === 0) {
            this._tasks._analytics.addTask();
            this._tasks._development.addTask();
            this._tasks._design.addTask();
            this._tasks._analytics.addTask();
        }
        this.incrementTimer();
        console.log(this._points);

        return [this._tasks._development.poolTasks, this._tasks._design.poolTasks, this._tasks._analytics.poolTasks, this._tasks._management.poolTasks];
    }

    dragToTask(human, task, state) { // назначить человека на работу
        let worker = this._staff.getHuman(human);
        console.log("drag");
        this._tasks.toTask(worker, task, state, this._timer);
    }

    cancelWork(human) { // вернуть человека в стафф, отменить работу
        let worker = this._tasks.removeHuman(human, this._timer);
        this._staff.addHuman(worker);
    }

    activateBuff(buff){ // активировать баф
        this._passiveBuffs.deleteBuff(buff);
        this._activeBuffs.activateBuff(buff,this._timer);
        this._tasks.buffState(buff.getState(), buff.getNumber());
    }

    openHR(timer) { // открыть меню HRa
        return this._hr.getActiveHumans(timer); // возвращает массив Human из HR
    }

    openStaff() { // открыть стафф
        return this._staff._allHumans(); // массив Human из Staff
    }

    chooseNewHuman(human) {
        const name = human._name;
        this._hr.getHuman(name, this._timer);
        let newHuman = this._hr.returnNewHuman(name);
        this._staff.addHuman(newHuman);
    }
}

let MainClass = new Main();
export default MainClass

//console.log(MainClass.tick()[0][0])
//MainClass.dragToTask(MainClass.getStaff()[0], MainClass.tick()[0][0], 'development')
/*setInterval(() => {
    MainClass.tick();
}, 1000);*/

// подключить очки
// сделать условие ui победы и проигрыша
// наладить уведомления
// придумать дизайн
