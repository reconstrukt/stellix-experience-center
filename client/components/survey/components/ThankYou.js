import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import palette from '@/client/lib/palette';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import MotionWrapper from './shared/MotionWrapper';

export default function ThankYou() {
    const { goToNextStep, goToNextBgStep } = useAppState();
    const [out, setOut] = useState(false);

    useEffect(() => {
        const outTimeout = setTimeout(() => setOut(true), 2000);
        const bgTimeout = setTimeout(goToNextBgStep, 2000);
        const timeout = setTimeout(goToNextStep, 6000);

        return () => {
            clearTimeout(outTimeout);
            clearTimeout(bgTimeout);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={goToNextStep}
        >
            <MotionWrapper mounted={!out}>
                <Box
                    sx={{
                        fontSize: 106,
                        color: palette.charcoal,
                    }}
                >
                    Thank You
                </Box>
            </MotionWrapper>
        </Box>
    );
}
