import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    spacing: 16,
    palette: {
        mode: 'dark',
        text: {
            primary: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: [
            '"Museo Sans Rounded"',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Helvetica',
            'Arial',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
        ].join(','),
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '120px',
            fontWeight: 300,
            lineHeight: '120%',
        },
        h3: {
            fontSize: '120px',
            fontWeight: 100,
            lineHeight: '120%',
        },
        h4: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '162px',
            fontWeight: 400,
        },
        h5: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '68px',
            fontStyle: 'normal',
            fontWeight: 250,
            lineHeight: '220%',
        },
        body1: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '64px',
            fontWeight: 300,
            lineHeight: '150%',
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: 'text.primary',
            },
        },
    },
});

export default darkTheme;
