class Main {
    setInterval(incrementTimer, delay = 1000);
    _timer = 0;
    _staff = new Staff();
    _hr = new HR();

    _passiveBuffs = new InactiveBuffs();
    _activeBuffs = new ActiveBuffs();

    _tasks = new TaskAll();

    _dialogs = new Dialogs();

    incrementTimer(){
        this.timer = this._timer + 1;
    }

    getTimer() {
        return this.timer;
    }
}