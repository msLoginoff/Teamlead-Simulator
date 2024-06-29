import Human from './Human'
import denis from '../assets/Denis.png'
import alexander from '../assets/Alexander.png'
import alena from '../assets/Alena.png'
import human from "./Human";
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
        denis));
        this._allHumans.push(new Human("Alexander",
            {
                "ideas": 2,
                "technologies": 4,
                "errors": -1,
                "command": 4
            }, ["Ученый", "дотошный", "компромиссный"]),
            alexander);
        this._allHumans.push(new Human("Alena",
            {
                "visualisation": 6,
                "quality": 2,
                "command": 3,
                "errors": 2
            },
            ["Дизайнер", "на дзене", "требовательная"], alena));
    };

    addHuman(human) {
        this._allHumans.push(human);
    }

    removeHuman(humanToRemove) {
        this._allHumans = this._allHumans.filter(human => human !== humanToRemove);
    }

    getHuman(human) {
        for (let i = 0; i < this._allHumans.length; i++) {
            if (this._allHumans[i] === human) {
                this._allHumans.splice(i, 1);
                return human;
            }
        }
        return -1;
    }

    getHumanByNumber(number) {
        return this._allHumans[number];
    }

    deleteHuman(name) {
        for (let human of this._allHumans) {
            if (human._name === name) {
                this._allHumans.splice(this._allHumans.indexOf(human), 1);
                break;
            }
        }
    }
}

export default Staff