import { Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';
import TemplateScreenStack from '../common/TemplateScreenStack';

export default function EventScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const subtitle = data?.fields?.subtitle ?? '';
    const description = data?.fields?.description ?? '';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';

    return (
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}>
            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    width: '100%',
                    minWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '120px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    <Typography variant="h3">Welcome to</Typography>
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
                    {subtitle ? (
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                maxWidth: '100%',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
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
                                maxWidth: '100%',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                            }}>
                            {description}
                        </Typography>
                    ) : null}
                </MotionWrapper>
            </Stack>
        </TemplateScreenStack>
    );
}
