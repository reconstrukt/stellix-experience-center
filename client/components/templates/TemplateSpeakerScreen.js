import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';

export default function SpeakerScreenTemplate({ data }) {
    const eventType = data?.fields?.eventType ?? '';
    const speakerRole = data?.fields?.speakerOneRole ?? '';
    const speakerName = data?.fields?.speakerOneName ?? '';
    const speakerTitle = data?.fields?.speakerOneTitle ?? '';
    const speakerBio = data?.fields?.speakerOneBio ?? '';
    const speakerPhotoUrl = toHttpsUrl(data?.fields?.speakerOnePhoto?.fields?.file?.url);
    const speakerPhotoAlt = data?.fields?.speakerOnePhoto?.fields?.title ?? speakerName ?? 'Speaker portrait';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';

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
            <Stack
                sx={{
                    flex: 1,
                    width: '100%',
                    maxWidth: '1500px',
                    margin: '0 auto',
                    gap: '112px',
                    justifyContent: 'center',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    {eventType ? (
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'anywhere',
                                pb: 6,
                            }}>
                            {eventType}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={2}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(520px, 680px) minmax(0, 1fr)',
                            gap: '96px',
                            alignItems: 'flex-end',
                            width: '100%',
                        }}>
                        {speakerPhotoUrl ? (
                            <Box
                                component="img"
                                src={speakerPhotoUrl}
                                alt={speakerPhotoAlt}
                                sx={{
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    borderRadius: '24px',
                                    justifySelf: 'center',
                                }}
                            />
                        ) : (
                            <Box />
                        )}

                        <Stack
                            sx={{
                                minWidth: 0,
                                gap: '32px',
                                pb: 8,
                            }}>
                            {speakerRole ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '69px',
                                        fontWeight: 100,
                                        lineHeight: '150%',
                                        whiteSpace: 'pre-wrap',
                                        overflowWrap: 'anywhere',
                                    }}>
                                    {speakerRole}
                                </Typography>
                            ) : null}

                            {speakerName ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '96px',
                                        fontWeight: 300,
                                        lineHeight: '150%',
                                        whiteSpace: 'pre-wrap',
                                        overflowWrap: 'anywhere',
                                    }}>
                                    {speakerName}
                                </Typography>
                            ) : null}

                            {speakerTitle ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '54px',
                                        fontWeight: 100,
                                        lineHeight: '95%',
                                        whiteSpace: 'pre-wrap',
                                        overflowWrap: 'anywhere',
                                    }}>
                                    {speakerTitle}
                                </Typography>
                            ) : null}
                        </Stack>
                    </Box>
                </MotionWrapper>

                <MotionWrapper
                    mounted={true}
                    index={4}>
                    {speakerBio ? (
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'anywhere',
                                width: '100%',
                            }}>
                            {speakerBio}
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
                        index={6}>
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
