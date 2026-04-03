import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

export default function MotionWrapper({ mounted, children, index = 0, ...props }) {
    return (
        <Box
            component={motion.div}
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: mounted ? 1 : 0,
                y: mounted ? 0 : -40,
            }}
            exit={{
                opacity: 0,
                y: -40,
            }}
            transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: 'easeOut',
            }}
            {...props}>
            {children}
        </Box>
    );
}
