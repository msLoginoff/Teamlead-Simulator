class Human {
    _skills;
    _name;
    _description;
    id;
    avatar;

    constructor(nameOfPerson = "", skills = {}, description = [], avatar) {
        this._skills = skills;
        this._name = nameOfPerson;
        this._description = description;
        this.avatar = avatar;
        this.id = Math.floor(Math.random() * (200 + 1));
    }

    getName = () => this._name;
    getSkills = () => this._skills;
    getDescription = () => this._description;

    changeMood(number) {this._mood = number;}
}

export default Human