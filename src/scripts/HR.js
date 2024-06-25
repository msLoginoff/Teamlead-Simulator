class HR {
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
        "ultDenis": ["Tatyana", "Marina", "Nastya"], // Denis's ability
        "ultOleg": ["Oleg", "Alexey"], // Oleg's ability
    }
    _activeHumans = ["Valeriy", "Vladislav", "Sonya", "Vasiliy"];

    getActiveHumans = () => this._activeHumans;

    getHuman(name) {//not valid(didn't realised remove name from values and pairs in objects)
        this._activeHumans.splice(this._activeHumans.indexOf(name), 1);

    }
}