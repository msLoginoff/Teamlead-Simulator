class InActiveBuffs {
    _stack;
    constructor() {
        this._stack = [];
    }
    addBuff(buffs){this._stack.push(buffs)}
    getBuff(number){ return this._stack[number]; }
    getBuffList(){return this._stack;}
}