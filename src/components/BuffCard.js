import React, { useEffect } from 'react';
import '../styles/BuffCard.css';

const BuffCard = ({ buff, onActivate, onDeactivate }) => {
    useEffect(() => {
        // Проверяем время и вызываем onDeactivate, если время истекло
        if (buff.timeLeft === 0) {
            onDeactivate(buff);
        }
    }, [buff.timeLeft, onDeactivate]); // Зависимость от buff.timeLeft и onDeactivate

    return (
        <div className="buff-card">
            <div className="name">{buff.name}</div>
            <div className="description">{buff.description}</div>
            {buff.timeLeft !== undefined && (
                <div className="time-left">{buff.timeLeft} seconds left</div>
            )}
            <button onClick={() => {
                if (buff.timeLeft !== undefined) {
                    onDeactivate(buff);
                } else {
                    onActivate(buff);
                }
            }}>
                {buff.timeLeft !== undefined ? 'Deactivate' : 'Activate'}
            </button>
        </div>
    );
};

export default BuffCard;