import DesignState from "./DesignState";
import DevelopmentState from "./DevelopmentState";
import AnalyticsState from "./AnalyticsState";
import ManagementState from "./ManagmentState";

class TaskAll{
    _design = new DesignState();
    _development = new DevelopmentState();
    _analitics = new AnalyticsState();
    _managment = new ManagementState();

    addHumanToTask(state, human, task) {

    }
}

export default TaskAll