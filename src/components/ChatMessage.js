import React from 'react';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.type}`}>
            {message.text}
        </div>
    );
};

export default ChatMessage;
