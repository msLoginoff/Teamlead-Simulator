import React from 'react';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee, onAssign, onFire }) => {
    const description = Array.isArray(employee.description)
        ? employee.description.join(', ')
        : employee.description;

    return (
        <div className="employee-card">
            <div className="avatar">
                <img src={employee.avatar} alt={`${employee.name} avatar`} />
            </div>
            <div className="info">
                <div className="name">{employee.name}</div>
                <div className="description">{description}</div>
                <button onClick={onFire}>Fire</button>
                <button onClick={onAssign}>Assign</button>
            </div>
        </div>
    );
};

export default EmployeeCard;
