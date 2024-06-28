class InactiveBuffs {
    _stack;
    constructor() {
        this._stack = [];
    }

    addBuff(buffs){this._stack.push(buffs)}
    getBuff(number){ return this._stack[number]; }
    getBuffList(){return this._stack;}

    deleteBuff(buff) {
        for (let i = 0; i < this._stack.length; i++) {
            if (this._stack[i] === buff) {
                this._stack.splice(i, 1);
                break;
            }
        }
    }
}

export default InactiveBuffs