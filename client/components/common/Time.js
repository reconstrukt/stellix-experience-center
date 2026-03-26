import Box from '@mui/material/Box';
import React, { useEffect, useMemo, useState } from 'react';

function formatTime(date, locale) {
    // en-US produces the requested format: "09:30 AM"
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

export default function Time({
    locale = 'en-US',
    updateIntervalMs = 1000,
    sx,
    ...props
}) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), updateIntervalMs);
        return () => clearInterval(id);
    }, [updateIntervalMs]);

    const text = useMemo(() => formatTime(now, locale), [now, locale]);

    return (
        <Box
            component="span"
            sx={{
                color: '#FFF',
                textAlign: 'right',
                fontFamily: '"Museo Sans Rounded"',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 250,
                display: 'block',
                ...sx,
            }}
            {...props}>
            {text}
        </Box>
    );
}
