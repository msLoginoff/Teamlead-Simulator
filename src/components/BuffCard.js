import React from 'react';
import '../styles/BuffCard.css';

const BuffCard = ({ buff, onActivate }) => {
    return (
        <div className="buff-card">
            <div className="name">{buff.name}</div>
            <div className="description">{buff.description}</div>
            {buff.timeLeft !== undefined && (
                <div className="time-left">{buff.timeLeft} seconds left</div>
            )}
            <button onClick={() => onActivate(buff)}>
                {buff.timeLeft !== undefined ? 'Deactivate' : 'Activate'}
            </button>
        </div>
    );
};

export default BuffCard;
