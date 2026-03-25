import { Box, Stack, Typography } from '@mui/material';

function toHttpsUrl(url) {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return url;
}

export default function WelcomeScreenTemplate({ data }) {
    const title = data?.fields?.title ?? '';
    const bottomLogo = Boolean(data?.fields?.bottomLogo);
    const centerImageUrl = toHttpsUrl(data?.fields?.centerImage?.fields?.file?.url);
    const centerImageAlt = data?.fields?.centerImage?.fields?.title ?? title ?? 'Welcome';

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                px: 4,
                py: 6,
                alignItems: 'center',
                justifyContent: bottomLogo ? 'space-between' : 'center',
                textAlign: 'center',
            }}>
            <Box />

            <Stack
                spacing={3}
                sx={{ alignItems: 'center' }}>
                {title ? (
                    <Typography
                        variant="h4"
                        component="h1">
                        {title}
                    </Typography>
                ) : null}

                {centerImageUrl ? (
                    <Box
                        component="img"
                        src={centerImageUrl}
                        alt={centerImageAlt}
                        sx={{
                            width: 'min(520px, 90vw)',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                ) : null}
            </Stack>

            {bottomLogo ? <Box /> : null}
        </Stack>
    );
}
