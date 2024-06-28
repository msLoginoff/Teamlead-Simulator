import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';
import EmployeeCard from './components/EmployeeCard';
import TaskCard from './components/TaskCard';
import BuffCard from './components/BuffCard';
import HRPanel from './components/HRPanel'; // Добавьте импорт HRPanel
import { initialEmployees, initialTasks, initialBuffs, initialMessages } from './data';
import MainClass from './scripts/Main'

const App = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [tasks, setTasks] = useState(MainClass.tick());
    const [inactiveBuffs, setInactiveBuffs] = useState(initialBuffs.inactive);
    const [activeBuffs, setActiveBuffs] = useState(initialBuffs.active);
    const [messages, setMessages] = useState(initialMessages);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [availableEmployees, setAvailableEmployees] = useState(
        (MainClass.openHR(MainClass._timer))
    );
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBuffs(prevBuffs => prevBuffs.map(buff => ({
                ...buff,
                timeLeft: buff.timeLeft > 0 ? buff.timeLeft - 1 : 0
            })));
            //MainClass.tick()
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleActivateBuff = (buff) => {
        setInactiveBuffs(inactiveBuffs.filter(b => b.id !== buff.id));
        setActiveBuffs([...activeBuffs, { ...buff, timeLeft: 10 }]);
        addMessage('success',`Buff ${buff.name} activated.`);

    };

    const handleDeactivateBuff = (buff) => {
        setActiveBuffs(activeBuffs.filter(b => b.id !== buff.id));
        addMessage('warn',`Buff ${buff.name} deactivated.`);
    };

    const handleReassignTask = (task) => {
        addMessage('activate',`Task ${task.name} reassigned.`);
    };

    const handleTaskCompletion = (task) => {
        setTasks(tasks.filter(t => t.id !== task.id));
        addPoints(10);
        if (task.isAnalytics) {
            addNewBuff();
        }
        addMessage('success',`Task ${task.name} completed.`);
    };

    const addPoints = (points) => {
        addMessage(`${points} points added.`);
    };

    const addNewBuff = () => {
        const newBuff = {
            id: Date.now(),
            name: 'New Analytics Buff',
            description: 'This is a new buff from an analytics task.',
        };
        setInactiveBuffs([...inactiveBuffs, newBuff]);
        addMessage('success',`New buff ${newBuff.name} added.`);
    };

    const handleAssignEmployee = (employee, task) => {
        const updatedTask = { ...task, assignedEmployees: [...task.assignedEmployees, employee] };
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
        setEmployees(employees.filter(e => e.id !== employee.id));
        setAvailableEmployees([...availableEmployees, employee]);
        addMessage('success',`Employee ${employee.name} assigned to task ${task.name}.`);
    };

    const handleFireEmployee = (employee) => {
        MainClass._staff.removeHuman(employee);
        MainClass._hr._activeHumans.push(employee._name)
        console.log(employee._name)
        setAvailableEmployees(MainClass.openHR(MainClass._timer))
        //setEmployees(MainClass._staff._allHumans)
        /*setEmployees(employees.filter(e => e.id !== employee.id));
        setAvailableEmployees([...availableEmployees, employee]);*/
        addMessage('warn',`Employee ${employee._name} fired.`);
    };

    const handleAddEmployee = (employee) => {
        //MainClass._staff.addHuman(employee);
        //MainClass._hr._activeHumans = MainClass._hr._activeHumans.filter(human => human !== employee)
        MainClass.chooseNewHuman(employee)
        setAvailableEmployees(MainClass.openHR(MainClass._timer))
        setEmployees(MainClass._staff._allHumans)
        /*setEmployees([...employees, employee]);
        setAvailableEmployees(availableEmployees.filter(e => e.id !== employee.id));*/
        setIsPopupOpen(false);
        addMessage('success',`Employee ${employee._name} added.`);
    };

    const addMessage = (type, text) => {
        setMessages([...messages, { text, type: type }]);
    };


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    console.log(tasks)
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
                    {MainClass.getStaff().map(employee => (
                        <EmployeeCard
                            key={employee.getName()}
                            employee={employee}
                            onAssign={(task) => handleAssignEmployee(employee, task)}
                            onFire={() => handleFireEmployee(employee)}
                        />
                    ))}
                    <button onClick={() => setIsPopupOpen(true)}>Hire New Employee</button>
                </div>
                <div id="tasks-block" className="block">
                    <h3>Tasks</h3>
                    <div className="tasks">
                        {tasks.map(task => (
                            task.map(t => (
                                <TaskCard
                                    key={t.id}
                                    task={t}
                                    onReassign={handleReassignTask}
                                    onTaskCompletion={handleTaskCompletion}
                                />
                            ))

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
                            onDeactivate={() => handleDeactivateBuff(buff)}
                        />
                    ))}
                    <h4>Active Buffs</h4>
                    {activeBuffs.map(buff => (
                        <BuffCard
                            key={buff.id}
                            buff={buff}
                            onActivate={() => handleActivateBuff(buff)}
                            onDeactivate={() => handleDeactivateBuff(buff)}
                        />
                    ))}
                </div>
                <div id="notifications-block" className="block">
                    <h3>Notifications</h3>
                    <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>{message.text}</div>
                    ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <HRPanel
                    employees={availableEmployees}
                    onClose={() => setIsPopupOpen(false)}
                    onAdd={handleAddEmployee}
                    isAvailable={MainClass._hr.checkAvailable(MainClass._timer)}
                />
            )}
        </div>
    );
};

export default App;
