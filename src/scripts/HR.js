import Human from './Human'
class HR {
    _timer = 0;
    requirements = {
        "Leonid": ["Valeriy"],
        "Ekaterina": ["Ekaterina"],
        "Fux": ["Valeriy"],
        "Lidia": ["Sonya"],
        "Konstantin": ["Vasiliy"],
        "Oleg": ["Leonid", "Lidia"],
        "Marina": ["Konstantin"],
        "Nastya": ["Konstantin"],
        "Diana": ["Konstantin"],
        "Alexey": ["Diana"],
        "Tatyana": ["Oleg", "Marina"],
    }
    _activeHumans = ["Valeriy", "Vladislav", "Sonya", "Vasiliy"];

    _humans = {
        "Denis" : new Human("Denis",
            {
                "enthusiasm": 7,//3 день работы падает до -1
                "tasks": 3,
                "technologies": -3,
                "speed": 2
            },
            ["Идеолог", "аналитик", "целеустремленный", "быстрое выгорание"]),

        "Alexander" : new Human("Alexander",
            {
                "ideas": 2,
                "technologies": 4,
                "errors": -1,
                "command": 4
            },
            ["Ученый", "дотошный", "компромиссный"]),

        "Alena" : new Human("Alena",
            {
                "visualisation": 6,
                "quality": 2,
                "command": 3,
                "errors": 2
            },
            ["Дизайнер", "на дзене", "требовательная"]),

        "Konstantin" : new Human("Konstantin",
            {
                "command": 5,
                "errors": 3,
                "ideas": 2
            },["Пофигист", "тимбилдер", "инноватор"]),

        "Oleg" : new Human("Oleg",
            {
                "analysis": 4,
                "tasks": 3,
                "innovations": -2,
                "command": -2
            },
            ["Реалист", "имеет опыт", "глубоко мыслящий"]),

        "Diana" : new Human("Diana",
            {
                "command": -4,
                "control": 1,
                "errors": -1,
                "technologies": 1,
                "tasks": -1,
                "quality": 2
            },
            ["Гордая", "требовательная", "научный аналитик"]),

        "Leonid" : new Human ("Leonid",
            {
                "tasks": 3,
                "innovations": 1,
                "technologies": 2,
                "errors": 4
            },
            ["Исполнительный", "посредник технологий", "\"опять сапер\""]),

        "Valeriy" : new Human ("Valeriy",
            {
                "command": 7,
                "development": 3
            },
            ["Кризис-менеджер", "иногда имеет посткризисное состояние", "хардкодер"]),

        "Vladislav" : new Human("Vladislav",
            {
                "visualisation": 6,
                "tasks": -1,
                "innovations": 1
            },
            ["Дизайнер", "теоретик", "подаван"]),

        "Marina" : new Human("Marina",
            {
                "control": 2,
                "command": -2,
                "analysis": 2,
                "errors": 4
            },
            ["Финансист", "советчик", "экспериментатор"]),

        "Lidia" : new Human("Lidia",
            {
                "development": 3,
                "visualisation": 6
            },
            ["Человек - швейцарский нож", "дизайнер", "котик - душнила"]),

        "Sonya" : new Human("Sonya",
            {
                "visualisation": 6,
                "tasks": 2
            },
            ["Дизайнер", "инициативность", "ассоциальность"]),

        "Vasiliy" : new Human("Vasiliy",
            {
                "analysis": 2 // нестабильность, +- 2 команда, +-2 задачи с вероятностью 50 %
            },
            ["Инициативность", "инновации", "нестабильность"]),

        "Fux" : new Human("Fux",
            {
                "development": 5,
                "technologies": 2,
                "errors": -5
            },
            ["Эксперт разработки", "инноватор"]),

        "Alexey" : new Human("Alexey",
            {
                "analysis": 5,
                "development": 5
            },
            ["Эксперт в технологиях", "эксперт в разработке"]),

        "Ekaterina" : new Human ("Ekaterina",
            {
                "tasks": 3,
                "command": -2,
                "errors": 1,
            },
            ["Исполнительность", "апатичность", "бескомпромиссность"]),

        "Tatyana" : new Human("Tatyana",
            {
                "control": 10,
                "analysis": 3
            },
            ["Эксперт в управлении", "знает перспективы", "может быть очень требовательной"]),

        "Nastya" : new Human("Nastya",
            {
                "analysis": 3,
                "control": 3,
                "errors": 3
            },
            ["Человек - швейцарский нож", "менеджер", "возможны выгорания"])
    }

    checkAvailable(timer) {
        return timer >= this._timer;

    }

    getActiveHumans(timer) {
        let humans = [];
        for (let name of this._activeHumans) {
            humans.push(this._humans[name]);
        }
        return humans;
}

    returnNewHuman(name) {
        const humansArray = Object.values(this._humans);
        for (let human of humansArray) {

            if(human._name === name) return human;
        }
    }

    getHuman(name, timer) {
        this._timer = timer + 180;
        this._activeHumans.splice(this._activeHumans.indexOf(name), 1);
        for (let property in this.requirements) {
            if (this.requirements[property].indexOf(name) !== -1) {
                this.requirements[property].splice(this.requirements[property].indexOf(name), 1);
                if (this.requirements[property].length === 0 && this._activeHumans.indexOf(property) === -1) {
                    this._activeHumans.push(property);
                }
            }
        }
    }
}

export default HR