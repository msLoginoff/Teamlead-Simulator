class InactiveBuffs {
    _stack;
    constructor() {
        this._stack = [];
    }

    addBuff(buffs){this._stack.push(buffs)}
    getBuff(number){ return this._stack[number]; }
    getBuffList(){return this._stack;}

    deleteBuff(number) {
        return this._stack.splice(this._stack.indexOf(number), 1);
    }
}

export default InactiveBuffs