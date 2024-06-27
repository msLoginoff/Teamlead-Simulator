import buff from "./Buff";

class ActiveBuffs {
    _stack;
    _timerEnd;
    constructor() {
        this._stack = [];
    }

    getBuff(number){ return this._stack[number]; }

    activateTask(buff, timer){
        this._stack.push([buff, timer + 90]);
        return {"type":buff.getNumber(), "number": buff.getState()};
    }
    deactivateTasks(timer){
        let inactive = this._stack.filter((value) => value[1] <= timer);

        let answer =
            {"all": 1,
             "development": 1,
             "design": 1,
             "analysis": 1};

        for (let buff in inactive) {
           answer[buff.getState()] *= buff.getNumber();
        }

        return answer;
    }
}

export default ActiveBuffs