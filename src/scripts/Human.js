class Human {
    _skills;
    _name;
    _description;
    _mood;

    constructor(nameOfPerson = "", skills = {}, description = []) {
        this._skills = skills;
        this._name = nameOfPerson;
        this._description = description;
    }

    getName = () => this._name;
    getSkills = () => this._skills;
    getDescription = () => this._description;

    changeMood(number) {this._mood = number;}
}

export default Human