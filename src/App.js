import React, { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import TaskProgress from './components/TaskProgress';
import Chat from './components/Chat';
import Popup from './components/Popup';
import OvertimeList from './components/OvertimeList';
import { getNewCharacter } from './utils/backendSimulation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import background from './assets/background.png';
import character1 from './assets/character1.jpg';
import character2 from './assets/character2.png';
import './styles.css';

const initialCharacters = [
    { id: 1, name: 'Alice', isTired: false, isResting: false, isOvertime: false, image: character1, stats: { speed: 7, strength: 5, intelligence: 8 } },
    { id: 2, name: 'Bob', isTired: false, isResting: false, isOvertime: false, image: character2, stats: { speed: 6, strength: 8, intelligence: 7 } },
    // другие персонажи
];

const initialTasks = [
    { id: 1, name: 'Разработка', progress: 80, assignedTo: null },
    { id: 2, name: 'Аналитика', progress: 30, assignedTo: null },
    // другие задачи
];

const App = () => {
    const [characters, setCharacters] = useState(initialCharacters);
    const [tasks, setTasks] = useState(initialTasks);
    const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [availableCharacters, setAvailableCharacters] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [characterToRemove, setCharacterToRemove] = useState(null);

    const handleActivateOvertime = (characterId) => {
        setCharacters((prevCharacters) =>
            prevCharacters.map((char) =>
                char.id === characterId ? { ...char, isOvertime: true } : char
            )
        );
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Персонаж ${characterId} работает сверхурочно!`, type: 'info' },
        ]);
    };

    const handleRemoveCharacter = () => {
        if (characterToRemove) {
            setCharacters((prevCharacters) => prevCharacters.filter((char) => char.id !== characterToRemove));
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `Персонаж ${characterToRemove} уволен!`, type: 'error' },
            ]);
            setConfirmDialogOpen(false);
            setCharacterToRemove(null);
        }
    };

    const handleRestCharacter = (characterId) => {
        setCharacters((prevCharacters) =>
            prevCharacters.map((char) =>
                char.id === characterId ? { ...char, isResting: false, isTired: false, isOvertime: false } : char
            )
        );
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Персонаж ${characterId} отдохнул и готов работать!`, type: 'success' },
        ]);
    };

    const handleSelectCharacter = (characterId) => {
        setShowPopup(false);
        const selectedCharacter = availableCharacters.find((char) => char.id === characterId);
        setCharacters((prevCharacters) => [...prevCharacters, selectedCharacter]);
        setAvailableCharacters((prevAvailable) => prevAvailable.filter((char) => char.id !== characterId));
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Добавлен новый персонаж: ${selectedCharacter.name}`, type: 'info' },
        ]);
    };

    const handleSelectStack = (taskId, stackName) => {
        setShowTaskPopup(false);
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, assignedTo: stackName, progress: 0 } : task
            )
        );
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Задача ${selectedTask.name} назначена на ${stackName}.`, type: 'info' },
        ]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => {
                    if (task.assignedTo) {
                        /*const workingCharacters = characters.filter(
                            (char) => !char.isResting && !char.isTired && char.isOvertime
                        );
                        const baseSpeed = workingCharacters.reduce(
                            (total, char) => total + char.stats.speed + char.stats.strength + char.stats.intelligence,
                            0
                        );*/

                        //console.log(baseSpeed)
                        const newProgress = task.progress + Math.floor(Math.random() * 5)
                        if (newProgress >= 100) {
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                { text: `Задача ${task.name} выполнена успешно!`, type: 'success' },
                                { text: 'Новая задача пришла! Пожалуйста, назначьте её.', type: 'info' },
                            ]);
                            setShowTaskPopup(true);
                            setSelectedTask(task);
                            return { ...task, progress: 100, assignedTo: null };
                        }
                        return { ...task, progress: newProgress };
                    }
                    return task;
                })
            );

            setCharacters((prevCharacters) =>
                prevCharacters.map((char) => {
                    if (char.isOvertime) {
                        const isTired = Math.random() > 0.7;
                        if (isTired) {
                            return { ...char, isTired: true, isResting: true, isOvertime: false };
                        }
                    }
                    return char;
                })
            );
        }, 1000);

        const newCharacterInterval = setInterval(() => {
            const newCharacter = getNewCharacter();
            setAvailableCharacters((prev) => [...prev, newCharacter]);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Новый персонаж доступен для добавления!', type: 'info' },
            ]);
        }, 1500);

        return () => {
            clearInterval(interval);
            clearInterval(newCharacterInterval);
        };
    }, [characters]);

    const handleOpenConfirmDialog = (characterId) => {
        setCharacterToRemove(characterId);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
        setCharacterToRemove(null);
    };

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="left">
                <div className="character-list">
                    {characters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            onActivateOvertime={handleActivateOvertime}
                            onRemoveCharacter={handleOpenConfirmDialog}
                            onRestCharacter={handleRestCharacter}
                        />
                    ))}
                </div>
                <OvertimeList characters={characters} onRestCharacter={handleRestCharacter} />
            </div>
            <div className="right">
                <div className="tasks">
                    {tasks.map((task) => (
                        <TaskProgress key={task.id} task={task} />
                    ))}
                </div>
                <Chat messages={messages} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowPopup(true)}
                >
                    Добавить персонажа
                </Button>
            </div>
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogTitle>Доступные персонажи</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {availableCharacters.length === 0 ? (
                            <p>Нет доступных персонажей.</p>
                        ) : (
                            availableCharacters.map((char) => (
                                <Grid item key={char.id}>
                                    <CharacterCard
                                        character={char}
                                        onClick={() => handleSelectCharacter(char.id)}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(false)} color="secondary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showTaskPopup} onClose={() => setShowTaskPopup(false)}>
                <DialogTitle>Назначить задачу</DialogTitle>
                <DialogContent>
                    <p>Выберите стек для задачи: {selectedTask?.name}</p>
                    <Button onClick={() => handleSelectStack(selectedTask.id, 'Разработка')} color="primary">
                        Разработка
                    </Button>
                    <Button onClick={() => handleSelectStack(selectedTask.id, 'Аналитика')} color="primary">
                        Аналитика
                    </Button>
                    {/* Добавьте другие стеки по необходимости */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowTaskPopup(false)} color="secondary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <p>Вы уверены, что хотите уволить этого сотрудника?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="secondary">
                        Отмена
                    </Button>
                    <Button onClick={handleRemoveCharacter} color="primary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default App;
