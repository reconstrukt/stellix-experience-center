import { Box, Typography } from '@mui/material';

export default function DatavizStub() {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '900px',
                height: 'min(520px, 60vh)',
                border: '1px dashed rgba(255, 255, 255, 0.5)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                textAlign: 'center',
            }}>
            <Typography
                variant="h6"
                sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                Dataviz stub (replace with data graphics)
            </Typography>
        </Box>
    );
}
