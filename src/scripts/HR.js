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

    getHuman(name) {
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