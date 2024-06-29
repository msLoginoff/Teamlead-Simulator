import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const ScoreContext = createContext();

// Создаем провайдер контекста
export const ScoreProvider = ({ children }) => {
    const [scores, setScores] = useState({
        type1: 0,
        type2: 0,
        type3: 0
    });

    // Функции для обновления очков
    const updateScore = (type, amount) => {
        setScores((prevPoints) => ({
            ...prevPoints,
            [type]: amount
        }));
    };

    return (
        <ScoreContext.Provider value={{ scores, updateScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

// Создаем хук для использования контекста
export const useScores = () => {
    return useContext(ScoreContext);
};