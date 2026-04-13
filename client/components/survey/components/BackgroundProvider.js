import React from 'react';
import { Box } from '@mui/material';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import palette from '@/client/lib/palette';

// const transitionDuration = '2s';

const GRADIENT = [
    {
        width: '120%',
        height: '0%',
        yellowLow: '10.5%',
        yellowHigh: '15.6%',
        tealLow: '26.4%',
        tealHigh: '39.7%',
    },

    {
        width: '270%',
        height: '90%',
        yellowLow: '10.5%',
        yellowHigh: '15.6%',
        tealLow: '26.4%',
        tealHigh: '39.7%',
    },

    {
        width: '584%',
        height: '192%',
        yellowLow: '11.7%',
        yellowHigh: '16.7%',
        tealLow: '28.5%',
        tealHigh: '40.5%',
    },

    {
        width: '857%',
        height: '192%',
        yellowLow: '0.7%',
        yellowHigh: '5.2%',
        tealLow: '18.1%',
        tealHigh: '100%',
    },

    {
        width: '120%',
        height: '0%',
        yellowLow: '10.5%',
        yellowHigh: '15.6%',
        tealLow: '26.4%',
        tealHigh: '39.7%',
    },
];

/** Maps flow phase to GRADIENT[0..4]: intro, mid questions, last question, thank you, outro. */
function gradientIndexForBgStep(bgStep, questionCount) {
    if (!questionCount || questionCount < 1) {
        return Math.min(bgStep, 4);
    }

    const thankYouStep = questionCount + 1;
    const outroStep = questionCount + 2;

    if (bgStep === 0) {
        return 0;
    }
    if (bgStep === outroStep) {
        return 4;
    }
    if (bgStep === thankYouStep) {
        return 3;
    }
    if (bgStep === questionCount) {
        return 2;
    }
    if (bgStep >= 1 && bgStep < questionCount) {
        return 1;
    }

    return Math.min(bgStep, 4);
}

export default function BackgroundProvider() {
    const { bgStep, totalSteps, content } = useAppState();

    const lastStep = totalSteps - 1;
    const questionCount = Array.isArray(content) ? content.length : 0;
    const gradientIndex = gradientIndexForBgStep(bgStep, questionCount);
    const currentGradient = GRADIENT[gradientIndex];

    const transitionDuration = bgStep === lastStep ? '4s' : '2s';

    const sunriseTransitionProps = [
        '--survey-sunrise-width',
        '--survey-sunrise-height',
        '--survey-sunrise-yellow-low',
        '--survey-sunrise-yellow-high',
        '--survey-sunrise-teal-low',
        '--survey-sunrise-teal-high',
    ].join(', ');

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            }}>
            {/* LOWEST LAYER */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transition: `background-color ${transitionDuration} ease`,
                    backgroundColor:
                        bgStep === 0 || bgStep === 1 || bgStep === lastStep ? palette.black : palette.offWhite,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, #3B4752 1.79%, transparent 95%)',
                }}
            />

            {/* DOTS */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 855,
                    height: 1685,
                    top: 109,
                    left: 112,
                    opacity: 0.2,

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                {Array.from({ length: 5 }).map((row, rowIndex) => (
                    <Box
                        key={rowIndex}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        {Array.from({ length: 3 }).map((dot, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: '100%',
                                    background: palette.offWhite,
                                }}
                            />
                        ))}
                    </Box>
                ))}
            </Box>

            {/* SUNRISE */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    // opacity: bgStep === 0 || bgStep === 4 ? 0 : 1,

                    transitionProperty: sunriseTransitionProps,
                    transitionDuration: transitionDuration,
                    transitionTimingFunction: 'ease',

                    '--survey-sunrise-width': currentGradient.width,
                    '--survey-sunrise-height': currentGradient.height,
                    '--survey-sunrise-yellow-low': currentGradient.yellowLow,
                    '--survey-sunrise-yellow-high': currentGradient.yellowHigh,
                    '--survey-sunrise-teal-low': currentGradient.tealLow,
                    '--survey-sunrise-teal-high': currentGradient.tealHigh,

                    background: `radial-gradient(
                            var(--survey-sunrise-width) var(--survey-sunrise-height) at bottom, 
                          #E0B03C var(--survey-sunrise-yellow-low), rgba(224, 176, 60, 0.8) var(--survey-sunrise-yellow-high), 
                            rgba(28, 189, 199, 0.5) var(--survey-sunrise-teal-low), rgba(28, 189, 199, 0) var(--survey-sunrise-teal-high))`,
                }}></Box>
        </Box>
    );
}
