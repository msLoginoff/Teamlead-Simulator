import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/TaskCard.css';
import MainClass from "../scripts/Main";

const TaskCard = ({ task, onReassign }) => {
    const [progress, setProgress] = useState(task.progress);

    useEffect(() => {
        if (task.isActive === false) return;

        const interval = setInterval(() => {
            //console.log(task.get_full_percentage(), task._worker._name === 'Denis' ? task._worker : '11111')
            setProgress(task.get_full_percentage(MainClass._timer));
        }, 1000);

        if (progress >= 100) {
            clearInterval(interval);
            onTaskCompletion(task);
        }

        return () => clearInterval(interval);
    }, [task.assignedEmployees, task.speed, progress]);

    const onTaskCompletion = (task) => {
        setProgress(100);
        // Логика завершения задачи
    };

    return (
        <div className="task-card">
            <div className="name">{task._description}</div>
            <div className="progress-bar">
                <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                        textSize: '16px',
                        pathColor: progress >= 100 ? '#00e676' : '#61dafb',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                />
            </div>
            <div className="assigned-employees">
                {task._worker._name ? (
                    task._worker._name
                ) : (
                    'No one assigned'
                )}
            </div>
            <button onClick={() => onReassign(task)}>Reassign</button>
        </div>
    );
};

export default TaskCard;
