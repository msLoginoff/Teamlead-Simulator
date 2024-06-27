import Human from './Human'
import ch1 from '../assets/character1.jpg'
class Staff {
    _allHumans;
    constructor() {
        this._allHumans = [];
        this._allHumans.push(new Human("Denis",
            {
                "enthusiasm": 7,//3 день работы падает до -1
                "tasks": 3,
                "technologies": -3,
                "speed": 2
            },
            ["Идеолог", "аналитик", "упрямец", "скорострел"],
        ch1));
        this._allHumans.push(new Human("Alexander",
            {
                "ideas": 2,
                "technologies": 4,
                "errors": -1,
                "command": 4
            }, ["Ученый", "дотошный", "компромиссный"]));
        this._allHumans.push(new Human("Alena",
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

    removeHuman(humanToRemove) {
        this._allHumans = this._allHumans.filter(human => human !== humanToRemove);
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