export const getNewCharacter = () => {
    const id = Math.floor(Math.random() * 1000) + 3; // уникальный ID для нового персонажа
    const names = ['Charlie', 'Dave', 'Eve', 'Frank', 'Grace'];
    const images = ['character1.jpg', 'character2.png', 'character1.jpg', 'character2.png'];
    const stats = {
        speed: Math.floor(Math.random() * 10) + 1,
        strength: Math.floor(Math.random() * 10) + 1,
        intelligence: Math.floor(Math.random() * 10) + 1,
    };
    return {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        isTired: false,
        isResting: false,
        isOvertime: false,
        image: images[Math.floor(Math.random() * images.length)],
        stats,
        happiness: [1, 1, 1],
    };
};
