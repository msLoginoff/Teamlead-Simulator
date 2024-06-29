import React from 'react';
import '../styles/HRPanel.css';

const HRPanel = ({ employees, onClose, onAdd, isAvailable }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h3>HR Panel</h3>
                <div className="employee-list">
                    {employees && employees.length > 0 && isAvailable ? (
                        employees.map(employee => (
                            <div key={employee.id} className="employee-option" onClick={() => onAdd(employee)}>
                                <div className="avatar">
                                    <img src={employee.avatar} alt="avatar" />
                                </div>
                                <div className="info">
                                    <div className="name">{employee._name}</div>
                                    <div className="description">

                                        {employee._description && employee._description.map((item) => (
                                            <div>{item}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-candidates">No candidates available at the moment</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HRPanel;
