import { Box, Stack, Typography } from '@mui/material';
import MotionWrapper from '../common/MotionWrapper';

function SpeakerBlurb({ speaker }) {
    const { role, name, title, photoUrl, photoAlt } = speaker;

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '405px 1fr',
                columnGap: '80px',
                alignItems: 'center',
                width: '100%',
            }}>
            {photoUrl ? (
                <Box
                    component="img"
                    src={photoUrl}
                    alt={photoAlt}
                    sx={{
                        width: '405px',
                        height: '540px',
                        objectFit: 'cover',
                        bgcolor: '#3b4752',
                    }}
                />
            ) : (
                <Box
                    sx={{
                        width: '405px',
                        height: '540px',
                        bgcolor: '#3b4752',
                    }}
                />
            )}

            <Stack
                sx={{
                    minWidth: 0,
                    gap: '54px',
                    justifyContent: 'center',
                }}>
                {role ? (
                    <Typography
                        component="p"
                        sx={{
                            m: 0,
                            fontSize: '69px',
                            fontWeight: 100,
                            lineHeight: 1.5,
                        }}>
                        {role}
                    </Typography>
                ) : null}

                {name ? (
                    <Typography
                        component="p"
                        sx={{
                            m: 0,
                            fontSize: '128px',
                            fontWeight: 300,
                            lineHeight: 1.4,
                        }}>
                        {name}
                    </Typography>
                ) : null}

                {title ? (
                    <Typography
                        component="p"
                        sx={{
                            m: 0,
                            fontSize: '54px',
                            fontWeight: 100,
                            lineHeight: 1.15,
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'anywhere',
                        }}>
                        {title}
                    </Typography>
                ) : null}
            </Stack>
        </Box>
    );
}

export default function TemplateMultiSpeaker({ speakers }) {
    const list = Array.isArray(speakers) ? speakers : [];

    return (
        <MotionWrapper
            mounted={true}
            index={2}>
            <Stack
                sx={{
                    width: '100%',
                    gap: '112px',
                    alignItems: 'stretch',
                }}>
                {list.map((speaker, i) => (
                    <SpeakerBlurb
                        key={`${speaker.name}-${i}`}
                        speaker={speaker}
                    />
                ))}
            </Stack>
        </MotionWrapper>
    );
}
