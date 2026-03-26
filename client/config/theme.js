import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
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
        h3: {
            fontSize: '60px',
            fontWeight: 250,
            lineHeight: '50px', // 83.333%
        },
        h4: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '81px',
            fontWeight: 400,
        },
        h5: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '34px',
            fontStyle: 'normal',
            fontWeight: 250,
            lineHeight: '220%',
        },
        body1: {
            color: '#FFF',
            fontFamily: '"Museo Sans Rounded"',
            fontSize: '24px',
            fontStyle: 'normal',
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
