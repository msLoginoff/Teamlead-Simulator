import React from 'react';
import '../styles/TaskPopup.css'; // Добавляем CSS для TaskPopup

const TaskPopup = ({ tasks, onSelect, onClose }) => {
    return (
        <div className="task-popup">
            <div className="task-popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Select a Task</h3>
                <div className="tasks">
                    {tasks.map(task => (
                        <div key={task.id} className="task-card" onClick={() => onSelect(task)}>
                            <h4>{task._name}</h4>
                            <p>{task._description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskPopup;