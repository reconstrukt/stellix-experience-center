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

export default function BackgroundProvider() {
    const { bgStep } = useAppState();

    const currentGradient = GRADIENT[bgStep];

    const transitionDuration = bgStep === 4 ? '4s' : '2s';

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            }}
        >
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
                        bgStep === 0 || bgStep === 1 || bgStep === 4
                            ? palette.black
                            : palette.offWhite,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background:
                        'linear-gradient(180deg, #3B4752 1.79%, transparent 95%)',
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
                }}
            >
                {Array.from({ length: 5 }).map((row, rowIndex) => (
                    <Box
                        key={rowIndex}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
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

                    transition: `
                        opacity 1s ease,
                        --bg-width ${transitionDuration} ease, 
                        --bg-height ${transitionDuration} ease,
                        --bg-yellow-low ${transitionDuration} ease, 
                        --bg-yellow-high ${transitionDuration} ease, 
                        --bg-teal-low ${transitionDuration} ease, 
                        --bg-teal-high ${transitionDuration} ease
                    `,

                    '--bg-width': currentGradient.width,
                    '--bg-height': currentGradient.height,
                    '--bg-yellow-low': currentGradient.yellowLow,
                    '--bg-yellow-high': currentGradient.yellowHigh,
                    '--bg-teal-low': currentGradient.tealLow,
                    '--bg-teal-high': currentGradient.tealHigh,

                    background: `radial-gradient(
                            var(--bg-width) var(--bg-height) at bottom, 
                          #E0B03C var(--bg-yellow-low), rgba(224, 176, 60, 0.8) var(--bg-yellow-high), 
                            rgba(28, 189, 199, 0.5) var(--bg-teal-low), rgba(28, 189, 199, 0) var(--bg-teal-high))`,
                }}
            ></Box>
        </Box>
    );
}
