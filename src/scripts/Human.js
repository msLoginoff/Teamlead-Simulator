class Human {
    constructor(nameOfPerson = "", skills = {}, description = [], sleepTime = 0) {
        let _skills = skills;
        let _name = nameOfPerson;
        let _description = description;
        let _sleepTime = sleepTime;

        this.getName = () => _name;
        this.getSkills = () => _skills;
        this.getDescription = () => _description;
        this.getSleepTime = () => _sleepTime;
    }
}