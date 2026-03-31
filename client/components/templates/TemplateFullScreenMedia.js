import { Box, Stack } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';

export default function FullScreenMediaTemplate({ data }) {
    const mediaFile = data?.fields?.media?.fields?.file;
    const mediaUrl = toHttpsUrl(mediaFile?.url);
    const mediaAlt = data?.fields?.media?.fields?.title ?? 'Media';
    const mediaContentType = mediaFile?.contentType ?? '';
    const isVideo = mediaContentType.startsWith('video/') || /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(mediaUrl ?? '');

    return (
        <Stack
            sx={{
                minHeight: '100vh',
                position: 'relative',
            }}>
            {mediaUrl ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                    }}>
                    {isVideo ? (
                        <Box
                            component="video"
                            src={mediaUrl}
                            playsInline
                            muted
                            autoPlay
                            loop
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                                display: 'block',
                            }}
                        />
                    ) : (
                        <Box
                            component="img"
                            src={mediaUrl}
                            alt={mediaAlt}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                                display: 'block',
                            }}
                        />
                    )}
                </Box>
            ) : null}
        </Stack>
    );
}
