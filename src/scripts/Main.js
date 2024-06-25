class Main {
    setInterval(incrementTimer, delay = 1000);
    timer = 0;

    incrementTimer(){
        this.timer = this.timer + 1;
    }

    getTimer() {
        return this.timer;
    }
}