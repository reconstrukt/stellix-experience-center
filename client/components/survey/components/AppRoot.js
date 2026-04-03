import React from 'react';
import { Box } from '@mui/material';
import BackgroundProvider from './BackgroundProvider';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import Question1 from './Question1';
import Question2 from './Question2';
import ThankYou from './ThankYou';
import Intro from './Intro';
import Outro from './Outro';
import { motion } from 'framer-motion';

export default function AppRoot() {
    const { bgStep, currentStep } = useAppState();

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                background: 'grey',
                position: 'relative',
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <BackgroundProvider />

            <Box
                component={motion.div}
                transition={{
                    duration: bgStep === 4 ? 3 : 0.9,
                    delay: bgStep === 4 ? 1 : 0,
                    ease: 'easeInOut',
                }}
                initial={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                animate={{
                    top: bgStep === 0 || bgStep === 4 ? '50%' : '0%',
                    transform:
                        bgStep === 0 || bgStep === 4
                            ? 'translateY(-50%)'
                            : 'translateY(0)',
                }}
                sx={{
                    height: 290,
                    padding: '80px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                }}
            >
                <img
                    src="/stellix-logo-white.svg"
                    alt=""
                    width={375}
                    height={135}
                />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        paddingTop: '290px',
                        paddingBottom: '290px', // spacer to enable centering
                        flex: 1,
                        display: 'flex',
                    }}
                >
                    {currentStep === 0 && <Intro />}
                    {currentStep === 1 && <Question1 />}
                    {currentStep === 2 && <Question2 />}
                    {currentStep === 3 && <ThankYou />}
                    {currentStep === 4 && <Outro />}
                </Box>
            </Box>
        </Box>
    );
}
