import { Box, Stack } from '@mui/material';
import MotionWrapper from './MotionWrapper';

export default function TemplateScreenStack({
    children,
    eventLogoUrl,
    eventLogoAlt = 'Event logo',
    eventLogoMotionIndex = 4,
}) {
    return (
        <Stack
            sx={{
                minHeight: '100vh',
                width: '100%',
                px: 4,
                py: 6,
                pb: '800px',
                position: 'relative',
                overflowX: 'hidden',
            }}>
            {children}
            {eventLogoUrl ? (
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '0px',
                    }}>
                    <MotionWrapper
                        mounted={true}
                        index={eventLogoMotionIndex}>
                        <Box
                            component="img"
                            src={eventLogoUrl}
                            alt={eventLogoAlt}
                            sx={{
                                width: '602px',
                                height: '580px',
                                objectFit: 'contain',
                            }}
                        />
                    </MotionWrapper>
                </Box>
            ) : null}
        </Stack>
    );
}
