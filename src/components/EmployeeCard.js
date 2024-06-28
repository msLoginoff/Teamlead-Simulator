import React from 'react';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee, onAssign, onFire }) => {
    /*const description = Array.isArray(employee._description)
        ? employee._description.join(', ')
        : employee._description;*/
    return (
        <div className="employee-card">
            <div className="avatar">
                {/*<img src={employee.avatar} alt={`${employee._name} avatar`} />*/}
            </div>
            <div className="info">
                <div className="name">{employee._name}</div>
                <div className="description">

                    {employee._description && employee._description.map((item) => (
                        <div>{item}</div>
                    ))}
                </div>
                <button onClick={onFire}>Fire</button>
                <button onClick={onAssign}>Assign</button>
            </div>
        </div>
    );
};

export default EmployeeCard;
