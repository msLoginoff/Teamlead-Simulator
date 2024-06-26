import React from 'react';
import '../styles/AddEmployeePopup.css';

const AddEmployeePopup = ({ employees, onClose, onAdd }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Add Employee</h3>
                {employees.map(employee => (
                    <div key={employee.id} className="employee-option" onClick={() => onAdd(employee)}>
                        <div className="avatar">
                            <img src={employee.avatar} alt="avatar" />
                        </div>
                        <div className="info">
                            <div className="name">{employee.name}</div>
                            <div className="description">{employee.description}</div>
                            <div className="characteristics">
                                {employee.characteristics.join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AddEmployeePopup;
