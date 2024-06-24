class AnalysisTask{
    _name;
    _development = ["development"];
    _number = [];
    _description = "Новая итерация";
    _time = 400;
    constructor(name) {
        this._name = name;
        switch(name) {
            case "upgrade":
            {
                this._number = [1.1];
                this._development = ["development"];
                this._time = 360;
                this._description = "Улучшение инструментов по разработке";
                break;
            }
            case "search":
            {
                this._number = [1.1];
                this._development = ["design"];
                this._time = 180;
                this._description = "Нахождение новых способов для визуализации информации";
                break;
            }
            case "innovation":
            {
                this._number = [1.05, 1.05];
                this._development = ["development", "test"];
                this._time = 180;
                this._description = "Внедрение новых технологий проектирования";
                break;
            }
            case "component":
            {
                this._number = [1.2];
                this._development = ["development"];
                this._time = 720;
                this._description = "Изучение рынка компонентов для нейроинтерфейсов";
                break;
            }
            case "performance":
            {
                this._number = [1.02];
                this._development = ["all"];
                this._time = 90;
                this._description = "Улучшение производительности работников";
                break;
            }
            case "quality":
            {
                this._number = [0.5];
                this._development = ["errors"];
                this._time = 90;
                this._description = "Проверка качества разработки и составление метрик";
                break;
            }
            case "analysis": {
                this._number = [1.05];
                this._development = ["analysis"];
                this._time = 180;
                this._description = "Анализ рынка";
                break;
            }
            default:
                break;
        }
    }
    activateTask(){
        return new Task(this._description, this._time);
    }
}