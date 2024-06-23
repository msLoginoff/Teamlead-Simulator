import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const TaskProgress = ({ task }) => {
    return (
        <Box style={{ marginBottom: '20px', position: 'relative' }}>
            <Typography variant="h6" align="center">
                {task.name}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={task.progress}
                style={{ height: '20px', borderRadius: '10px', transition: 'width 0.5s ease' }}
            />
            <Typography variant="body2" align="center" style={{ marginTop: '5px' }}>
                {task.progress.toFixed(1)}%
            </Typography>
        </Box>
    );
};

export default TaskProgress;
