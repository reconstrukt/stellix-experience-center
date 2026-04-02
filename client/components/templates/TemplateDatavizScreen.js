import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import DatavizStub from '../common/DatavizStub';
import MotionWrapper from '../common/MotionWrapper';

export default function DatavizTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                width: '100%',
                px: 4,
                py: 6,
                pb: '400px',
                position: 'relative',
                overflowX: 'hidden',
                WebkitTextSizeAdjust: '100%',
                textSizeAdjust: '100%',
            }}>
            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    width: '100%',
                    minWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '60px',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    {title ? (
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap',
                                maxWidth: '100%',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                            }}>
                            {title}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    <DatavizStub />
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
