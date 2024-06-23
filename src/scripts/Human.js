class Human {
    constructor(nameOfPerson, skills, description) {
        let _skills = skills;
        let _name = nameOfPerson;
        let _description = description;

        this.getName = () => _name;
        this.getSkills = () => _skills;
        this.getDescription = () => _description;
    }
}