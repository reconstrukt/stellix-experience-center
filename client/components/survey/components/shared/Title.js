import { Box } from '@mui/material';
import React from 'react';

export default function Title({ children }) {
    return (
        <Box
            sx={{
                fontWeight: 400,
                fontSize: 55,
                lineHeight: '120%',
                letterSpacing: '0%',
                textAlign: 'center',
                textWrap: 'balance',
            }}
        >
            {children}
        </Box>
    );
}
