import Box from '@mui/material/Box';
import Time from './Time';

function Background({ children }) {
    return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100%',
                backgroundColor: 'black',
                position: 'relative',
                overflowX: 'hidden',
            }}>
            <Box
                sx={{
                    background: 'linear-gradient(180deg, #000000 54.33%, #1E3A3D 78.85%, #5C643A 92.18%, #7F6921 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100dvh',
                    zIndex: 0,
                }}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '32px',
                        right: '40px',
                        zIndex: 2,
                    }}>
                    <Time />
                </Box>
                <Box
                    component="img"
                    src="/background-dots.svg"
                    alt=""
                    aria-hidden="true"
                    sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: 'auto',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100dvh',
                    width: '100%',
                    overflowX: 'hidden',
                }}>
                {children}
            </Box>
        </Box>
    );
}

export default Background;
