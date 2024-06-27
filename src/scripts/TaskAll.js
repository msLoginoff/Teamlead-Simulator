import DesignState from "./DesignState";
import DevelopmentState from "./DevelopmentState";
import AnalyticsState from "./AnalyticsState";
import ManagementState from "./ManagmentState";

class TaskAll{
    _design = new DesignState();
    _development = new DevelopmentState();
    _analytics = new AnalyticsState();
    _management = new ManagementState();

    addHumanToTask(state, human, task) {

    }
}

export default TaskAll