class Buff {
    _state;
    _description;
    _number;
    constructor(list) {
        if("description" in list) this._description = list["description"];
        if("type" in list) this._state = list["type"];
        if("number" in list) this._number = list["number"];
    }

    getState = () => this._state;
    getDescription = () => this._description;
    getNumber = () => this._number;
}

export default Buff