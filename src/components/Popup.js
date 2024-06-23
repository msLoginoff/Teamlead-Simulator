import React from 'react';
import './Popup.css';

const Popup = ({ characters, onSelectCharacter, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Выберите персонажа</h2>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="character-list">
                    {characters.length > 0 ? (
                        characters.map((character) => (
                            <div
                                key={character.id}
                                className="character-item"
                                onClick={() => onSelectCharacter(character.id)}
                            >
                                <img src={character.image} alt={character.name} className="character-image" />
                                <h3>{character.name}</h3>
                            </div>
                        ))
                    ) : (
                        <p>Нет доступных персонажей</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
