import Box from '@mui/material/Box';
import Time from './Time';

function Background({ children }) {
    return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100%',
                backgroundColor: 'black',
            }}>
            <Box
                sx={{
                    background: 'linear-gradient(180deg, #000000 54.33%, #1E3A3D 78.85%, #5C643A 92.18%, #7F6921 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100dvh',
                    width: '100%',
                    position: 'relative',
                }}>
                <Box
                    sx={{
                        position: 'absolute',
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
                {children}
            </Box>
        </Box>
    );
}

export default Background;
