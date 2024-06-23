import React from 'react';
import { Card, CardContent, Typography, Avatar, LinearProgress, Box, Button } from '@mui/material';
import { BeachAccess } from '@mui/icons-material';

const OvertimeList = ({ characters, onRestCharacter }) => {
    const restingCharacters = characters.filter((char) => char.isResting);

    return (
        <div>
            {restingCharacters.map((character) => (
                <Card key={character.id} style={{ marginBottom: '20px', position: 'relative', width: '200px' }}>
                    <CardContent>
                        <Avatar
                            src={character.image}
                            alt={character.name}
                            style={{ width: '80px', height: '80px', margin: 'auto' }}
                        />
                        <Typography variant="h6" align="center">
                            {character.name}
                        </Typography>
                        <Typography variant="body2" align="center">
                            На отдыхе
                        </Typography>
                        <BeachAccess style={{ color: 'blue', margin: '10px auto 0', display: 'block' }} />
                        <Box marginTop="10px">
                            <LinearProgress variant="determinate" value={Math.random() * 100} />
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onRestCharacter(character.id)}
                            style={{ display: 'block', margin: '10px auto 0' }}
                        >
                            Выйти из отпуска
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default OvertimeList;
