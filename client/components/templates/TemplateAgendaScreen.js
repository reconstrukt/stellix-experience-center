import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useActiveAgendaIndex from '@/client/hooks/useActiveAgendaIndex';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';

function buildAgendaItems(fields) {
    const items = [];
    for (let i = 1; i <= 12; i += 1) {
        const timeslot = (fields?.[`timeslot${i}`] ?? '').trim();
        const event = (fields?.[`event${i}`] ?? '').trim();
        if (!timeslot || !event) continue;
        items.push({ timeslot, event });
    }
    return items;
}

export default function AgendaScreenTemplate({ data }) {
    const fields = data?.fields ?? {};
    const title = fields?.title ?? 'Agenda';
    const dateHeading = fields?.dateHeading ?? '';
    const agendaItems = buildAgendaItems(fields);
    const eventLogoUrl = toHttpsUrl(fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = fields?.eventLogo?.fields?.title ?? 'Event logo';

    const activeIndex = useActiveAgendaIndex(agendaItems);

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
                sx={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Box sx={{ maxWidth: '800px', width: '100%' }}>
                    <Stack
                        spacing="50px"
                        sx={{ width: '100%' }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                            }}>
                            {title}
                        </Typography>

                        {dateHeading ? (
                            <Typography
                                sx={{
                                    width: '100%',
                                    fontSize: '32px',
                                    fontWeight: 300,
                                }}>
                                {dateHeading}
                            </Typography>
                        ) : null}

                        {agendaItems.length ? (
                            <Box sx={{ width: '100%' }}>
                                {agendaItems.map((item, idx) => (
                                    <Box key={`${item.timeslot}-${idx}`}>
                                        <Box py={2}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '55px',
                                                    py: 1,
                                                    background:
                                                        idx === activeIndex
                                                            ? 'rgba(28, 189, 199, 0.30)'
                                                            : 'transparent',
                                                }}>
                                                <Typography
                                                    sx={{
                                                        width: '200px',
                                                        fontSize: '24px',
                                                        fontWeight: 500,
                                                        flex: '0 0 auto',
                                                    }}>
                                                    {item.timeslot}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 300,
                                                        flex: '1 1 auto',
                                                        minWidth: 0,
                                                    }}>
                                                    {item.event}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {idx < agendaItems.length - 1 ? (
                                            <Box
                                                component={motion.div}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    delay: idx * 0.08,
                                                    duration: 0.6,
                                                    ease: 'easeOut',
                                                }}
                                                sx={{
                                                    height: '2px',
                                                    width: '100%',
                                                    bgcolor: '#FFF',
                                                    transformOrigin: 'left',
                                                }}
                                            />
                                        ) : null}
                                    </Box>
                                ))}
                            </Box>
                        ) : null}
                    </Stack>
                </Box>
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
