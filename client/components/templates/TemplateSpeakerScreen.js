import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';
import TemplateScreenStack from '../common/TemplateScreenStack';

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
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}
            eventLogoMotionIndex={6}>
            <Stack
                sx={{
                    flex: 1,
                    width: '100%',
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
                            gridTemplateColumns: '670px 1fr',
                            gap: '96px',
                        }}>
                        {speakerPhotoUrl ? (
                            <Box
                                component="img"
                                src={speakerPhotoUrl}
                                alt={speakerPhotoAlt}
                                sx={{
                                    width: '100%',
                                    maxWidth: '722px',
                                    aspectRatio: '3/4',
                                    height: 'auto',
                                    objectFit: 'cover',
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
                                justifyContent: 'center',
                            }}>
                            {speakerRole ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '90px',
                                        fontWeight: 100,
                                        lineHeight: '120%',
                                    }}>
                                    {speakerRole}
                                </Typography>
                            ) : null}

                            {speakerName ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '120px',
                                        fontWeight: 300,
                                        lineHeight: '120%',
                                    }}>
                                    {speakerName}
                                </Typography>
                            ) : null}

                            {speakerTitle ? (
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: '"Museo Sans Rounded"',
                                        fontSize: '90px',
                                        fontWeight: 100,
                                        lineHeight: '120%',
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
        </TemplateScreenStack>
    );
}
