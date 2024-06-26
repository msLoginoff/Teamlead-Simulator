import Human from 'Human'
class Task {
    _isActive = false;
    _worker = new Human();
    _description = "";
    _timeWork = -1;
    _timeEnd = -1;
    _timefull = -1;
    _coef = 1.;
    _type = "development";
    _number = [];
    _result;

    constructor(time, result) {
        this._timeWork = time;
        this._timefull = time;
        this._type = result["type"];
        this._description = result["description"];
        this._result = result;
        this._number = result["number"]
    }

    setCoef(coef){
        this._coef = coef;
    }
    get_full_percentage(){
        return this._coef*(1 - (this._timeWork / this._timefull))*100;
    }
    get_worker(){
        return this._worker;
    }
    addWorker(human, timer) {
        this._worker = human;
        this._isActive = true;
        this._timeEnd = timer + this._timeWork/this._coef;
    }

    removeWorker(timer){
        var output_worker =  this._worker;
        this._timeWork = (this._timeEnd - timer)*this._coef;
        this._timeEnd = -1;
        this._isActive = false;
        this._worker = new Human();
        return output_worker;
    }
    task_is_ended(timer){
        return (timer >= this._timeEnd & this._isActive) | (this._timeWork <= 0) ;
    }
    get_result(){
        if (this.task_is_ended() ) return new TaskResult();
    }
}

export default Task