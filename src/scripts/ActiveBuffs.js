import buff from "./Buff";

class ActiveBuffs {
    _stack;
    constructor() {
        this._stack = [];
    }

    getBuff(number){ return this._stack[number]; }

    activateBuff(buff, timer){
        this._stack.push([buff, timer + 90]);
        return {"type":buff.getNumber(), "number": buff.getState()};
    }

    deactivateBuff(timer){
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