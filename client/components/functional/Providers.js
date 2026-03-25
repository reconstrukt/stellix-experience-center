'use client';

import { ThemeProvider } from '@mui/material/styles';
import StoreProvider from '@/client/components/functional/StoreProvider';
import darkTheme from '@/client/config/theme';
import ContentLoader from '@/client/components/functional/ContentLoader';
import ContentfulLivePreviewConditionalProvider from '@/client/components/functional/ContentfulLivePreviewConditionalProvider';

function Providers({ children }) {
    return (
        <StoreProvider>
            <ContentLoader />
            <ThemeProvider theme={darkTheme}>
                <ContentfulLivePreviewConditionalProvider>{children}</ContentfulLivePreviewConditionalProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default Providers;
