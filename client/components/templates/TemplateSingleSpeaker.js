import { Box, Stack, Typography } from '@mui/material';
import MotionWrapper from '../common/MotionWrapper';

export default function TemplateSingleSpeaker({ speaker }) {
    const { role, name, title, bio, photoUrl, photoAlt } = speaker;

    return (
        <>
            <MotionWrapper
                mounted={true}
                index={2}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '670px 1fr',
                        gap: '96px',
                    }}>
                    {photoUrl ? (
                        <Box
                            component="img"
                            src={photoUrl}
                            alt={photoAlt}
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
                        {role ? (
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: '"Museo Sans Rounded"',
                                    fontSize: '90px',
                                    fontWeight: 100,
                                    lineHeight: '120%',
                                }}>
                                {role}
                            </Typography>
                        ) : null}

                        {name ? (
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: '"Museo Sans Rounded"',
                                    fontSize: '120px',
                                    fontWeight: 300,
                                    lineHeight: '120%',
                                }}>
                                {name}
                            </Typography>
                        ) : null}

                        {title ? (
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: '"Museo Sans Rounded"',
                                    fontSize: '90px',
                                    fontWeight: 100,
                                    lineHeight: '120%',
                                }}>
                                {title}
                            </Typography>
                        ) : null}
                    </Stack>
                </Box>
            </MotionWrapper>

            <MotionWrapper
                mounted={true}
                index={4}>
                {bio ? (
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'anywhere',
                            width: '100%',
                        }}>
                        {bio}
                    </Typography>
                ) : null}
            </MotionWrapper>
        </>
    );
}
