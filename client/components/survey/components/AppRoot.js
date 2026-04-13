import React from 'react';
import { Box } from '@mui/material';
import BackgroundProvider from './BackgroundProvider';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import QuestionSingleAnswer from './QuestionSingleAnswer';
import QuestionMultiAnswer from './QuestionMultiAnswer';
import ThankYou from './ThankYou';
import Intro from './Intro';
import Outro from './Outro';
import { motion } from 'framer-motion';

export default function AppRoot() {
    const { bgStep, currentStep, content } = useAppState();

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
                    transform: bgStep === 0 || bgStep === 4 ? 'translateY(-50%)' : 'translateY(0)',
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
                    {currentStep === 1 && content?.[0] && (
                        <QuestionSingleAnswer
                            questionPrompt={content[0].prompt ?? ''}
                            questionOptions={content[0].answers?.map(item => item.title) ?? []}
                        />
                    )}
                    {currentStep === 2 && content?.[1] && (
                        <QuestionMultiAnswer
                            questionPrompt={content[1].prompt ?? ''}
                            questionOptions={content[1].answers?.map(item => item.title) ?? []}
                        />
                    )}
                    {currentStep === 3 && <ThankYou />}
                    {currentStep === 4 && <Outro />}
                </Box>
            </Box>
        </Box>
    );
}
