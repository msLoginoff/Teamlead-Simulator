class Human {
    constructor(nameOfPerson, skills) {
        let _skills = skills;
        let _name = nameOfPerson;

        this.getName = () => _name;
        this.getSkills = () => _skills;
    }
}