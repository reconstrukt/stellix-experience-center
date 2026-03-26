import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';

export default function WelcomeScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const bottomLogo = Boolean(data?.fields?.bottomLogo);
    const centerImageUrl = toHttpsUrl(data?.fields?.centerImage?.fields?.file?.url);
    const centerImageAlt = data?.fields?.centerImage?.fields?.title ?? title ?? 'Welcome';
    const centerText = data?.fields?.centerText ?? '';

    console.log('Page Data: ', data);

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                px: 4,
                py: 6,
                pb: '250px',
                position: 'relative',
            }}>
            <Stack
                spacing={3}
                sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '100px' }}>
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
                                width: 'min(520px, 90vw)',
                                height: 'auto',
                                maxHeight: '400px',
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

            {bottomLogo ? (
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
                            src="/stellix-logo-white.svg"
                            alt="Stellix"
                            sx={{
                                width: '301px',
                                height: '109px',
                            }}
                        />
                    </MotionWrapper>
                </Box>
            ) : null}
        </Stack>
    );
}
