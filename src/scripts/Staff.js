import Human from './Human'
class Staff {
    _allHumans;
    constructor() {
        this._allHumans = [];
        this._allHumans.push(new Human("Денис",
            {
                "enthusiasm": 7,//3 день работы падает до -1
                "tasks": 3,
                "technologies": -3,
                "speed": 2
            },
            ["Идеолог", "аналитик", "упрямец", "скорострел"]));
        this._allHumans.push(new Human("Александр",
            {
                "ideas": 2,
                "technologies": 4,
                "errors": -1,
                "command": 4
            }, ["Ученый", "дотошный", "компромиссный"]));
        this._allHumans.push(new Human("Алена",
            {
                "visualisation": 6,
                "quality": 2,
                "command": 3,
                "errors": 2
            },
            ["Дизайнер", "на дзене", "требовательная"]));
    };

    addHuman(human) {
        this._allHumans.push(human);
    }

    getHuman(name) {
        for (let human of this._allHumans) {
            if (human.name === name) return human;
        }
        return -1;
    }

    getHumanByNumber(number) {
        return this._allHumans[number];
    }

    deleteHuman(name) {
        for (let human of this._allHumans) {
            if (human.name === name) {
                this._allHumans.splice(this._allHumans.indexOf(human), 1);
                break;
            }
        }
    }
}

export default Staff