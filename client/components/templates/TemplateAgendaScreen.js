import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useActiveAgendaIndex from '@/client/hooks/useActiveAgendaIndex';
import { toHttpsUrl } from '@/client/lib/url';
import TemplateScreenStack from '../common/TemplateScreenStack';

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
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}>
            <Stack
                sx={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Box>
                    <Stack
                        spacing="100px"
                        sx={{ width: '100%' }}>
                        <Typography
                            variant="h3"
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
                                    fontSize: '90px',
                                    fontWeight: 100,
                                    lineHeight: '120%',
                                }}>
                                {dateHeading}
                            </Typography>
                        ) : null}

                        {agendaItems.length ? (
                            <Box sx={{ width: '100%' }}>
                                {agendaItems.map((item, idx) => (
                                    <Box key={`${item.timeslot}-${idx}`}>
                                        <Box
                                            sx={{
                                                background:
                                                    idx === activeIndex ? 'rgba(28, 189, 199, 0.30)' : 'transparent',
                                                py: 2,
                                            }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '70px',
                                                    py: 1,
                                                }}>
                                                <Typography
                                                    sx={{
                                                        width: '600px',
                                                        fontSize: '64px',
                                                        fontWeight: 400,
                                                        flex: '0 0 auto',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                    {item.timeslot}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '64px',
                                                        fontWeight: 300,
                                                        flex: '1 1 auto',
                                                        minWidth: 0,
                                                        textWrap: 'balance',
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
                                                    height: '4px',
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
        </TemplateScreenStack>
    );
}
