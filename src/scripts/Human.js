class Human {
    _skills;
    _name;
    _description;
    _sleepTime;
    _mood;

    constructor(nameOfPerson = "", skills = {}, description = [], sleepTime = 0) {
        let _skills = skills;
        let _name = nameOfPerson;
        let _description = description;
        let _sleepTime = sleepTime;
    }

    getName = () => this._name;
    getSkills = () => this._skills;
    getDescription = () => this._description;
    getSleepTime = () => this._sleepTime;

    changeMood(number) {this._mood = number;}
}