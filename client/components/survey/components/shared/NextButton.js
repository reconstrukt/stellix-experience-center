import React from 'react';
import { Button } from '@mui/material';
import palette from '@/client/lib/palette';

export default function NextButton({ children, disabled, sx, ...props }) {
    return (
        <Button
            sx={{
                height: 64,
                backgroundColor: palette.charcoal,
                fontSize: 36,
                fontWeight: 500,
                color: palette.white,
                textTransform: 'none',
                fontFamily: 'Museo Sans Rounded',
                px: 6,
                borderRadius: 100,
                opacity: disabled ? 0.4 : 1,
                transition: 'opacity 0.1s ease',

                ...sx,
            }}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
}
