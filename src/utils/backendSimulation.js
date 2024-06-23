let idCounter = 3;

export const getNewCharacter = () => ({
    id: idCounter++,
    name: `Character ${idCounter}`,
    isTired: false,
    isResting: false,
    isOvertime: false,
    image: `https://placeimg.com/80/80/people?id=${idCounter}`,
    stats: { speed: Math.floor(Math.random() * 10), strength: Math.floor(Math.random() * 10), intelligence: Math.floor(Math.random() * 10) },
});
