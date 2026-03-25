'use client';

import { ThemeProvider } from '@mui/material/styles';
import StoreProvider from '@/client/components/functional/StoreProvider';
import darkTheme from '@/client/config/theme';
import ContentLoader from '@/client/components/functional/ContentLoader';
import ContentfulLivePreviewProvider from '@/client/components/functional/ContentfulLivePreviewProvider';

function Providers({ children }) {
    return (
        <StoreProvider>
            <ContentLoader />
            <ThemeProvider theme={darkTheme}>
                <ContentfulLivePreviewProvider>{children}</ContentfulLivePreviewProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default Providers;
