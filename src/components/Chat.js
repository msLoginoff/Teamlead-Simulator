import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const messageStyles = {
    info: { backgroundColor: 'lightblue' },
    success: { backgroundColor: 'lightgreen' },
    error: { backgroundColor: 'lightcoral' },
};

const Chat = ({ messages }) => {
    return (
        <div className="chat">
            <Typography variant="h6" align="center">
                Чат
            </Typography>
            <List style={{ maxHeight: '200px', overflow: 'auto' }}>
                {messages.map((msg, index) => (
                    <ListItem key={index} style={messageStyles[msg.type]}>
                        <ListItemText primary={msg.text} secondary={new Date().toLocaleTimeString()} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Chat;
