import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import Providers from '@/client/components/functional/Providers';
import Container from '@mui/material/Container';
import { Suspense } from 'react';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="viewport">
                <AppRouterCacheProvider>
                    <CssBaseline />
                    <Providers>
                        <Container
                            disableGutters
                            maxWidth="100%">
                            <Suspense>{children}</Suspense>
                        </Container>
                    </Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
