import character from './assets/character1.jpg'
import character2 from './assets/character2.png'
export const initialEmployees = [
    {
        id: 1,
        name: 'John Doe',
        avatar: character,
        description: ['Skill 1', 'Skill 2'],
        skills: { development: 5, design: 3 },
        sleepTime: 5,
    },
    {
        id: 2,
        name: 'Jane Smith',
        avatar: character2,
        description: 'Experienced designer with a knack for creativity.',
        skills: { development: 3, design: 5 },
        sleepTime: 5,
    },
];

export const initialTasks = [
    {
        id: 1,
        name: 'Develop Feature X',
        progress: 0,
        assignedEmployees: [],
        speed: 5,
        isAnalytics: false,
    },
    {
        id: 2,
        name: 'Design UI for Feature Y',
        progress: 0,
        assignedEmployees: [],
        speed: 3,
        isAnalytics: true,
    },
    {
        id: 3,
        name: 'Design UI for Feature Y',
        progress: 0,
        assignedEmployees: [],
        speed: 3,
        isAnalytics: true,
    },
];

export const initialBuffs = {
    inactive: [
        {
            id: 1,
            name: 'Speed Buff',
            description: 'Increases work speed by 10%.',
        },
    ],
    active: [],
};

export const initialMessages = [
    { type: 'info', text: 'Welcome to the game!' },
    { type: null, text: 'Without type' },
    { type: 'info', text: 'With info' },
    { type: 'warn', text: 'With warn' },
    { type: 'success', text: 'With success' },
    { type: 'activate', text: 'With activate' },
];
