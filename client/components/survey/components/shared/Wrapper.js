import { Box } from '@mui/material';
import React from 'react';

export default function Wrapper({ children }) {
    return (
        <Box
            sx={{
                width: '100%',
                padding: '0 50px',
            }}
        >
            {children}
        </Box>
    );
}
