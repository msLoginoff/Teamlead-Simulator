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
        let answer = "";
        let coef = 1.0;

        for (let buf in inactive) {
            if (buf._state === "all") coef *= buf._number;
        }

        for (let buf in inactive) {
            answer += (buf._state + ": " + buf._number * coef + '\n');
        }
        return answer;
        /*
        buff(dev, 1.2)
        buff(all, 1.02)
        answer: dev: 1.2*1.02
                design: 1.02
         */
    }
}

export default ActiveBuffs