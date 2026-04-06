import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';
import TemplateScreenStack from '../common/TemplateScreenStack';

export default function WelcomeScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';
    const centerImageUrl = toHttpsUrl(data?.fields?.centerImage?.fields?.file?.url);
    const centerImageAlt = data?.fields?.centerImage?.fields?.title ?? title ?? 'Welcome';
    const centerText = data?.fields?.centerText ?? '';

    return (
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}>
            <Stack
                spacing={3}
                sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '200px' }}>
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
                                width: 'min(1040px, 90vw)',
                                height: 'auto',
                                maxHeight: '800px',
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
        </TemplateScreenStack>
    );
}
