class Dialog {
    _name;
    _answers;
    _timer;

    constructor(name, answers, timer) {
        this._name = name;
        this._answers = answers;
        this._timer = timer + this.getRandomNumber(0, 9000);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    answer(question, timer){
        if(timer >= this._timer){
            const answer = this._answers[question];//answer question
            this._timer = timer + this.getRandomNumber(0, 9000);
            return answer; //answer
        }
        return -1;
    }
}

export default Dialog