import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onReassign }) => {
    const [progress, setProgress] = useState(task.progress);

    useEffect(() => {
        if (task.assignedEmployees.length === 0) return;

        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + task.speed, 100));
        }, 3000);

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
            <div className="name">{task.name}</div>
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
                {task.assignedEmployees.length > 0 ? (
                    task.assignedEmployees.map(e => e.name).join(', ')
                ) : (
                    'No one assigned'
                )}
            </div>
            <button onClick={() => onReassign(task)}>Reassign</button>
        </div>
    );
};

export default TaskCard;
