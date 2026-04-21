import React from 'react';
import { Box } from '@mui/material';
import BackgroundProvider from './BackgroundProvider';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import SurveyQuestion from './SurveyQuestion';
import ThankYou from './ThankYou';
import Intro from './Intro';
import Outro from './Outro';
import { motion } from 'framer-motion';

export default function AppRoot() {
    const { bgStep, currentStep, content, totalSteps } = useAppState();

    const questionCount = content?.length ?? 0;
    const thankYouStep = questionCount + 1;
    const outroStep = questionCount + 2;
    const lastStep = totalSteps - 1;

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                background: 'grey',
                position: 'relative',
                color: 'white',
                fontFamily: '"Museo Sans Rounded"',
            }}
            onContextMenu={e => e.preventDefault()}>
            <BackgroundProvider />

            <Box
                component={motion.div}
                transition={{
                    duration: bgStep === lastStep ? 3 : 0.9,
                    delay: bgStep === lastStep ? 1 : 0,
                    ease: 'easeInOut',
                }}
                initial={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                animate={{
                    top: bgStep === 0 || bgStep === lastStep ? '50%' : '0%',
                    transform: bgStep === 0 || bgStep === lastStep ? 'translateY(-50%)' : 'translateY(0)',
                }}
                sx={{
                    height: 290,
                    padding: '80px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                }}>
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
                }}>
                <Box
                    sx={{
                        paddingTop: '290px',
                        paddingBottom: '290px', // spacer to enable centering
                        flex: 1,
                        display: 'flex',
                    }}>
                    {currentStep === 0 && <Intro />}
                    {questionCount > 0 &&
                        currentStep >= 1 &&
                        currentStep <= questionCount &&
                        content[currentStep - 1] && (
                            <SurveyQuestion
                                key={currentStep}
                                question={content[currentStep - 1]}
                                questionIndex={currentStep - 1}
                            />
                        )}
                    {questionCount > 0 && currentStep === thankYouStep && <ThankYou />}
                    {questionCount > 0 && currentStep === outroStep && <Outro />}
                </Box>
            </Box>
        </Box>
    );
}
