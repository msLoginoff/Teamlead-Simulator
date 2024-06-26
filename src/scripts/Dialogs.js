class Dialogs {
    _questions = [];
    _dialogs = [];

    addHuman(name, timer) {
        this._dialogs.push(new Dialog(name, '',timer));
    }

    writeQuestions(numberQuestion, number, timer) {
        return this._dialogs[number].answer(this._questions[numberQuestion], timer);
    }
}