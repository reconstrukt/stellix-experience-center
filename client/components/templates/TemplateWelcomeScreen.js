import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';

export default function WelcomeScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';
    const centerImageUrl = toHttpsUrl(data?.fields?.centerImage?.fields?.file?.url);
    const centerImageAlt = data?.fields?.centerImage?.fields?.title ?? title ?? 'Welcome';
    const centerText = data?.fields?.centerText ?? '';

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                px: 4,
                py: 6,
                pb: '500px',
                position: 'relative',
            }}>
            <Stack
                spacing={3}
                sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '200px' }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    {title ? (
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{ color: 'white' }}>
                            {title}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    {centerImageUrl ? (
                        <Box
                            component="img"
                            src={centerImageUrl}
                            alt={centerImageAlt}
                            sx={{
                                width: 'min(1040px, 90vw)',
                                height: 'auto',
                                maxHeight: '800px',
                                objectFit: 'contain',
                            }}
                        />
                    ) : centerText ? (
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap', // preserve newlines
                            }}>
                            {centerText}
                        </Typography>
                    ) : null}
                </MotionWrapper>
            </Stack>

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
                        index={4}>
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
