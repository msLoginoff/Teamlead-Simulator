import React from 'react';
import { Card, CardContent, Typography, Avatar, Button, IconButton, Box } from '@mui/material';
import { Delete, AccessTime, SentimentSatisfied, SentimentDissatisfied } from '@mui/icons-material';

const CharacterCard = ({ character, onActivateOvertime, onRemoveCharacter, onRestCharacter, onClick }) => {
    const handleRemove = (e) => {
        e.stopPropagation();
        onRemoveCharacter(character.id);
    };

    const handleRest = (e) => {
        e.stopPropagation();
        onRestCharacter(character.id);
    };

    const handleOvertime = (e) => {
        e.stopPropagation();
        onActivateOvertime(character.id);
    };

    const smileyIcons = character.isTired
        ? [<SentimentDissatisfied key="1" />, <SentimentDissatisfied key="2" />, <SentimentDissatisfied key="3" />]
        : [<SentimentSatisfied key="1" />, <SentimentSatisfied key="2" />, <SentimentSatisfied key="3" />];

    return (
        <Card
            onClick={onClick}
            style={{
                marginBottom: '20px',
                position: 'relative',
                width: '200px',
                cursor: 'pointer',
                opacity: character.isResting ? 0.5 : 1,
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{character.name}</Typography>
                    <IconButton size="small" onClick={handleRemove}>
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
                <Avatar
                    src={character.image}
                    alt={character.name}
                    style={{ width: '80px', height: '80px', margin: 'auto' }}
                />
                <Typography variant="body2" align="center">
                    Скорость: {character.stats.speed}
                </Typography>
                <Typography variant="body2" align="center">
                    Сила: {character.stats.strength}
                </Typography>
                <Typography variant="body2" align="center">
                    Интеллект: {character.stats.intelligence}
                </Typography>
                <Box display="flex" justifyContent="center" marginTop="10px">
                    {smileyIcons}
                </Box>
                {!character.isResting ? (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AccessTime />}
                        onClick={handleOvertime}
                        style={{ display: 'block', margin: '10px auto 0' }}
                        disabled={character.isTired}
                    >
                        24 часа
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRest}
                        style={{ display: 'block', margin: '10px auto 0' }}
                    >
                        Выйти из отпуска
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default CharacterCard;
