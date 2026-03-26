'use client';

import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import useDeviceNow from '@/client/hooks/useDeviceNow';

function formatTime(date, locale) {
    // en-US produces the requested format: "09:30 AM"
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

export default function Time({ locale = 'en-US', updateIntervalMs = 1000, sx, ...props }) {
    const now = useDeviceNow({ updateIntervalMs });

    const text = useMemo(() => (now ? formatTime(now, locale) : '--:--'), [now, locale]);

    return (
        <Box
            sx={{
                color: '#FFF',
                textAlign: 'right',
                fontSize: '20px',
                fontWeight: 250,
                ...sx,
            }}
            {...props}>
            {text}
        </Box>
    );
}
