class Dialogs {
    taskComplete(task) {
        return [task._worker, "Задача " + task._description + " выполнена."]
    }


}