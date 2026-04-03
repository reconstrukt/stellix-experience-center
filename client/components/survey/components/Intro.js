import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import MotionWrapper from './shared/MotionWrapper';
import Title from './shared/Title';
import NextButton from './shared/NextButton';
import palette from '@/client/lib/palette';

export default function Intro() {
    const { goToNextStep, goToNextBgStep, loading, content, loadError } =
        useAppState();
    const [out, setOut] = useState(false);

    const handleStart = () => {
        setOut(true);
        goToNextBgStep();

        setTimeout(() => goToNextStep(), 1000);
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <MotionWrapper mounted={!out}>
                    <Title>
                        Help us serve your industry
                        <br /> needs better with this 30-second
                        <br />
                        questionnaire
                    </Title>
                </MotionWrapper>
            </Box>

            <Box
                sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                }}
            ></Box>

            <Box
                sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {loading ? (
                    <CircularProgress sx={{ color: palette.teal }} size={76} />
                ) : loadError || !content ? (
                    <Box
                        sx={{
                            fontSize: 28,
                            textAlign: 'center',
                            maxWidth: 560,
                            px: 2,
                            color: palette.offWhite,
                        }}
                    >
                        {loadError
                            ? 'Unable to load the questionnaire. Please try again later.'
                            : ''}
                    </Box>
                ) : (
                    <MotionWrapper mounted={!out}>
                        <NextButton onClick={handleStart}>Start</NextButton>
                    </MotionWrapper>
                )}
            </Box>
        </Box>
    );
}
