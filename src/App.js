import React, { useState, useEffect } from 'react';
import './styles/App.css';
import EmployeeCard from './components/EmployeeCard';
import TaskCard from './components/TaskCard';
import BuffCard from './components/BuffCard';
import { initialEmployees, initialTasks, initialBuffs, initialMessages } from './data';

const App = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [tasks, setTasks] = useState(initialTasks);
    const [inactiveBuffs, setInactiveBuffs] = useState(initialBuffs.inactive);
    const [activeBuffs, setActiveBuffs] = useState(initialBuffs.active);
    const [messages, setMessages] = useState(initialMessages);

    const handleActivateBuff = (buff) => {
        setInactiveBuffs(inactiveBuffs.filter(b => b.id !== buff.id));
        setActiveBuffs([...activeBuffs, { ...buff, timeLeft: 10 }]);
    };

    const handleDeactivateBuff = (buff) => {
        setActiveBuffs(activeBuffs.filter(b => b.id !== buff.id));
    };

    const handleReassignTask = (task) => {
    };

    const handleTaskCompletion = (task) => {
        setTasks(tasks.filter(t => t.id !== task.id));
        addPoints(10);
        if (task.isAnalytics) {
            addNewBuff();
        }
    };

    const addPoints = (points) => {

    };

    const addNewBuff = () => {

        const newBuff = {
            id: Date.now(),
            name: 'New Analytics Buff',
            description: 'This is a new buff from an analytics task.',
        };
        setInactiveBuffs([...inactiveBuffs, newBuff]);
    };

    const handleAssignEmployee = (employee, task) => {
        const updatedTask = { ...task, assignedEmployees: [...task.assignedEmployees, employee] };
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
        setEmployees(employees.filter(e => e.id !== employee.id));
    };

    const handleFireEmployee = (employee) => {
        setEmployees(employees.filter(e => e.id !== employee.id));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBuffs((prevBuffs) =>
                prevBuffs
                    .map((buff) => ({
                        ...buff,
                        timeLeft: buff.timeLeft - 1,
                    }))
                    .filter((buff) => buff.timeLeft > 0)
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app">
            <div className="points-display">
                <div>Development Points: 100</div>
                <div>Design Points: 50</div>
                <div>Critical Points: 10</div>
            </div>
            <div className="container">
                <div id="employees-block" className="block">
                    <h3>Available Employees</h3>
                    {employees.map(employee => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onAssign={(task) => handleAssignEmployee(employee, task)}
                            onFire={() => handleFireEmployee(employee)}
                        />
                    ))}
                </div>
                <div id="tasks-block" className="block">
                    <h3>Tasks</h3>
                    <div className="tasks">
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onReassign={handleReassignTask}
                                onTaskCompletion={handleTaskCompletion}
                            />
                        ))}
                    </div>
                </div>
                <div id="buffs-block" className="block">
                    <h3>Buffs</h3>
                    <h4>Inactive Buffs</h4>
                    {inactiveBuffs.map(buff => (
                        <BuffCard
                            key={buff.id}
                            buff={buff}
                            onActivate={() => handleActivateBuff(buff)}
                        />
                    ))}
                    <h4>Active Buffs</h4>
                    {activeBuffs.map(buff => (
                        <BuffCard
                            key={buff.id}
                            buff={buff}
                            onDeactivate={() => handleDeactivateBuff(buff)}
                        />
                    ))}
                </div>
                <div id="notifications-block" className="block">
                    <h3>Notifications</h3>
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>{message.text}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
