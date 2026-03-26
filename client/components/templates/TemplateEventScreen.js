import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';

export default function EventScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const subtitle = data?.fields?.subtitle ?? '';
    const description = data?.fields?.description ?? '';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                px: 4,
                py: 6,
                pb: '400px',
                position: 'relative',
            }}>
            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '60px',
                    maxWidth: '700px',
                    margin: '0 auto',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    <Typography
                        variant="h3"
                        sx={{ color: 'white' }}>
                        Welcome to
                    </Typography>
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    {title ? (
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap', // preserve newlines
                            }}>
                            {title}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    {subtitle ? (
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap', // preserve newlines
                            }}>
                            {subtitle}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    {description ? (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap',
                                maxWidth: 'min(960px, 90vw)',
                            }}>
                            {description}
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
                        bottom: '100px',
                    }}>
                    <MotionWrapper
                        mounted={true}
                        index={4}>
                        <Box
                            component="img"
                            src={eventLogoUrl}
                            alt={eventLogoAlt}
                            sx={{
                                width: '301px',
                                height: '290px',
                                objectFit: 'contain',
                            }}
                        />
                    </MotionWrapper>
                </Box>
            ) : null}
        </Stack>
    );
}
