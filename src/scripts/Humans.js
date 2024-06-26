import Human from './Human'
class Humans {
    Denis = new Human("Денис",
        {
            "enthusiasm": 7,//3 день работы падает до -1
            "tasks": 3,
            "technologies": -3,
            "speed": 2
        },
        ["Идеолог", "аналитик", "упрямец", "скорострел"]);
    Alexander = new Human("Александр",
        {
            "ideas": 2,
            "technologies": 4,
            "errors": -1,
            "command": 4
        },
        ["Ученый", "дотошный", "компромиссный"]);
    Alena = new Human("Алена",
        {
            "visualisation": 6,
            "quality": 2,
            "command": 3,
            "errors": 2
        },
        ["Дизайнер", "на дзене", "требовательная"]);
    Konstantin = new Human("Константин",
        {
            "command": 5,
            "errors": 3,
            "ideas": 2
        },["Пофигист", "тимбилдер", "инноватор"]);

    Oleg = new Human("Олег",
        {
            "analysis": 4,
            "tasks": 3,
            "innovations": -2,
            "command": -2
        },
    ["Реалист", "имеет опыт", "глубоко мыслящий"]);
    Diana = new Human("Диана",
        {
            "command": -4,
            "control": 1,
            "errors": -1,
            "technologies": 1,
            "tasks": -1,
            "quality": 2
        },
        ["Гордая", "требовательная", "научный аналитик"]);
    Leonid = new Human ("Леонид",
        {
            "tasks": 3,
            "innovations": 1,
            "technologies": 2,
            "errors": 4
        },
        ["Исполнительный", "посредник технологий", "\"опять сапер\""]);
    Valeriy = new Human ("Валерий",
        {
            "command": 7,
            "development": 3
        },
        ["Кризис-менеджер", "иногда имеет посткризисное состояние", "хардкодер"]);
    Vladislav = new Human("Владислав",
        {
            "visualisation": 6,
            "tasks": -1,
            "innovations": 1
        },
        ["Дизайнер", "теоретик", "подаван"]);
    Marina = new Human("Марина",
        {
            "control": 2,
            "command": -2,
            "analysis": 2,
            "errors": 4
        },
        ["Финансист"], ["советчик"], ["экспериментатор"]);
    Lidia = new Human("Лидия",
        {
            "development": 3,
            "visualisation": 6
        },
        ["Человек - швейцарский нож", "дизайнер", "котик - душнила"]);
    Sonya = new Human("Соня",
        {
            "visualisation": 6,
            "tasks": 2
        },
        ["Дизайнер", "инициативность", "ассоциальность"]);
    Vasiliy = new Human("Василий",
        {
            "analysis": 2 // нестабильность, +- 2 команда, +-2 задачи с вероятностью 50 %
        },
        ["Инициативность", "инновации", "нестабильность"]);
    Fux = new Human("Фукс",
        {
            "development": 5,
            "technologies": 2,
            "errors": -5
        },
        ["Эксперт разработки", "инноватор"]);
    Alexey = new Human("Алексей",
        {
            "analysis": 5,
            "development": 5
        },
        ["Эксперт в технологиях", "эксперт в разработке"]);
    Ekaterina = new Human ("Екатерина",
        {
            "tasks": 3,
            "command": -2,
            "errors": 1,
        },
        ["Исполнительность", "апатичность", "бескомпромиссность"]);
    Tatyana = new Human("Татьяна",
        {
            "control": 10,
            "analysis": 3
        },
        ["Эксперт в управлении", "знает перспективы", "может быть очень требовательной"]);
    Nastya = new Human("Настя",
        {
            "analysis": 3,
            "control": 3,
            "errors": 3
        },
        ["Человек - швейцарский нож", "менеджер", "возможны выгорания"]);
}