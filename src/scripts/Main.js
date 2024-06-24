class Main {
    setInterval(incrementTimer, delay = 1000);
    static timer = 0;

    incrementTimer(){
        this.timer = this.timer + 1;
    }
}