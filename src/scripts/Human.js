class Human {
    _skills;
    _name;
    _description;
    _mood;

    constructor(nameOfPerson = "", skills = {}, description = []) {
        let _skills = skills;
        let _name = nameOfPerson;
        let _description = description;
    }

    getName = () => this._name;
    getSkills = () => this._skills;
    getDescription = () => this._description;

    changeMood(number) {this._mood = number;}
}